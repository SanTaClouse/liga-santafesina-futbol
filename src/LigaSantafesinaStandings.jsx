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

function TeamDetail({ team, onClose }) {
  return (
    <div style={{
      background: "#1a1f3d",
      borderRadius: "0",
      overflow: "hidden",
      animation: "slideDown 0.3s ease-out",
    }}>
      <style>{`
        @keyframes slideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 500px; opacity: 1; }
        }
      `}</style>

      {/* Match Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* Last Match */}
        <div style={{
          padding: "16px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          background: "linear-gradient(135deg, #1a1f3d 0%, #252b50 100%)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}>
            <span style={{
              color: "#00e676",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}>PARTIDO RECIENTE</span>
            <span style={{
              color: "#00e676",
              fontSize: "10px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>Más info ▸</span>
          </div>
          <div style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "10px",
            marginBottom: "8px",
            fontFamily: "'DM Sans', sans-serif",
          }}>{team.lastMatch.date}</div>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <span style={{
              flex: 1,
              textAlign: "right",
              fontSize: "11px",
              lineHeight: "1.3",
            }}>{team.lastMatch.home}</span>
            <span style={{
              background: "rgba(255,255,255,0.1)",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 800,
              minWidth: "50px",
              textAlign: "center",
              letterSpacing: "1px",
              fontFamily: "'Space Mono', monospace",
            }}>
              {team.lastMatch.homeScore} - {team.lastMatch.awayScore}
            </span>
            <span style={{
              flex: 1,
              textAlign: "left",
              fontSize: "11px",
              lineHeight: "1.3",
            }}>{team.lastMatch.away}</span>
          </div>
        </div>

        {/* Next Match */}
        <div style={{
          padding: "16px",
          background: "linear-gradient(135deg, #252b50 0%, #1a1f3d 100%)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}>
            <span style={{
              color: "#ff9100",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}>PRÓXIMO PARTIDO</span>
            <span style={{
              color: "#ff9100",
              fontSize: "10px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>Más info ▸</span>
          </div>
          <div style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "10px",
            marginBottom: "8px",
            fontFamily: "'DM Sans', sans-serif",
          }}>{team.nextMatch.date}</div>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <span style={{
              flex: 1,
              textAlign: "right",
              fontSize: "11px",
              lineHeight: "1.3",
            }}>{team.nextMatch.home}</span>
            <span style={{
              background: "rgba(255,255,255,0.1)",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
            }}>VS</span>
            <span style={{
              flex: 1,
              textAlign: "left",
              fontSize: "11px",
              lineHeight: "1.3",
            }}>{team.nextMatch.away}</span>
          </div>
        </div>
      </div>

      {/* Team Stats Bar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        background: "linear-gradient(180deg, #0d1127 0%, #151a36 100%)",
        borderBottom: "3px solid #00e676",
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
          <div key={stat.label} style={{
            textAlign: "center",
            padding: "12px 4px",
          }}>
            <div style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1px",
              marginBottom: "4px",
              fontFamily: "'DM Sans', sans-serif",
            }}>{stat.label}</div>
            <div style={{
              color: stat.label === "PTS" ? "#00e676" : "#fff",
              fontSize: stat.label === "PTS" ? "20px" : "17px",
              fontWeight: 800,
              fontFamily: "'Space Mono', monospace",
            }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LigaSantafesinaStandings() {
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
    // Simulate API delay like LaLiga
    setTimeout(() => {
      setIsLoading(false);
      setLoadedTeam(team);
    }, 600);
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: "#0a0e1a",
      minHeight: "100vh",
      color: "#fff",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e1a; }

        .team-row { cursor: pointer; transition: background 0.15s ease; }
        .team-row:hover { background: rgba(255,255,255,0.04) !important; }
        .team-row:active { background: rgba(255,255,255,0.07) !important; }

        .selected-row { background: rgba(0, 230, 118, 0.06) !important; border-left: 3px solid #00e676 !important; }

        .loading-shimmer {
          background: linear-gradient(90deg, #1a1f3d 25%, #252b50 50%, #1a1f3d 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          height: 140px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .pos-zone-top { border-left: 3px solid #00e676; }
        .pos-zone-mid { border-left: 3px solid #ff9100; }
        .pos-zone-bot { border-left: 3px solid #ff1744; }

        @media (max-width: 600px) {
          .full-name { display: none !important; }
          .abbr-name { display: inline !important; }
          .stat-cell { font-size: 12px !important; padding: 10px 3px !important; min-width: 26px !important; }
          .header-cell { font-size: 9px !important; padding: 10px 3px !important; min-width: 26px !important; }
          .pos-cell { width: 28px !important; min-width: 28px !important; padding: 10px 4px !important; }
          .team-cell { padding-left: 6px !important; }
          .team-logo { font-size: 14px !important; margin-right: 6px !important; }
        }
        @media (min-width: 601px) {
          .abbr-name { display: none !important; }
          .full-name { display: inline !important; }
        }

        .scrollable-table {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d1127 0%, #1a2248 50%, #0d1127 100%)",
        padding: "24px 16px 20px",
        borderBottom: "2px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "6px",
          }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #00e676, #00b0ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 900,
              color: "#0a0e1a",
              fontFamily: "'Space Mono', monospace",
            }}>SF</div>
            <div>
              <div style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
              }}>LIGA SANTAFESINA DE FÚTBOL</div>
              <h1 style={{
                fontSize: "20px",
                fontWeight: 900,
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
                background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.7))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Tabla de Posiciones Anual</h1>
            </div>
          </div>
          <div style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.35)",
            fontWeight: 500,
            marginTop: "4px",
            paddingLeft: "48px",
          }}>Temporada 2026 · Fecha 2</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="scrollable-table">
          {/* Table Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            padding: "0",
            background: "#111631",
            borderBottom: "2px solid rgba(255,255,255,0.08)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}>
            <div className="pos-cell" style={{
              width: "36px",
              minWidth: "36px",
              textAlign: "center",
              padding: "12px 6px",
              fontSize: "10px",
              fontWeight: 800,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.5px",
            }}>POS</div>
            <div className="team-cell" style={{
              flex: "1 1 auto",
              minWidth: "120px",
              padding: "12px 10px",
              fontSize: "10px",
              fontWeight: 800,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.5px",
            }}>EQUIPO</div>
            {COLUMNS.map((col) => (
              <div key={col.key} className="header-cell" style={{
                minWidth: "36px",
                textAlign: "center",
                padding: "12px 6px",
                fontSize: "10px",
                fontWeight: 800,
                color: col.bold ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)",
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
                    background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                    borderLeft: zoneClass ? undefined : "3px solid transparent",
                    borderBottom: isSelected ? "none" : "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Position */}
                  <div className="pos-cell" style={{
                    width: "36px",
                    minWidth: "36px",
                    textAlign: "center",
                    padding: "14px 6px",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#fff",
                    fontFamily: "'Space Mono', monospace",
                  }}>{i + 1}</div>

                  {/* Team */}
                  <div className="team-cell" style={{
                    flex: "1 1 auto",
                    minWidth: "120px",
                    padding: "14px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                  }}>
                    <span className="team-logo" style={{
                      fontSize: "18px",
                      marginRight: "10px",
                      width: "24px",
                      textAlign: "center",
                    }}>{team.logo}</span>
                    <span className="full-name" style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#fff",
                      textTransform: "uppercase",
                      letterSpacing: "0.3px",
                      whiteSpace: "nowrap",
                    }}>{team.name}</span>
                    <span className="abbr-name" style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#fff",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}>{team.abbr}</span>
                  </div>

                  {/* Stats */}
                  {COLUMNS.map((col) => (
                    <div key={col.key} className="stat-cell" style={{
                      minWidth: "36px",
                      textAlign: "center",
                      padding: "14px 6px",
                      fontSize: "13px",
                      fontWeight: col.bold ? 800 : 500,
                      color: col.bold ? "#fff" : "rgba(255,255,255,0.5)",
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {col.key === "dg" ? (team[col.key] > 0 ? `+${team[col.key]}` : team[col.key]) : team[col.key]}
                    </div>
                  ))}
                </div>

                {/* Expanded Detail */}
                {isSelected && (
                  isLoading ? (
                    <div className="loading-shimmer" />
                  ) : (
                    loadedTeam && <TeamDetail team={loadedTeam} onClose={() => { setSelectedTeam(null); setLoadedTeam(null); }} />
                  )
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          padding: "20px 16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: "#00e676" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Clasificación</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: "#ff1744" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Descenso</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{
            fontSize: "9px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "1px",
            fontWeight: 600,
          }}>DEMO · LIGA SANTAFESINA 2026 · DISEÑO INSPIRADO EN LALIGA.COM</div>
        </div>
      </div>
    </div>
  );
}
