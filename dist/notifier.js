(function(){"use strict";const e="genyo-timer-exit-alert",n="genyo-timer-exit-alert-styles";chrome.runtime.onMessage.addListener(t=>{t.type==="GENYO_TIMER_SHOW_EXIT_ALERT"&&i(t.payload)});function i(t){a();const r=document.getElementById(e);r&&r.remove();const o=document.createElement("div");o.id=e,o.setAttribute("role","status"),o.innerHTML=`
    <button class="gt-alert-close" type="button" aria-label="Fechar">×</button>
    <div class="gt-alert-title">Está perto da hora de saída</div>
    <div class="gt-alert-time">Saída prevista: <strong>${d(t.saidaPrevista)}</strong></div>
    <button class="gt-alert-action" type="button">Entendi</button>
  `,o.querySelectorAll("button").forEach(s=>{s.addEventListener("click",()=>o.remove())}),document.body.appendChild(o),window.setTimeout(()=>o.remove(),3e4)}function a(){if(document.getElementById(n))return;const t=document.createElement("style");t.id=n,t.textContent=`
    #${e} {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 2147483647;
      box-sizing: border-box;
      width: min(360px, calc(100vw - 32px));
      padding: 16px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      background: #20242c;
      color: #f8fafc;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32);
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    }
    #${e} .gt-alert-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: #cbd5e1;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
    }
    #${e} .gt-alert-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
    #${e} .gt-alert-title {
      margin-right: 32px;
      color: #ffffff;
      font-size: 15px;
      font-weight: 700;
    }
    #${e} .gt-alert-time {
      margin-top: 6px;
      color: #dbe3ee;
    }
    #${e} .gt-alert-action {
      margin-top: 14px;
      min-height: 34px;
      padding: 0 14px;
      border: 0;
      border-radius: 6px;
      background: #f59f00;
      color: #141414;
      cursor: pointer;
      font-weight: 700;
    }
    #${e} .gt-alert-action:hover {
      background: #ffb224;
    }
  `,document.head.appendChild(t)}function d(t){return t.replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r])}})();
