// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:4000";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, { headers: { Accept: "application/json" }, ...init });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json() as Promise<T>;
}

export type Health = { ok: boolean; service: string; port: number; timestamp: string };
export type Team = { Key: string; Name: string; StadiumDetails?: { Name?: string } };

export const getHealth = () => api<Health>("/api/public/health");
export const getNflTeams = () =>
  api<{ ok: boolean; count: number; teams: Team[] }>("/api/public/nfl/teams").then(r => r.teams);
