"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  getPortfolioData,
  savePortfolioData,
  getMessages,
  saveMessage,
  deleteMessage,
} from "@/lib/data";
import { PortfolioData, Message } from "@/types/portfolio";
import { fetchGithubRepos } from "@/lib/github";

const AUTH_COOKIE_NAME = "anikesh_os_admin_session";

export async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  if (!session) return false;
  
  try {
    jwt.verify(session.value, process.env.JWT_SECRET || 'fallback_secret');
    return true;
  } catch (e) {
    return false;
  }
}

let currentOtp: string | null = null;
let otpExpiry: number = 0;

export async function verifyLogin(username: string, pass: string) {
  const validUser = process.env.ADMIN_USERNAME || "admin";
  const validPass = process.env.ADMIN_PASSWORD || "password";

  if (username !== validUser || pass !== validPass) {
    return { success: false, error: "Invalid credentials" };
  }

  const cookieStore = await cookies();
  let deviceId = cookieStore.get("device_id")?.value;
  
  if (!deviceId) {
    deviceId = Math.random().toString(36).substring(2, 15);
    cookieStore.set("device_id", deviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365 * 5, // 5 years
      path: "/",
    });
  }

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
  const browser = headersList.get("user-agent") || "Unknown Browser";

  const data = getPortfolioData();
  if (!data.devices) data.devices = [];
  let existingDevice = data.devices.find(d => d.id === deviceId);
  
  // Always generate OTP
  currentOtp = Math.floor(100000 + Math.random() * 900000).toString();
  otpExpiry = Date.now() + 5 * 60 * 1000;
  
  // Send Email
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const htmlEmail = `
<div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #fff0f5; padding: 40px 20px; color: #333;">
  <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(244, 63, 94, 0.1); border: 1px solid #ffe4e6;">
    <div style="background-color: #fb7185; padding: 24px; text-align: center;">
      <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Security Verification</h2>
    </div>
    
    <div style="padding: 32px 24px;">
      <p style="margin: 0 0 16px; font-size: 15px; color: #4b5563; line-height: 1.6;">Hello,</p>
      <p style="margin: 0 0 24px; font-size: 15px; color: #4b5563; line-height: 1.6;">A login attempt was made to your Admin Dashboard. Use the following securely generated OTP to grant access:</p>
      
      <div style="text-align: center; margin: 32px 0;">
        <span style="display: inline-block; background-color: #fff1f2; color: #e11d48; border: 2px dashed #fda4af; font-size: 32px; font-weight: 700; letter-spacing: 6px; padding: 12px 32px; border-radius: 8px;">${currentOtp}</span>
      </div>
      
      <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280; font-weight: 600; text-transform: uppercase;">Request Details</p>
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb;">
        <p style="margin: 0 0 8px; font-size: 13px; color: #4b5563;"><strong>IP Address:</strong> <span style="font-family: monospace; color: #fb7185;">${ip}</span></p>
        <p style="margin: 0; font-size: 13px; color: #4b5563;"><strong>Browser/OS:</strong> ${browser}</p>
      </div>
      
      <p style="margin: 24px 0 0; font-size: 12px; color: #9ca3af; text-align: center;">If this was not you, please ignore this email. Your system is safe.</p>
    </div>
  </div>
</div>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.OTP_RECEIVER_EMAIL || process.env.EMAIL_USER,
        subject: `[${currentOtp}] Admin Login OTP - Portfolio`,
        html: htmlEmail,
      });
    } catch (err) {
      console.error("Failed to send OTP email:", err);
    }
  } else {
    console.log(`\n🔐 ADMIN LOGIN OTP (Fallback): ${currentOtp}\n`);
  }
  
  if (existingDevice) {
    existingDevice.lastLogin = new Date().toISOString();
    existingDevice.ip = ip;
    existingDevice.browser = browser;
  } else {
    data.devices.push({
      id: deviceId,
      ip,
      browser,
      lastLogin: new Date().toISOString(),
      isTrusted: false
    });
  }
  savePortfolioData(data);
  
  return { success: true, requiresOtp: true };
}

export async function verifyLoginOtp(otp: string) {
  if (currentOtp && otp === currentOtp && Date.now() < otpExpiry) {
    const cookieStore = await cookies();
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30m' });
    
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60, // 30 minutes
      path: "/",
    });
    currentOtp = null;
    
    const deviceId = cookieStore.get("device_id")?.value;
    if (deviceId) {
      const data = getPortfolioData();
      const existingDevice = data.devices?.find(d => d.id === deviceId);
      if (existingDevice) {
        existingDevice.lastLogin = new Date().toISOString();
        savePortfolioData(data);
      }
    }
    
    return { success: true };
  }
  return { success: false, error: "Invalid or expired OTP" };
}



export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  revalidatePath("/", "layout");
}

export async function updatePortfolio(data: PortfolioData) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const success = savePortfolioData(data);
    if (!success) throw new Error("Failed to write to file");

    // Revalidate the entire app so all pages (including /admin) show the new data
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to update portfolio", error);
    return { success: false, error: "Failed to update portfolio" };
  }
}

export async function syncGithubProjects(username: string) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const newRepos = await fetchGithubRepos(username);
    if (!newRepos || newRepos.length === 0) {
      return {
        success: false,
        error: "No repositories found or error fetching.",
      };
    }

    const currentData = getPortfolioData();
    const currentProjects = currentData.projects;

    // Merge strategy: only add repos that don't match an existing github link
    const existingLinks = new Set(
      currentProjects
        .map((p) => p.links.github)
        .filter((link) => link && link !== "#"),
    );

    const projectsToAdd = newRepos.filter(
      (repo) => !existingLinks.has(repo.links.github),
    );

    if (projectsToAdd.length === 0) {
      return { success: true, message: "No new repositories to sync." };
    }

    currentData.projects = [...currentProjects, ...projectsToAdd];
    const success = savePortfolioData(currentData);

    if (!success) throw new Error("Failed to save merged projects");

    revalidatePath("/", "layout");
    return {
      success: true,
      message: `Successfully synced ${projectsToAdd.length} new repositories.`,
      data: currentData,
    };
  } catch (error) {
    console.error("Failed to sync GitHub", error);
    return { success: false, error: "Failed to sync GitHub" };
  }
}

export async function syncLeetCodeStats(username: string) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    if (!username) {
      return { success: false, error: "LeetCode username is required" };
    }

    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const data = await response.json();

    if (data.status === "error" || !data.totalSolved) {
      return { success: false, error: data.message || "Failed to fetch LeetCode stats" };
    }

    const currentData = getPortfolioData();
    currentData.leetcode = {
      enabled: true,
      username: username,
      solvedCount: data.totalSolved,
    };

    const success = savePortfolioData(currentData);
    if (!success) throw new Error("Failed to save LeetCode stats");

    revalidatePath("/", "layout");
    return {
      success: true,
      message: `Successfully synced LeetCode. Solved: ${data.totalSolved}`,
      data: currentData,
    };
  } catch (error) {
    console.error("Failed to sync LeetCode", error);
    return { success: false, error: "Failed to sync LeetCode" };
  }
}

export async function submitContactForm(
  data: Omit<Message, "id" | "timestamp">,
) {
  try {
    const newMessage: Message = {
      id: "msg_" + Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...data,
    };

    // Save locally
    saveMessage(newMessage);

    // Cloudflare blocks server-side requests to Web3Forms,
    // so the email forwarding is handled entirely on the client-side (Contact.tsx)

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form", error);
    return { success: false, error: "Failed to submit form" };
  }
}

export async function fetchMessages() {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");
    return { success: true, data: getMessages() };
  } catch (error) {
    console.error("Failed to fetch messages", error);
    return { success: false, error: "Failed to fetch messages" };
  }
}

export async function removeContactMessage(id: string) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const success = deleteMessage(id);
    if (!success) throw new Error("Message not found or delete failed");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message", error);
    return { success: false, error: "Failed to delete message" };
  }
}

export async function uploadResume(formData: FormData) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const file = formData.get("resume") as File | null;
    if (!file) throw new Error("No file uploaded");

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to public directory
    const fs = require("fs");
    const path = require("path");
    const publicPath = path.join(process.cwd(), "public");

    // Create public dir if it doesn't exist
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    const filePath = path.join(publicPath, "resume.pdf");
    fs.writeFileSync(filePath, buffer);

    // Update settings
    const currentData = getPortfolioData();
    if (!currentData.settings) {
      // TypeScript safety
      (currentData as any).settings = {};
    }
    currentData.settings.resumeUrl = "/resume.pdf";
    savePortfolioData(currentData);

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to upload resume", error);
    return {
      success: false,
      error: (error as Error).message || "Failed to upload resume",
    };
  }
}
