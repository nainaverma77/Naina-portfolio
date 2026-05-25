"use client";

import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { updatePortfolio, syncGithubProjects } from "@/app/actions";
import Sidebar, { TabType } from "./Sidebar";
import Topbar from "./Topbar";
import OverviewTab from "./OverviewTab";
import HeroTab from "./HeroTab";
import AboutTab from "./AboutTab";
import SkillsTab from "./SkillsTab";
import ProjectsTab from "./ProjectsTab";
import SocialTab from "./SocialTab";
import SettingsTab from "./SettingsTab";
import MessagesTab from "./MessagesTab";
import EducationTab from "./EducationTab";

interface AdminShellProps {
  initialData: PortfolioData;
}

export default function AdminShell({ initialData }: AdminShellProps) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const result = await updatePortfolio(data);
      if (result.success) {
        setSaveMessage("SYSTEM SAVED SECURELY");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage("Error saving data");
      }
    } catch (e) {
      setSaveMessage("Critical save failure");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSyncGithub = async (username: string) => {
    if (!username) return;
    setIsSyncing(true);
    setSaveMessage("Syncing GitHub...");

    try {
      const result = await syncGithubProjects(username);
      if (result.success && result.data) {
        // Only update projects in the local state, preserve other unsaved changes
        setData((prev) => ({ ...prev, projects: result.data.projects }));
        setSaveMessage(result.message || "Sync complete");
      } else {
        setSaveMessage(result.error || "Sync failed");
      }
    } catch (e) {
      setSaveMessage("Critical sync failure");
    } finally {
      setTimeout(() => setSaveMessage(""), 4000);
      setIsSyncing(false);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab data={data} />;
      case "hero":
        return <HeroTab data={data} setData={setData} />;
      case "about":
        return <AboutTab data={data} setData={setData} />;
      case "skills":
        return <SkillsTab data={data} setData={setData} />;
      case "education":
        return <EducationTab data={data} setData={setData} />;
      case "projects":
        return (
          <ProjectsTab
            data={data}
            setData={setData}
            onSyncGithub={handleSyncGithub}
            isSyncing={isSyncing}
          />
        );
      case "socials":
        return <SocialTab data={data} setData={setData} />;
      case "messages":
        return <MessagesTab />;
      case "settings":
        return <SettingsTab data={data} setData={setData} />;
      default:
        return <OverviewTab data={data} />;
    }
  };

  return (
    <div className="flex h-screen text-gray-800 overflow-hidden bg-transparent">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
      </div>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Topbar
          onSave={handleSave}
          isSaving={isSaving}
          saveMessage={saveMessage}
        />

        <main className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
          <div className="max-w-[1800px] mx-auto pb-20">{renderTab()}</div>
        </main>
      </div>
    </div>
  );
}
