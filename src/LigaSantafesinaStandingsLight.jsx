import { useState } from "react";

const TEAMS = [
  { id: 1, abbr: "IND", name: "Independiente", logo: "🔴", pts: 6, pj: 2, pg: 2, pe: 0, pp: 0, gf: 4, gc: 1, dg: 3, lastMatch: { home: "Independiente", away: "Cosmos", homeScore: 3, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Independiente", away: "Nacional", date: "DOM 06.04.2026" } },
  { id: 2, abbr: "SGU", name: "Sportivo Guadalupe", logo: "🟢", pts: 6, pj: 2, pg: 2, pe: 0, pp: 0, gf: 4, gc: 1, dg: 3, lastMatch: { home: "Sportivo Guadalupe", away: "Sanjustino", homeScore: 2, awayScore: 1, date: "SAB 22.03.2026" }, nextMatch: { home: "La Salle", away: "Sportivo Guadalupe", date: "DOM 06.04.2026" } },
  { id: 3, abbr: "COL", name: "Colón", logo: "🖤", pts: 6, pj: 2, pg: 2, pe: 0, pp: 0, gf: 3, gc: 1, dg: 2, lastMatch: { home: "Colón", away: "La Salle", homeScore: 2, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Colón", away: "Ciclón Racing", date: "DOM 06.04.2026" } },
  { id: 4, abbr: "NAC", name: "Nacional", logo: "🔵", pts: 4, pj: 2, pg: 1, pe: 1, pp: 0, gf: 5, gc: 3, dg: 2, lastMatch: { home: "Nacional", away: "Nobleza", homeScore: 3, awayScore: 1, date: "SAB 22.03.2026" }, nextMatch: { home: "Independiente", away: "Nacional", date: "DOM 06.04.2026" } },
  { id: 5, abbr: "ATE", name: "Ateneo", logo: "⚪", pts: 4, pj: 2, pg: 1, pe: 1, pp: 0, gf: 3, gc: 1, dg: 2, lastMatch: { home: "Ateneo", away: "Ciclón Norte", homeScore: 2, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Ateneo", away: "UNL", date: "DOM 06.04.2026" } },
  { id: 6, abbr: "FLO", name: "Las Flores II", logo: "🌸", pts: 4, pj: 2, pg: 1, pe: 1, pp: 0, gf: 1, gc: 0, dg: 1, lastMatch: { home: "Las Flores II", away: "Gimnasia y Esgrima", homeScore: 1, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Newells", away: "Las Flores II", date: "DOM 06.04.2026" } },
  { id: 7, abbr: "UNL", name: "UNL", logo: "🟠", pts: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 7, gc: 4, dg: 3, lastMatch: { home: "UNL", away: "Unión", homeScore: 4, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Ateneo", away: "UNL", date: "DOM 06.04.2026" } },
  { id: 8, abbr: "NAU", name: "Náutico El Quillá", logo: "⚓", pts: 3, pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2, lastMatch: { home: "Náutico El Quillá", away: "Dep. Santa Rosa", homeScore: 2, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Náutico El Quillá", away: "Cosmos", date: "DOM 06.04.2026" } },
  { id: 9, abbr: "ACA", name: "Academia Cabrera", logo: "🏛️", pts: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 5, gc: 3, dg: 2, lastMatch: { home: "Academia Cabrera", away: "La Perla", homeScore: 2, awayScore: 3, date: "SAB 22.03.2026" }, nextMatch: { home: "Sanjustino", away: "Academia Cabrera", date: "DOM 06.04.2026" } },
  { id: 10, abbr: "CSJ", name: "Colón de San Justo", logo: "🟡", pts: 3, pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2, lastMatch: { home: "Colón de San Justo", away: "Juventud Unida", homeScore: 2, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Colón de San Justo", away: "Gimnasia y Esgrima", date: "DOM 06.04.2026" } },
  { id: 11, abbr: "PER", name: "La Perla", logo: "💎", pts: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 5, gc: 4, dg: 1, lastMatch: { home: "Academia Cabrera", away: "La Perla", homeScore: 2, awayScore: 3, date: "SAB 22.03.2026" }, nextMatch: { home: "La Perla", away: "Unión", date: "DOM 06.04.2026" } },
  { id: 12, abbr: "CRA", name: "Ciclón Racing", logo: "⚡", pts: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 5, gc: 5, dg: 0, lastMatch: { home: "Ciclón Racing", away: "Newells", homeScore: 3, awayScore: 2, date: "SAB 22.03.2026" }, nextMatch: { home: "Colón", away: "Ciclón Racing", date: "DOM 06.04.2026" } },
  { id: 13, abbr: "SAN", name: "Sanjustino", logo: "🔶", pts: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 1, gc: 1, dg: 0, lastMatch: { home: "Sportivo Guadalupe", away: "Sanjustino", homeScore: 2, awayScore: 1, date: "SAB 22.03.2026" }, nextMatch: { home: "Sanjustino", away: "Academia Cabrera", date: "DOM 06.04.2026" } },
  { id: 14, abbr: "JUN", name: "Juventud Unida", logo: "🏃", pts: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 3, gc: 4, dg: -1, lastMatch: { home: "Colón de San Justo", away: "Juventud Unida", homeScore: 2, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Juventud Unida", away: "Dep. Santa Rosa", date: "DOM 06.04.2026" } },
  { id: 15, abbr: "SAL", name: "La Salle", logo: "🛡️", pts: 3, pj: 2, pg: 1, pe: 0, pp: 1, gf: 2, gc: 3, dg: -1, lastMatch: { home: "Colón", away: "La Salle", homeScore: 2, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "La Salle", away: "Sportivo Guadalupe", date: "DOM 06.04.2026" } },
  { id: 16, abbr: "UNI", name: "Unión", logo: "🔴", pts: 1, pj: 2, pg: 0, pe: 1, pp: 1, gf: 0, gc: 1, dg: -1, lastMatch: { home: "UNL", away: "Unión", homeScore: 4, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "La Perla", away: "Unión", date: "DOM 06.04.2026" } },
  { id: 17, abbr: "NOB", name: "Nobleza", logo: "👑", pts: 1, pj: 2, pg: 0, pe: 1, pp: 1, gf: 2, gc: 4, dg: -2, lastMatch: { home: "Nacional", away: "Nobleza", homeScore: 3, awayScore: 1, date: "SAB 22.03.2026" }, nextMatch: { home: "Nobleza", away: "Ciclón Norte", date: "DOM 06.04.2026" } },
  { id: 18, abbr: "NEW", name: "Newell's", logo: "❤️", pts: 1, pj: 2, pg: 0, pe: 1, pp: 1, gf: 2, gc: 5, dg: -3, lastMatch: { home: "Ciclón Racing", away: "Newell's", homeScore: 3, awayScore: 2, date: "SAB 22.03.2026" }, nextMatch: { home: "Newells", away: "Las Flores II", date: "DOM 06.04.2026" } },
  { id: 19, abbr: "CNO", name: "Ciclón Norte", logo: "🌀", pts: 0, pj: 2, pg: 0, pe: 0, pp: 2, gf: 0, gc: 2, dg: -2, lastMatch: { home: "Ateneo", away: "Ciclón Norte", homeScore: 2, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Nobleza", away: "Ciclón Norte", date: "DOM 06.04.2026" } },
  { id: 20, abbr: "COS", name: "Cosmos", logo: "🌌", pts: 0, pj: 2, pg: 0, pe: 0, pp: 2, gf: 1, gc: 4, dg: -3, lastMatch: { home: "Independiente", away: "Cosmos", homeScore: 3, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Náutico El Quillá", away: "Cosmos", date: "DOM 06.04.2026" } },
  { id: 21, abbr: "GYE", name: "Gimnasia y Esgrima", logo: "🤺", pts: 0, pj: 2, pg: 0, pe: 0, pp: 2, gf: 1, gc: 5, dg: -4, lastMatch: { home: "Las Flores II", away: "Gimnasia y Esgrima", homeScore: 1, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Colón de San Justo", away: "Gimnasia y Esgrima", date: "DOM 06.04.2026" } },
  { id: 22, abbr: "DSR", name: "Dep. Santa Rosa", logo: "🌹", pts: 0, pj: 2, pg: 0, pe: 0, pp: 2, gf: 1, gc: 7, dg: -6, lastMatch: { home: "Náutico El Quillá", away: "Dep. Santa Rosa", homeScore: 2, awayScore: 0, date: "SAB 22.03.2026" }, nextMatch: { home: "Juventud Unida", away: "Dep. Santa Rosa", date: "DOM 06.04.2026" } },
];

const COLUMNS = [
  { key: "pts", label: "PTS", bold: true },
  { key: "pj", label: "PJ" },
  { key: "pg", label: "PG" },
  { key: "pe", label: "PE" },
  { key: "pp", label: "PP" },
  { key: "gf", label: "GF" },
  { key: "gc", label: "GC" },
  { key: "dg", label: "DG" },
];

const nameToAbbr = Object.fromEntries(TEAMS.map((t) => [t.name, t.abbr]));
function abbr(name) { return nameToAbbr[name] ?? name; }

const C = {
  bg: "#f4f6fb",
  surface: "#ffffff",
  surfaceAlt: "#f9fafd",
  border: "#e4e8f0",
  text: "#1c2136",
  textMid: "#5a6380",
  textSoft: "#9aa3bc",
  green: "#00b248",
  greenLight: "#e8f7ee",
  orange: "#e06c00",
  orangeLight: "#fff3e6",
  red: "#d32f2f",
  redLight: "#fdecea",
};

function TeamDetail({ team }) {
  return (
    <div style={{
      background: C.surfaceAlt,
      borderTop: `1px solid ${C.border}`,
      animation: "slideDown 0.25s ease-out",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes slideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 400px; opacity: 1; }
        }
      `}</style>

      {/* Match Cards */}
      <div className="match-cards" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: `1px solid ${C.border}`,
      }}>
        {/* Last Match */}
        <div className="match-card-last" style={{
          padding: "16px 20px",
          borderRight: `1px solid ${C.border}`,
          background: C.surface,
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}>
            <span style={{ color: C.green, fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Partido reciente
            </span>
            <span style={{ color: C.green, fontSize: "10px", fontWeight: 500, cursor: "pointer" }}>Más info ▸</span>
          </div>
          <div style={{ color: C.textSoft, fontSize: "10px", marginBottom: "10px" }}>{team.lastMatch.date}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontSize: "12px", fontWeight: 500, color: C.text }}>
            <span style={{ flex: 1, textAlign: "right", lineHeight: "1.3" }}>{abbr(team.lastMatch.home)}</span>
            <span style={{
              background: C.greenLight,
              color: C.green,
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 700,
              minWidth: "52px",
              textAlign: "center",
              letterSpacing: "1px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {team.lastMatch.homeScore} - {team.lastMatch.awayScore}
            </span>
            <span style={{ flex: 1, textAlign: "left", lineHeight: "1.3" }}>{abbr(team.lastMatch.away)}</span>
          </div>
        </div>

        {/* Next Match */}
        <div style={{ padding: "16px 20px", background: C.surface }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}>
            <span style={{ color: C.orange, fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Próximo partido
            </span>
            <span style={{ color: C.orange, fontSize: "10px", fontWeight: 500, cursor: "pointer" }}>Más info ▸</span>
          </div>
          <div style={{ color: C.textSoft, fontSize: "10px", marginBottom: "10px" }}>{team.nextMatch.date}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontSize: "12px", fontWeight: 500, color: C.text }}>
            <span style={{ flex: 1, textAlign: "right", lineHeight: "1.3" }}>{abbr(team.nextMatch.home)}</span>
            <span style={{
              background: C.orangeLight,
              color: C.orange,
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
            }}>VS</span>
            <span style={{ flex: 1, textAlign: "left", lineHeight: "1.3" }}>{abbr(team.nextMatch.away)}</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        background: C.surface,
        borderBottom: `3px solid ${C.green}`,
      }}>
        {[
          { label: "PJ", value: team.pj },
          { label: "PG", value: team.pg },
          { label: "PE", value: team.pe },
          { label: "PP", value: team.pp },
          { label: "GF", value: team.gf },
          { label: "GC", value: team.gc },
          { label: "PTS", value: team.pts },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center", padding: "12px 4px" }}>
            <div style={{ color: C.textSoft, fontSize: "9px", fontWeight: 600, letterSpacing: "0.8px", marginBottom: "4px", textTransform: "uppercase" }}>
              {stat.label}
            </div>
            <div style={{
              color: stat.label === "PTS" ? C.green : C.text,
              fontSize: stat.label === "PTS" ? "20px" : "17px",
              fontWeight: stat.label === "PTS" ? 700 : 600,
              fontFamily: "'Space Grotesk', sans-serif",
            }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LigaSantafesinaStandingsLight() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedTeam, setLoadedTeam] = useState(null);

  const handleTeamClick = (team) => {
    if (selectedTeam === team.id) {
      setSelectedTeam(null);
      setLoadedTeam(null);
      return;
    }
    setSelectedTeam(team.id);
    setIsLoading(true);
    setLoadedTeam(null);
    setTimeout(() => {
      setIsLoading(false);
      setLoadedTeam(team);
    }, 500);
  };

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      background: C.bg,
      minHeight: "100vh",
      color: C.text,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }

        .team-row { cursor: pointer; transition: background 0.12s ease; }
        .team-row:hover { background: #eef1f9 !important; }
        .team-row:active { background: #e4e8f5 !important; }
        .selected-row { background: ${C.greenLight} !important; border-left-color: ${C.green} !important; }

        .loading-shimmer {
          background: linear-gradient(90deg, #eef1f9 25%, #e4e8f5 50%, #eef1f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          height: 130px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .pos-zone-top { border-left: 3px solid ${C.green}; }
        .pos-zone-bot { border-left: 3px solid ${C.red}; }

        @media (max-width: 600px) {
          .full-name { display: none !important; }
          .abbr-name { display: inline !important; }
          .stat-cell { font-size: 12px !important; padding: 10px 3px !important; min-width: 26px !important; }
          .header-cell { font-size: 9px !important; padding: 10px 3px !important; min-width: 26px !important; }
          .pos-cell { width: 30px !important; min-width: 30px !important; padding: 10px 4px !important; }
          .team-cell { padding-left: 8px !important; }
          .team-logo { font-size: 14px !important; margin-right: 6px !important; }
          .table-card { margin: 12px 12px !important; }
          .match-cards { grid-template-columns: 1fr !important; }
          .match-card-last { border-right: none !important; border-bottom: 1px solid ${C.border} !important; }
        }
        @media (min-width: 601px) {
          .abbr-name { display: none !important; }
          .full-name { display: inline !important; }
        }

        .scrollable-table { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      `}</style>

      {/* Header */}
      <div style={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "18px 16px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <img
              src="https://lsf.ar/wp-content/uploads/2024/04/logo_mob2-3-3.png"
              alt="Liga Santafesina de Fútbol"
              style={{ height: "50px", width: "auto", objectFit: "contain", flexShrink: 0 }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div>
              <div style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "1.5px",
                color: C.textSoft,
                textTransform: "uppercase",
                marginBottom: "2px",
              }}>Liga Santafesina de Fútbol</div>
              <h1 style={{
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.3px",
                color: C.text,
                lineHeight: 1.2,
              }}>Tabla de Posiciones Anual</h1>
              <div style={{ fontSize: "11px", color: C.textSoft, fontWeight: 400, marginTop: "3px" }}>
                Temporada 2026 · Fecha 2
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="table-card" style={{
          background: C.surface,
          borderRadius: "12px",
          border: `1px solid ${C.border}`,
          overflow: "hidden",
          margin: "16px 0",
          boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
        }}>
          <div className="scrollable-table">
            {/* Table Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              background: C.surfaceAlt,
              borderBottom: `1px solid ${C.border}`,
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}>
              <div className="pos-cell" style={{
                width: "40px", minWidth: "40px", textAlign: "center",
                padding: "11px 6px", fontSize: "10px", fontWeight: 600,
                color: C.textSoft, letterSpacing: "0.5px",
              }}>#</div>
              <div className="team-cell" style={{
                flex: "1 1 auto", minWidth: "100px", padding: "11px 10px",
                fontSize: "10px", fontWeight: 600, color: C.textSoft,
                letterSpacing: "0.5px", textTransform: "uppercase",
              }}>Equipo</div>
              {COLUMNS.map((col) => (
                <div key={col.key} className="header-cell" style={{
                  minWidth: "36px", textAlign: "center", padding: "11px 6px",
                  fontSize: "10px", fontWeight: 600,
                  color: col.bold ? C.textMid : C.textSoft,
                  letterSpacing: "0.5px",
                }}>{col.label}</div>
              ))}
            </div>

            {/* Rows */}
            {TEAMS.map((team, i) => {
              const isSelected = selectedTeam === team.id;
              const zoneClass = i < 4 ? "pos-zone-top" : i >= TEAMS.length - 4 ? "pos-zone-bot" : "";

              return (
                <div key={team.id}>
                  <div
                    className={`team-row ${isSelected ? "selected-row" : ""} ${zoneClass}`}
                    onClick={() => handleTeamClick(team)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: i % 2 === 0 ? C.surface : C.surfaceAlt,
                      borderLeft: zoneClass ? undefined : "3px solid transparent",
                      borderBottom: isSelected ? "none" : `1px solid ${C.border}`,
                    }}
                  >
                    {/* Position */}
                    <div className="pos-cell" style={{
                      width: "40px", minWidth: "40px", textAlign: "center",
                      padding: "13px 6px", fontSize: "13px", fontWeight: 600,
                      color: i < 4 ? C.green : i >= TEAMS.length - 4 ? C.red : C.textMid,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>{i + 1}</div>

                    {/* Team */}
                    <div className="team-cell" style={{
                      flex: "1 1 auto", minWidth: "100px", padding: "13px 10px",
                      display: "flex", alignItems: "center",
                    }}>
                      <span className="team-logo" style={{
                        fontSize: "18px", marginRight: "10px",
                        width: "22px", textAlign: "center", flexShrink: 0,
                      }}>{team.logo}</span>
                      <span className="full-name" style={{
                        fontSize: "13px", fontWeight: 500, color: C.text,
                        letterSpacing: "0.1px", whiteSpace: "nowrap",
                      }}>{team.name}</span>
                      <span className="abbr-name" style={{
                        fontSize: "12px", fontWeight: 600, color: C.text,
                        letterSpacing: "0.3px", textTransform: "uppercase",
                      }}>{team.abbr}</span>
                    </div>

                    {/* Stats */}
                    {COLUMNS.map((col) => (
                      <div key={col.key} className="stat-cell" style={{
                        minWidth: "36px", textAlign: "center", padding: "13px 6px",
                        fontSize: "13px",
                        fontWeight: col.bold ? 700 : 400,
                        color: col.bold ? C.text : C.textMid,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>
                        {col.key === "dg"
                          ? (team[col.key] > 0 ? `+${team[col.key]}` : team[col.key])
                          : team[col.key]}
                      </div>
                    ))}
                  </div>

                  {/* Expanded Detail */}
                  {isSelected && (
                    isLoading
                      ? <div className="loading-shimmer" />
                      : loadedTeam && <TeamDetail team={loadedTeam} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{
            padding: "13px 16px",
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            background: C.surfaceAlt,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: C.green }} />
              <span style={{ fontSize: "11px", color: C.textMid, fontWeight: 500 }}>Clasificación</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: C.red }} />
              <span style={{ fontSize: "11px", color: C.textMid, fontWeight: 500 }}>Descenso</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "8px 16px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "9px", color: C.textSoft, letterSpacing: "1px", fontWeight: 500 }}>
            DEMO · LIGA SANTAFESINA 2026
          </div>
        </div>
      </div>
    </div>
  );
}
