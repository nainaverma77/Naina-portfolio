import fs from "fs";
import path from "path";
import { PortfolioData, Message } from "@/types/portfolio";
import { connectToDatabase } from "./mongoose";
import { PortfolioModel } from "@/models/Portfolio";
import { MessageModel } from "@/models/Message";

const dataFilePath = path.join(process.cwd(), "src", "data", "portfolio.json");

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    await connectToDatabase();
    
    // Check if data exists in DB
    const dbDoc = await PortfolioModel.findOne();
    
    if (dbDoc && dbDoc.data) {
      return dbDoc.data as PortfolioData;
    }
    
    // If not in DB, seed from portfolio.json
    console.log("Seeding MongoDB with local portfolio.json...");
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const parsedData = JSON.parse(fileContents);
    
    // Migration logic for old data format
    if (!parsedData.socials) {
      if (parsedData.contact) {
        parsedData.socials = [
          { id: "s1", platform: "GitHub", url: parsedData.contact.github || "", enabled: true },
          { id: "s2", platform: "LinkedIn", url: parsedData.contact.linkedin || "", enabled: true },
          { id: "s3", platform: "Email", url: parsedData.contact.email ? `mailto:${parsedData.contact.email}` : "", enabled: true },
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
    parsedData.hero = parsedData.hero || { heading: "Hi, I'm Anikesh", subtitle: "Full Stack Developer" };
    parsedData.about = parsedData.about || { name: "Anikesh", role: "Developer", status: "Available", location: "Earth", specialization: "Web", bio: "Hello" };

    // Save initial seed to DB
    const newDoc = new PortfolioModel({ data: parsedData });
    await newDoc.save();
    
    return parsedData as PortfolioData;
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    // Fallback to local file if DB fails
    return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    await connectToDatabase();
    
    // Backup to local JSON for dev tracking
    if (process.env.NODE_ENV !== "production") {
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    }

    // Upsert to DB
    const doc = await PortfolioModel.findOne();
    if (doc) {
      doc.data = data;
      // Tell mongoose it's modified since it's a Mixed type
      doc.markModified('data');
      await doc.save();
    } else {
      const newDoc = new PortfolioModel({ data });
      await newDoc.save();
    }
    return true;
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    return false;
  }
}

export async function getMessages(): Promise<Message[]> {
  try {
    await connectToDatabase();
    const messages = await MessageModel.find().sort({ createdAt: -1 });
    return messages.map(msg => ({
      id: msg.id,
      name: msg.name,
      email: msg.email,
      message: msg.message,
      timestamp: msg.timestamp
    }));
  } catch (error) {
    console.error("Error reading messages data:", error);
    return [];
  }
}

export async function saveMessage(message: Message): Promise<boolean> {
  try {
    await connectToDatabase();
    const newMsg = new MessageModel(message);
    await newMsg.save();
    return true;
  } catch (error) {
    console.error("Error saving message:", error);
    return false;
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  try {
    await connectToDatabase();
    const result = await MessageModel.deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting message:", error);
    return false;
  }
}
