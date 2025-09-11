import { useEffect, useState } from "react";
import { getHealth, getNFLTeams } from "./lib/api";

function NFLTeamsWidget() {
  const [health, setHealth] = useState<string>("(loading…)");
  const [teams, setTeams] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const h = await getHealth();
        setHealth(`${h.service} on ${h.port}`);
        const t = await getNFLTeams();
        setTeams(t.teams);
      } catch (e: any) {
        setError(e.message || String(e));
      }
    })();
  }, []);

  if (error) return <div style={{color:'red'}}>API error: {error}</div>;

  return (
    <div style={{padding:12, border:'1px solid #ddd', borderRadius:12, margin:'12px 0'}}>
      <div><strong>Health:</strong> {health}</div>
      <div style={{marginTop:8}}>
        <strong>NFL Teams</strong>{teams ? ` (${teams.length})` : " (loading…)"}
      </div>
      {teams && (
        <ul style={{maxHeight:200, overflow:'auto', marginTop:6}}>
          {teams.map((t:any) => (
            <li key={t.TeamID}>{t.Key} — {t.FullName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// In your existing App component’s render/return:
export default function App() {
  return (
    <div>
      {/* your existing UI */}
      <NFLTeamsWidget />
    </div>
  );
}
