/* Ported verbatim from "Adnan Main Portfolio.html" lines 11227-11286.
   Only edit: 'export' added to the initLinkedInBadge declaration. */
export function initLinkedInBadge(){
    const stage    = document.getElementById("linkedin-badge-stage");
    const fallback = document.getElementById("linkedin-fallback");
    if(!stage || !fallback) return;

    let native = false;   // native badge confirmed rendered
    let attempts = 0;
    let timer = null;

    function nativeBadgeLooksReady(){
      const badge = stage.querySelector(".LI-profile-badge");
      if(!badge) return false;
      return !!badge.querySelector("iframe") ||
             !!badge.querySelector(".badge-base__content") ||
             badge.getBoundingClientRect().height > 140;
    }

    function showFallback(){
      if(native) return;
      document.body.classList.add("linkedin-fallback-visible");
    }

    function useNative(){
      native = true;
      document.body.classList.remove("linkedin-fallback-visible");
      document.body.classList.add("linkedin-native-loaded");
    }

    function tryParse(){
      try{
        if(window.IN && typeof window.IN.parse === "function") window.IN.parse(stage);
      }catch(err){
        console.warn("LinkedIn badge parse:", err);
      }
    }

    function check(){
      if(native) return;
      attempts += 1;
      tryParse();

      if(nativeBadgeLooksReady()){ useNative(); return; }
      if(attempts >= 12){ showFallback(); return; }

      timer = window.setTimeout(check, 500);
    }

    window.setTimeout(check, 250);

    // The async script may finish after the first checks. Give it another pass —
    // but never re-hide a badge that already rendered.
    window.addEventListener("load", function(){
      if(native) return;
      attempts = 0;
      window.clearTimeout(timer);
      window.setTimeout(check, 150);
    });
  
}

