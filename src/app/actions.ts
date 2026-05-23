"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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
const AUTH_COOKIE_VALUE = "authenticated_token_v1";

export async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  return session?.value === AUTH_COOKIE_VALUE;
}

export async function verifyLogin(username: string, pass: string) {
  const validUser = process.env.ADMIN_USERNAME || "admin";
  const validPass = process.env.ADMIN_PASSWORD || "password";

  if (username === validUser && pass === validPass) {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "Invalid credentials" };
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
