export async function fetchGithubReadme(repoUrl: string): Promise<string> {
  if (!repoUrl) return "No repository URL provided.";
  
  // Convert https://github.com/naina/floral-boutique to naina/floral-boutique
  const urlParts = repoUrl.split('github.com/');
  if (urlParts.length !== 2) return "Invalid GitHub URL.";
  
  const repoPath = urlParts[1].replace(/\/$/, ""); // Remove trailing slash if any
  
  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}/readme`, {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
      },
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
