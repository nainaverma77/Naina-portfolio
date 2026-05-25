import fs from "fs";
import path from "path";
import { PortfolioData, Message } from "@/types/portfolio";

const dataFilePath = path.join(process.cwd(), "src", "data", "portfolio.json");
const messagesFilePath = path.join(
  process.cwd(),
  "src",
  "data",
  "messages.json",
);

export function getPortfolioData(): PortfolioData {
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const parsedData = JSON.parse(fileContents);

    // Migration logic for old data format
    if (!parsedData.socials) {
      if (parsedData.contact) {
        parsedData.socials = [
          {
            id: "s1",
            platform: "GitHub",
            url: parsedData.contact.github || "",
            enabled: true,
          },
          {
            id: "s2",
            platform: "LinkedIn",
            url: parsedData.contact.linkedin || "",
            enabled: true,
          },
          {
            id: "s3",
            platform: "Email",
            url: parsedData.contact.email
              ? `mailto:${parsedData.contact.email}`
              : "",
            enabled: true,
          },
        ];
      } else {
        parsedData.socials = [];
      }
    }
    delete parsedData.contact;
    if (!parsedData.settings) {
      parsedData.settings = {
        theme: "cyberpunk",
        animationsEnabled: true,
        seoTitle: "ANIKESH.OS | Developer Portfolio",
        seoDescription: "Cyberpunk Developer Portfolio",
      };
    }

    parsedData.projects = parsedData.projects || [];
    parsedData.skills = parsedData.skills || [];
    parsedData.experience = parsedData.experience || [];
    parsedData.education = parsedData.education || [];
    parsedData.testimonials = parsedData.testimonials || [];
    parsedData.hero = parsedData.hero || { heading: "", subtitle: "" };
    parsedData.stats = parsedData.stats || { repos: 16, commits: 122, prs: 1 };
    parsedData.leetcode = parsedData.leetcode || { enabled: false, username: "", solvedCount: 0 };
    parsedData.about = parsedData.about || {
      name: "",
      role: "",
      status: "",
      location: "",
      specialization: "",
      bio: "",
      avatarUrl: "",
    };

    return parsedData;
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    // Return empty fallback
    return {
      hero: { heading: "", subtitle: "" },
      about: {
        name: "",
        role: "",
        status: "",
        location: "",
        specialization: "",
        bio: "",
        avatarUrl: "",
      },
      skills: [],
      projects: [],
      socials: [],
      experience: [],
      education: [],
      testimonials: [],
      settings: {
        theme: "cyberpunk",
        animationsEnabled: true,
        seoTitle: "ANIKESH.OS | Developer Portfolio",
        seoDescription: "Cyberpunk Developer Portfolio",
      },
      stats: { repos: 16, commits: 122, prs: 1 },
      leetcode: { enabled: false, username: "", solvedCount: 0 },
    };
  }
}

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing portfolio data:", error);
    return false;
  }
}

export function getMessages(): Message[] {
  try {
    if (!fs.existsSync(messagesFilePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(messagesFilePath, "utf8");
    return JSON.parse(fileContents) || [];
  } catch (error) {
    console.error("Error reading messages data:", error);
    return [];
  }
}

export function saveMessage(message: Message): boolean {
  try {
    const messages = getMessages();
    messages.push(message);
    fs.writeFileSync(
      messagesFilePath,
      JSON.stringify(messages, null, 2),
      "utf8",
    );
    return true;
  } catch (error) {
    console.error("Error saving message:", error);
    return false;
  }
}

export function deleteMessage(id: string): boolean {
  try {
    const messages = getMessages();
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    if (messages.length === updatedMessages.length) return false;
    fs.writeFileSync(
      messagesFilePath,
      JSON.stringify(updatedMessages, null, 2),
      "utf8",
    );
    return true;
  } catch (error) {
    console.error("Error deleting message:", error);
    return false;
  }
}
