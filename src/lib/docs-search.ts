export interface SearchResult {
  title: string;
  description: string;
  href: string;
  score: number;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array.from({ length: b.length + 1 }, (_, i) => i)
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

export function fuzzySearch(query: string, data: { title: string; href: string }[]): SearchResult[] {
  if (!query) return [];
  const q = query.toLowerCase().trim();

  const results = data.map(item => {
    const title = item.title.toLowerCase();
    let score = 0;

    if (title === q) score += 1000;

    else if (title.startsWith(q)) score += 500;

    else if (title.includes(q)) score += 300;

    else {
      const distance = levenshteinDistance(q, title);
      const threshold = Math.floor(title.length * 0.4);
      if (distance <= threshold) {

        score += (80 - distance * 10);
      }
    }

    const qTokens = q.split(/\s+/);
    const tTokens = title.split(/\s+/);
    qTokens.forEach(qt => {
      if (tTokens.some(tt => tt.startsWith(qt))) score += 50;
    });

    return {
      ...item,
      description: "Documentation",
      score
    };

  });

  return results
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)

}
