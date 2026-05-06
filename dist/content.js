(function(){"use strict";const p="genyo-timer-floating-bar";function v(){const t=document.getElementById(p);if(t)return t;const e=document.createElement("div");return e.id=p,e.innerHTML=`
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
  `,y(),document.body.appendChild(e),e}function M(t){const e=document.getElementById("gt-tempo-restante"),n=document.getElementById("gt-progress-bar"),a=document.getElementById("gt-saida-prevista"),o=document.getElementById(p);!e||!n||!a||!o||(e.textContent=t.textoRestante,a.textContent=t.estado==="done"&&t.saidaPrevistaMin!==null?"✓":t.saidaPrevista,o.className=`gt-status-${t.estado}`,n.style.width=`${t.progresso}%`)}function y(){if(document.getElementById("genyo-timer-styles"))return;const t=document.createElement("style");t.id="genyo-timer-styles",t.textContent=`
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
  `,document.head.appendChild(t)}function E(){var r,s,d,l,u;const t=document.querySelector("#tabelaHistoricoPontos tbody");if(!t)return null;const e=t.querySelectorAll(":scope > tr");if(e.length<2)return null;const a=e[0].querySelectorAll("td");return a.length<6?null:{horasPrevistas:(((r=a[1])==null?void 0:r.textContent)??"").trim()||"00:00",horasTrabalhadas:(((s=a[2])==null?void 0:s.textContent)??"").trim()||"00:00",abonos:(((d=a[3])==null?void 0:d.textContent)??"").trim()||"00:00",intervalos:(((l=a[4])==null?void 0:l.textContent)??"").trim()||"00:00",saldo:(((u=a[5])==null?void 0:u.textContent)??"").trim()||"00:00",horaEntrada:S(e[1]),status:P()}}function S(t){var o,r;const e=t.querySelector(".timeline"),n=e==null?void 0:e.querySelector('li[id="Entrada"]');return((r=(o=n==null?void 0:n.querySelector(".date"))==null?void 0:o.textContent)==null?void 0:r.trim())||null}function P(){var n;const t=document.getElementById("dadosPontos"),e=(n=t==null?void 0:t.dataset)==null?void 0:n.ultimoPonto;if(!e)return"desconhecido";try{return JSON.parse(e).motivo==="Entrada"?"Entrada":"Saida"}catch{return"desconhecido"}}function i(t){const e=t.trim();if(!e||e==="-")return 0;const n=e.startsWith("-"),[a,o]=e.replace(/^-/,"").split(":").map(Number),r=a*60+o;return n?-r:r}function m(t){const e=Math.abs(t),n=Math.floor(e/60),a=e%60;return n===0?`${a}min`:a===0?`${n}h`:`${n}h${a}min`}function w(t){const[e,n]=t.split(":").map(Number);return e*60+n}function A(t=new Date){return t.getHours()*60+t.getMinutes()}function f(t){const e=Math.floor(t/60)%24,n=t%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function I(t,e){return e===0?0:Math.min(100,Math.round(t/e*100))}const $=5,C=10;function R(t,e=new Date){const n=e.getTime(),a=k(e);if(t.horaEntrada){const s=w(t.horaEntrada),d=i(t.horasPrevistas),l=i(t.abonos),u=i(t.intervalos),x=d+u-l,c=s+x,g=Math.max(0,c-h(e));if(g>0){const N=Math.max(0,h(e)-s);return{saidaPrevistaMin:c,saidaPrevista:f(c),restanteMin:g,podeAlertar:B(g),atualizadoEm:n,dataReferencia:a,estado:"working",progresso:I(N,x),textoRestante:`Faltam ${m(g)}`}}return{saidaPrevistaMin:c,saidaPrevista:f(c),restanteMin:0,podeAlertar:!1,atualizadoEm:n,dataReferencia:a,estado:"done",progresso:100,textoRestante:"Expediente completo!"}}const o=i(t.horasPrevistas),r=i(t.saldo);if(r<0){const s=Math.abs(r);return{saidaPrevistaMin:null,saidaPrevista:"--:--",restanteMin:s,podeAlertar:!1,atualizadoEm:n,dataReferencia:a,estado:"working",progresso:0,textoRestante:`Faltam ~${m(s)}`}}return r>0?{saidaPrevistaMin:null,saidaPrevista:"Já pode sair! ✓",restanteMin:0,podeAlertar:!1,atualizadoEm:n,dataReferencia:a,estado:"overtime",progresso:100,textoRestante:`Extra +${m(r)}`}:{saidaPrevistaMin:null,saidaPrevista:"--:--",restanteMin:0,podeAlertar:!1,atualizadoEm:n,dataReferencia:a,estado:"done",progresso:0,textoRestante:o>0?"Aguardando registros...":"Expediente completo!"}}function B(t){return t>=$&&t<=C}function h(t){return A(t)}function k(t){const e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${n}-${a}`}const D="genyoTimerStatus";function b(){v();function t(){const e=E();if(e){const n=R(e);M(n),T(n)}else{const n=document.getElementById("gt-tempo-restante");n&&(n.textContent="Aguardando dados...")}}t(),setInterval(t,6e4)}document.readyState==="complete"?setTimeout(b,2e3):window.addEventListener("load",()=>setTimeout(b,2e3));function T(t){var e;(e=chrome==null?void 0:chrome.storage)!=null&&e.local&&chrome.storage.local.set({[D]:t})}})();
