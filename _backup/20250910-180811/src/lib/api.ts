const BASE = (import.meta as any).env?.VITE_API_BASE || "/api/public";

async function j<T>(r: Response): Promise<T> {
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`${r.status} ${text}`);
  }
  return r.json() as Promise<T>;
}

export async function getHealth() {
  const r = await fetch(`${BASE}/health`, { headers: { Accept: "application/json" } });
  return j<{ ok: boolean; service: string; port: number; timestamp: string }>(r);
}

// NFL
export async function getNFLTeams() {
  const r = await fetch(`${BASE}/nfl/teams`);
  return j<{ ok: boolean; count: number; teams: any[] }>(r);
}

export async function getNFLGames(date: string) {
  const r = await fetch(`${BASE}/nfl/games?date=${encodeURIComponent(date)}`);
  return j<{ ok: boolean; date: string; count: number; games: any[] }>(r);
}

export async function getNFLStandings(season: number) {
  const r = await fetch(`${BASE}/nfl/standings/${season}`);
  return j<{ ok: boolean; season: number; count: number; standings: any[] }>(r);
}
