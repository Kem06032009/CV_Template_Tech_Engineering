import { NextRequest, NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");
  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Tech-CV-Template",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        { headers, next: { revalidate: 3600 } },
      ),
    ]);

    if (!userRes.ok) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = (await userRes.json()) as {
      login: string;
      public_repos: number;
      html_url: string;
    };

    let repos: GitHubRepo[] = [];
    if (reposRes.ok) {
      repos = (await reposRes.json()) as GitHubRepo[];
    }

    const nonForks = repos.filter((r) => !r.fork);
    const topRepos = [...nonForks]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        description: r.description ?? undefined,
        url: r.html_url,
        stars: r.stargazers_count,
      }));

    const totalStars = nonForks.reduce((sum, r) => sum + r.stargazers_count, 0);

    return NextResponse.json({
      username: user.login,
      profileUrl: user.html_url,
      stats: {
        repositories: user.public_repos,
        stars: totalStars,
      },
      repositories: topRepos,
    });
  } catch {
    return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
  }
}
