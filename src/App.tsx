import { useEffect, useState } from "react";
import { getHealth, getNflTeams, type Team } from "./lib/api";

export default function App() {
  const [health, setHealth] = useState<string>("loading…");
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const h = await getHealth();
        setHealth(`${h.service} on ${h.port} @ ${new Date(h.timestamp).toLocaleString()}`);
        const t = await getNflTeams();
        setTeams(t);
      } catch (e: any) {
        setErr(e?.message || String(e));
      }
    })();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, Segoe UI, Roboto, Arial", padding: 16 }}>
      <h1>BetHub Web</h1>
      <p>API: {health}</p>
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}
      <h2>NFL Teams</h2>
      {!teams ? <p>loading…</p> : (
        <ul>
          {teams.map(t => (
            <li key={t.Key}>
              <strong>{t.Key}</strong> — {t.Name}
              {t.StadiumDetails?.Name ? ` (Stadium: ${t.StadiumDetails.Name})` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
