(function(){"use strict";function c(t){const e=t.trim();if(!e||e==="-")return 0;const n=e.startsWith("-"),[a,o]=e.replace(/^-/,"").split(":").map(Number),r=a*60+o;return n?-r:r}function u(t){const e=Math.abs(t),n=Math.floor(e/60),a=e%60;return n===0?`${a}min`:a===0?`${n}h`:`${n}h${a}min`}function b(t){const[e,n]=t.split(":").map(Number);return e*60+n}function y(){const t=new Date;return t.getHours()*60+t.getMinutes()}function v(t){const e=Math.floor(t/60)%24,n=t%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function M(t,e){return e===0?0:Math.min(100,Math.round(t/e*100))}const g="genyo-timer-floating-bar";function E(){const t=document.getElementById(g);if(t)return t;const e=document.createElement("div");return e.id=g,e.innerHTML=`
    <div class="gt-container">
      <div class="gt-row">
        <span class="gt-label">⏳</span>
        <span class="gt-value" id="gt-tempo-restante">Carregando...</span>
        <span class="gt-sep">|</span>
        <div class="gt-progress-container">
          <div class="gt-progress-bar" id="gt-progress-bar"></div>
        </div>
        <span class="gt-sep">|</span>
        <span class="gt-label">🏁</span>
        <span class="gt-value" id="gt-saida-prevista">--:--</span>
      </div>
    </div>
  `,C(),document.body.appendChild(e),e}function w(t){const e=document.getElementById("gt-tempo-restante"),n=document.getElementById("gt-progress-bar"),a=document.getElementById("gt-saida-prevista"),o=document.getElementById(g);if(!e||!n||!a||!o)return;if(t.horaEntrada){const i=b(t.horaEntrada),l=c(t.horasPrevistas),d=c(t.abonos),I=c(t.intervalos),p=l+I-d,f=i+p,h=y(),x=Math.max(0,f-h);if(x>0){const P=Math.max(0,h-i),$=M(P,p);e.textContent=`Faltam ${u(x)}`,a.textContent=v(f),o.className="gt-status-working",n.style.width=`${$}%`}else e.textContent="Expediente completo!",a.textContent="✓",o.className="gt-status-done",n.style.width="100%";return}const r=c(t.horasPrevistas);c(t.horasTrabalhadas);const s=c(t.saldo);if(s<0){const i=Math.abs(s);e.textContent=`Faltam ~${u(i)}`,a.textContent="--:--",o.className="gt-status-working",n.style.width="0%"}else s>0?(e.textContent=`Extra +${u(s)}`,a.textContent="Já pode sair! ✓",o.className="gt-status-overtime",n.style.width="100%"):(e.textContent=r>0?"Aguardando registros...":"Expediente completo!",a.textContent="--:--",o.className="gt-status-done",n.style.width="0%")}function C(){if(document.getElementById("genyo-timer-styles"))return;const t=document.createElement("style");t.id="genyo-timer-styles",t.textContent=`
    #genyo-timer-floating-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999999;
      font-family: 'Open Sans', sans-serif;
      font-size: 13px;
    }
    .gt-container {
      background: rgba(30, 30, 40, 0.92);
      color: #e0e0e0;
      padding: 6px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(6px);
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .gt-row {
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 600px;
      width: 100%;
    }
    .gt-label { font-size: 14px; }
    .gt-value { font-weight: 600; min-width: 110px; }
    .gt-sep { color: rgba(255,255,255,0.2); }
    .gt-progress-container {
      flex: 1;
      height: 6px;
      background: rgba(255,255,255,0.15);
      border-radius: 3px;
      overflow: hidden;
    }
    .gt-progress-bar {
      display: block;
      height: 100%;
      width: 0%;
      background: #4caf50;
      border-radius: 3px;
      transition: width 30s linear;
    }
    .gt-status-working .gt-progress-bar { background: #ff9800; }
    .gt-status-overtime .gt-progress-bar { background: #f44336; }
    .gt-status-done .gt-progress-bar { background: #4caf50; }
  `,document.head.appendChild(t)}function S(){var r,s,i,l,d;const t=document.querySelector("#tabelaHistoricoPontos tbody");if(!t)return null;const e=t.querySelectorAll(":scope > tr");if(e.length<2)return null;const a=e[0].querySelectorAll("td");return a.length<6?null:{horasPrevistas:(((r=a[1])==null?void 0:r.textContent)??"").trim()||"00:00",horasTrabalhadas:(((s=a[2])==null?void 0:s.textContent)??"").trim()||"00:00",abonos:(((i=a[3])==null?void 0:i.textContent)??"").trim()||"00:00",intervalos:(((l=a[4])==null?void 0:l.textContent)??"").trim()||"00:00",saldo:(((d=a[5])==null?void 0:d.textContent)??"").trim()||"00:00",horaEntrada:B(e[1]),status:k()}}function B(t){var o,r;const e=t.querySelector(".timeline"),n=e==null?void 0:e.querySelector('li[id="Entrada"]');return((r=(o=n==null?void 0:n.querySelector(".date"))==null?void 0:o.textContent)==null?void 0:r.trim())||null}function k(){var n;const t=document.getElementById("dadosPontos"),e=(n=t==null?void 0:t.dataset)==null?void 0:n.ultimoPonto;if(!e)return"desconhecido";try{return JSON.parse(e).motivo==="Entrada"?"Entrada":"Saida"}catch{return"desconhecido"}}function m(){E();function t(){const e=S();if(e)w(e);else{const n=document.getElementById("gt-tempo-restante");n&&(n.textContent="Aguardando dados...")}}t(),setInterval(t,6e4)}document.readyState==="complete"?setTimeout(m,2e3):window.addEventListener("load",()=>setTimeout(m,2e3))})();
