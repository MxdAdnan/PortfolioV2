/* Ported verbatim from "Adnan Main Portfolio.html" lines 11287-11446.
   Only edit: 'export' added to the initCta declaration. */
export function initCta(){
  const openForm=document.getElementById("ctaOpenForm");
  const closeForm=document.getElementById("ctaCloseForm");
  const modal=document.getElementById("ctaModal");
  const form=document.getElementById("ctaForm");
  const status=document.getElementById("ctaFormStatus");

  function openCtaModal(){
    if(!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";

    if(typeof gsap!=="undefined" &&
       !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      gsap.fromTo(".cta-modal__dialog",
        {opacity:0,y:18,scale:.985},
        {opacity:1,y:0,scale:1,duration:.35,ease:"power3.out"}
      );
    }

    const firstField=modal.querySelector("input");
    if(firstField) firstField.focus();
  }

  function closeCtaModal(){
    if(!modal) return;

    const finish=()=>{
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden","true");
      document.body.style.overflow="";
    };

    if(typeof gsap!=="undefined" &&
       modal.classList.contains("is-open") &&
       !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      gsap.to(".cta-modal__dialog",{
        opacity:0,
        y:14,
        scale:.985,
        duration:.2,
        ease:"power2.in",
        onComplete:finish
      });
    }else{
      finish();
    }
  }

  if(openForm) openForm.addEventListener("click",openCtaModal);
  if(closeForm) closeForm.addEventListener("click",closeCtaModal);

  if(modal){
    modal.querySelector("[data-cta-close]")?.addEventListener("click",closeCtaModal);
  }

  document.addEventListener("keydown",(event)=>{
    if(event.key==="Escape" && modal?.classList.contains("is-open")){
      closeCtaModal();
    }
  });

  if(form){
    form.addEventListener("submit",(event)=>{
      event.preventDefault();

      // No backend wired up yet — open a pre-filled mailto: as an honest,
      // zero-signup fallback so the enquiry actually reaches someone.
      // Swap for a real endpoint call once one is connected.
      const ownerEmail = "mohamedadnandxb07@gmail.com";
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const project = (data.get("project") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      const mailSubject = `Portfolio enquiry: ${project || "General"}`;
      const mailBody = `Name: ${name}\nEmail: ${email}\nWorking on: ${project}\n\n${message}`;
      const mailtoHref =
        `mailto:${encodeURIComponent(ownerEmail)}` +
        `?subject=${encodeURIComponent(mailSubject)}` +
        `&body=${encodeURIComponent(mailBody)}`;

      window.location.href = mailtoHref;

      if(status){
        status.textContent="Thanks — your email app should now be open with your enquiry ready to send. If nothing opened, email me directly at " + ownerEmail + ".";
      }
    });
  }

  const section=document.getElementById("cta");

  if(!section) return;

  const reduced=window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(
    typeof gsap==="undefined" ||
    typeof ScrollTrigger==="undefined" ||
    reduced
  ){
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const tl=gsap.timeline({
    scrollTrigger:{
      trigger:section,
      start:"top 78%",
      once:true
    }
  });

  tl
    .from(".cta__panel",{
      opacity:0,
      y:34,
      scale:.985,
      duration:.72,
      ease:"power3.out"
    })
    .from(".cta__eyebrow",{
      opacity:0,
      x:-22,
      duration:.42,
      ease:"power2.out"
    },"-=.42")
    .from(".cta__title",{
      opacity:0,
      y:24,
      duration:.58,
      ease:"power3.out"
    },"-=.28")
    .from(".cta__copy",{
      opacity:0,
      y:16,
      duration:.4,
      ease:"power2.out"
    },"-=.30")
    .from(".cta__button",{
      opacity:0,
      y:12,
      stagger:.07,
      duration:.36,
      ease:"power2.out"
    },"-=.20")
    .from(".cta__orb",{
      opacity:0,
      scale:.82,
      rotate:-8,
      duration:.7,
      ease:"power3.out"
    },"-=.58");
}

