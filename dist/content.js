(function(){"use strict";const m="genyo-timer-floating-bar";function E(){const t=document.getElementById(m);if(t)return t;const e=document.createElement("div");return e.id=m,e.innerHTML=`
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
        <span class="gt-sep gt-banco-sep">|</span>
        <span class="gt-value gt-banco-val" id="gt-banco-horas"></span>
      </div>
    </div>
  `,S(),document.body.appendChild(e),e}function M(t){const e=document.getElementById("gt-tempo-restante"),n=document.getElementById("gt-progress-bar"),r=document.getElementById("gt-saida-prevista"),o=document.getElementById(m);if(!e||!n||!r||!o)return;e.textContent=t.textoRestante,r.textContent=t.estado==="done"&&t.saidaPrevistaMin!==null?"✓":t.saidaPrevista,o.className=`gt-status-${t.estado}`,n.style.width=`${t.progresso}%`;const a=document.getElementById("gt-banco-horas"),s=document.querySelector(".gt-banco-sep");t.textoBanco?(a&&(a.textContent=t.textoBanco),s&&(s.style.display=""),a&&(a.style.display="")):(a&&(a.style.display="none"),s&&(s.style.display="none"))}function S(){if(document.getElementById("genyo-timer-styles"))return;const t=document.createElement("style");t.id="genyo-timer-styles",t.textContent=`
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
    .gt-banco-val { font-size: 11px; color: #81c784; }
  `,document.head.appendChild(t)}function c(t){const e=t.trim();if(!e||e==="-")return 0;const n=e.startsWith("-"),[r,o]=e.replace(/^-/,"").split(":").map(Number),a=r*60+o;return n?-a:a}function u(t){const e=Math.abs(t),n=Math.floor(e/60),r=e%60;return n===0?`${r}min`:r===0?`${n}h`:`${n}h${r}min`}function P(t){const[e,n]=t.split(":").map(Number);return e*60+n}function C(t=new Date){return t.getHours()*60+t.getMinutes()}function f(t){const e=Math.floor(t/60)%24,n=t%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function I(t,e){return e===0?0:Math.min(100,Math.round(t/e*100))}function w(){var a,s,g,l,i;const t=document.querySelector("#tabelaHistoricoPontos tbody");if(!t)return null;const e=t.querySelectorAll(":scope > tr");if(e.length<2)return null;const r=e[0].querySelectorAll("td");return r.length<6?null:{horasPrevistas:(((a=r[1])==null?void 0:a.textContent)??"").trim()||"00:00",horasTrabalhadas:(((s=r[2])==null?void 0:s.textContent)??"").trim()||"00:00",abonos:(((g=r[3])==null?void 0:g.textContent)??"").trim()||"00:00",intervalos:(((l=r[4])==null?void 0:l.textContent)??"").trim()||"00:00",saldo:(((i=r[5])==null?void 0:i.textContent)??"").trim()||"00:00",horaEntrada:A(e[1]),status:$()}}function A(t){var o,a;const e=t.querySelector(".timeline"),n=e==null?void 0:e.querySelector('li[id="Entrada"]');return((a=(o=n==null?void 0:n.querySelector(".date"))==null?void 0:o.textContent)==null?void 0:a.trim())||null}function T(){var o,a;const t=document.getElementById("horasTrabalhadasMesCorrente"),e=document.getElementById("horasPrevistasMesCorrente");if(!t||!e)return null;const n=((o=t.textContent)==null?void 0:o.trim())||"",r=((a=e.textContent)==null?void 0:a.trim())||"";if(n.length<3||r.length<3){const s=document.querySelector("#carregarHorasPrevistasMesCorrente button");return s==null||s.click(),null}return c(n)-c(r)}function $(){var n;const t=document.getElementById("dadosPontos"),e=(n=t==null?void 0:t.dataset)==null?void 0:n.ultimoPonto;if(!e)return"desconhecido";try{return JSON.parse(e).motivo==="Entrada"?"Entrada":"Saida"}catch{return"desconhecido"}}const R=5,D=10;function k(t,e=new Date,n=null,r=!1){const o=e.getTime(),a=N(e),s=n!==null?n>=0?`🏦 +${u(n)}`:`🏦 ${u(n)}`:null;if(t.horaEntrada){const i=P(t.horaEntrada),q=c(t.horasPrevistas),z=c(t.abonos),F=c(t.intervalos),v=q+F-z;let d=i+v;r&&n!==null&&(d-=n);const p=Math.max(0,d-h(e));if(p>0){const G=Math.max(0,h(e)-i);return{saidaPrevistaMin:d,saidaPrevista:f(d),restanteMin:p,podeAlertar:B(p),atualizadoEm:o,dataReferencia:a,estado:"working",progresso:I(G,v),textoRestante:`Faltam ${u(p)}`,saldoBancoMin:n,textoBanco:s}}return{saidaPrevistaMin:d,saidaPrevista:f(d),restanteMin:0,podeAlertar:!1,atualizadoEm:o,dataReferencia:a,estado:"done",progresso:100,textoRestante:"Expediente completo!",saldoBancoMin:n,textoBanco:s}}const g=c(t.horasPrevistas),l=c(t.saldo);if(l<0){const i=Math.abs(l);return{saidaPrevistaMin:null,saidaPrevista:"--:--",restanteMin:i,podeAlertar:!1,atualizadoEm:o,dataReferencia:a,estado:"working",progresso:0,textoRestante:`Faltam ~${u(i)}`,saldoBancoMin:n,textoBanco:s}}return l>0?{saidaPrevistaMin:null,saidaPrevista:"Já pode sair! ✓",restanteMin:0,podeAlertar:!1,atualizadoEm:o,dataReferencia:a,estado:"overtime",progresso:100,textoRestante:`Extra +${u(l)}`,saldoBancoMin:n,textoBanco:s}:{saidaPrevistaMin:null,saidaPrevista:"--:--",restanteMin:0,podeAlertar:!1,atualizadoEm:o,dataReferencia:a,estado:"done",progresso:0,textoRestante:g>0?"Aguardando registros...":"Expediente completo!",saldoBancoMin:n,textoBanco:s}}function B(t){return t>=R&&t<=D}function h(t){return C(t)}function N(t){const e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0");return`${e}-${n}-${r}`}const _="genyoTimerStatus",b={usarBancoHoras:!1},x="genyoTimerConfig";async function O(){try{return(await chrome.storage.local.get(x))[x]??b}catch{return b}}function y(){E();async function t(){const e=w();if(e){const n=await O(),r=T(),o=k(e,new Date,r,n.usarBancoHoras);M(o),H(o)}else{const n=document.getElementById("gt-tempo-restante");n&&(n.textContent="Aguardando dados...")}}t(),setInterval(t,6e4)}document.readyState==="complete"?setTimeout(y,2e3):window.addEventListener("load",()=>setTimeout(y,2e3));function H(t){var e;(e=chrome==null?void 0:chrome.storage)!=null&&e.local&&chrome.storage.local.set({[_]:t})}})();
