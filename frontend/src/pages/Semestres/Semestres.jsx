import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import { Sidebar } from "../../components/Sidebar";
import "./Semestres.css";

function getTipo(d) {
  return Array.isArray(d.tipo) ? d.tipo[0] : (d.tipo || "obrigatoria");
}

function Card({ disc, ativo, onSelect }) {
  const tipo = getTipo(disc);
  return (
    <div
      id={disc.codigo}
      className={`disc-card ${ativo ? "ativo" : ""}`}
      data-tipo={tipo}
      onClick={() => onSelect(disc)}
    >
      <span className={`tipo-tag ${tipo}`}>
        {tipo === "optativa" ? "Optativa" : "Obrigatória"}
      </span>
      <strong>{disc.nome}</strong>
      <span className="ch">{disc.cargaHoraria}h</span>
    </div>
  );
}

function Detalhe({ disc, onFechar }) {
  if (!disc) return null;
  const tipo     = getTipo(disc);
  const horarios = disc.horarios?.length
    ? disc.horarios.map(h => `${h.dia} ${h.inicio}–${h.fim}`).join(", ")
    : "—";

  return (
    <aside id="detalhe">
      <button id="btn-fechar" onClick={onFechar}>
        <i className="bi bi-x-lg" />
      </button>
      <h2>{disc.nome}</h2>
      <dl>
        <dt>Código</dt>         <dd>{disc.codigo}</dd>
        <dt>Tipo</dt>           <dd>{tipo === "optativa" ? "Optativa" : "Obrigatória"}</dd>
        <dt>Semestre</dt>       <dd>{disc.semestre}º</dd>
        <dt>Carga horária</dt>  <dd>{disc.cargaHoraria}h</dd>
        <dt>Professores</dt>    <dd>{disc.professores?.join(", ") || "—"}</dd>
        <dt>Horários</dt>       <dd>{horarios}</dd>
        <dt>Pré-requisitos</dt>
        <dd>
          {disc.preRequisitos?.length
            ? disc.preRequisitos.map(c => <code key={c}>{c}</code>)
            : "—"}
        </dd>
        <dt>Ementa</dt>         <dd>{disc.ementa}</dd>
      </dl>
    </aside>
  );
}

export default function Semestres() {
  const [semestres,   setSemestres]   = useState({});
  const [conexoes,    setConexoes]    = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [erro,        setErro]        = useState(false);
  const fgRef  = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    api.get("/disciplinas/fluxograma")
      .then(({ data }) => {
        setSemestres(data.semestres);
        setConexoes(data.conexoes);
      })
      .catch(() => setErro(true));
  }, []);

  useEffect(() => {
    if (!conexoes.length) return;
    const id = setTimeout(desenharLinhas, 100);
    return () => clearTimeout(id);
  }, [semestres, conexoes, selecionado]);

  function desenharLinhas() {
    const svg = svgRef.current;
    const fg  = fgRef.current;
    if (!svg || !fg) return;

    const fgRect = fg.getBoundingClientRect();
    svg.setAttribute("width",  fg.scrollWidth);
    svg.setAttribute("height", fg.scrollHeight);
    svg.innerHTML = "";

    conexoes.forEach(({ de, para }) => {
      const a = document.getElementById(de);
      const b = document.getElementById(para);
      if (!a || !b) return;
      if (b.dataset.tipo === "optativa") return;

      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const x1 = ar.right - fgRect.left;
      const y1 = (ar.top  + ar.bottom) / 2 - fgRect.top;
      const x2 = br.left  - fgRect.left;
      const y2 = (br.top  + br.bottom) / 2 - fgRect.top;
      const cx = (x1 + x2) / 2;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`);
      svg.appendChild(path);
    });
  }

  const nums = Object.keys(semestres).sort((a, b) => +a - +b);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="semestres-page">
        <h1>Fluxograma</h1>
        <p>Clique em uma disciplina para ver os detalhes.</p>

        {erro && <p className="erro">Erro ao carregar o fluxograma.</p>}

        <div id="wrapper">
          <div id="fluxograma" ref={fgRef}>
            <svg id="linhas" ref={svgRef} />
            {nums.map(n => (
              <div key={n} className="col">
                <span className="col-titulo">{n}º sem.</span>
                {semestres[n].map(d => (
                  <Card
                    key={d.codigo}
                    disc={d}
                    ativo={selecionado?.codigo === d.codigo}
                    onSelect={setSelecionado}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <Detalhe disc={selecionado} onFechar={() => setSelecionado(null)} />
      </main>
    </div>
  );
}
