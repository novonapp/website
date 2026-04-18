export async function getLatestRelease() {
  try {
    const res = await fetch('https://api.github.com/repos/novonapp/novon/releases', {
      next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
      headers: {
        'User-Agent': 'Novon-Docs',
        'Accept': 'application/vnd.github.v3+json'
      },
      signal: AbortSignal.timeout(3000)
    });
    if (!res.ok) return null;
    const releases = await res.json();
    return releases && releases.length > 0 ? releases[0] : null;
  } catch (e) {
    console.error("Failed to fetch Github latest release:", e);
    return null;
  }
}

export async function getReleases() {
  try {
    const res = await fetch('https://api.github.com/repos/novonapp/novon/releases', {
      next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
      headers: {
        'User-Agent': 'Novon-Docs',
        'Accept': 'application/vnd.github.v3+json'
      },
      signal: AbortSignal.timeout(3000)
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch Github releases:", e);
    return [];
  }
}
