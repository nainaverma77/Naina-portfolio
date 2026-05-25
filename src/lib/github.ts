import { Project } from "@/types/portfolio";

export async function fetchGithubRepos(username: string): Promise<Project[]> {
  try {
    const headers: Record<string, string> = {};
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data = await response.json();

    const getCategory = (tech: string[]) => {
      const techStr = tech.join(" ").toLowerCase();
      if (
        techStr.includes("python") ||
        techStr.includes("ai") ||
        techStr.includes("ml") ||
        techStr.includes("tensorflow") ||
        techStr.includes("jupyter")
      )
        return "AI";
      if (
        techStr.includes("figma") ||
        techStr.includes("design") ||
        techStr.includes("tailwind") ||
        techStr.includes("css")
      )
        return "UI";
      if (
        techStr.includes("react") ||
        techStr.includes("next") ||
        techStr.includes("node") ||
        techStr.includes("web") ||
        techStr.includes("html") ||
        techStr.includes("javascript") ||
        techStr.includes("typescript")
      )
        return "WEB";
      return "EXP";
    };

    return data.map((repo: any) => {
      const tech = repo.language ? [repo.language] : [];
      return {
        id: `REPO-${repo.id}`, // Generate a guaranteed unique ID based on GitHub's internal ID
        name: repo.name,
        description: repo.description || "No description provided.",
        tech: tech,
        category: getCategory(tech),
        status: "GITHUB SYNC",
        links: {
          github: repo.html_url,
          live: repo.homepage || "#",
        },
        visible: false, // Hidden by default
      };
    });
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export async function fetchGithubReadme(repoUrl: string): Promise<string> {
  if (!repoUrl) return "No repository URL provided.";
  
  // Convert https://github.com/naina/floral-boutique to naina/floral-boutique
  const urlParts = repoUrl.split('github.com/');
  if (urlParts.length !== 2) return "Invalid GitHub URL.";
  
  const repoPath = urlParts[1].replace(/\/$/, ""); // Remove trailing slash if any
  
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3.raw',
    };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/repos/${repoPath}/readme`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      if (res.status === 404) return "README not found for this repository.";
      return `Failed to fetch README. Status: ${res.status}`;
    }
    
    const text = await res.text();
    return text;
  } catch (error) {
    console.error("Error fetching GitHub README:", error);
    return "An error occurred while fetching the README.";
  }
}
