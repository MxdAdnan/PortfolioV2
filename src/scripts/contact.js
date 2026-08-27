/* Ported verbatim from "Adnan Main Portfolio.html" lines 11447-11663.
   Only edit: 'export' added to the initContact declaration. */
export function initContact(){
  const section = document.querySelector(".contact");
  const form = document.getElementById("contactForm");
  const submit = document.getElementById("contactSubmit");
  const status = document.getElementById("contactStatus");

  if(!section || !form) return;

  const fields = {
    name: {
      input: document.getElementById("contactName"),
      error: document.getElementById("contactNameError"),
      message: "Please enter your full name."
    },
    email: {
      input: document.getElementById("contactEmail"),
      error: document.getElementById("contactEmailError"),
      message: "Please enter a valid email address."
    },
    company: {
      input: document.getElementById("contactCompany"),
      error: document.getElementById("contactCompanyError"),
      message: "Please enter your company or organization."
    },
    subject: {
      input: document.getElementById("contactSubject"),
      error: document.getElementById("contactSubjectError"),
      message: "Please enter a subject."
    },
    message: {
      input: document.getElementById("contactMessage"),
      error: document.getElementById("contactMessageError"),
      message: "Please enter a message."
    }
  };

  function clearStatus(){
    status.className="contact__status";
    status.textContent="";
  }

  function setError(field, message){
    field.input.setAttribute("aria-invalid","true");
    field.error.textContent=message;
  }

  function clearError(field){
    field.input.removeAttribute("aria-invalid");
    field.error.textContent="";
  }

  function validate(){
    let valid=true;

    Object.values(fields).forEach(clearError);

    const name=fields.name.input.value.trim();
    const email=fields.email.input.value.trim();
    const company=fields.company.input.value.trim();
    const subject=fields.subject.input.value.trim();
    const message=fields.message.input.value.trim();

    if(!name){
      setError(fields.name, fields.name.message);
      valid=false;
    }

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailPattern.test(email)){
      setError(fields.email, fields.email.message);
      valid=false;
    }

    if(!company){
      setError(fields.company, fields.company.message);
      valid=false;
    }

    if(!subject){
      setError(fields.subject, fields.subject.message);
      valid=false;
    }

    if(!message){
      setError(fields.message, fields.message.message);
      valid=false;
    }

    return valid;
  }

  Object.values(fields).forEach(field=>{
    field.input.addEventListener("input",()=>{
      if(field.input.getAttribute("aria-invalid")==="true"){
        clearError(field);
      }
      clearStatus();
    });
  });

  form.addEventListener("submit",function(event){

    event.preventDefault();

    clearStatus();

    if(!validate()){

      status.textContent=
        "Please correct the highlighted fields and try again.";

      status.className=
        "contact__status is-error";

      const firstInvalid=
        form.querySelector('[aria-invalid="true"]');

      if(firstInvalid){
        firstInvalid.focus();
      }

      return;
    }

    /*
      No backend is wired up yet (no Formspree/Web3Forms/API key on file), so
      there is nothing to POST to. Rather than fake a "message received" state
      with nowhere for the message to go, this opens a pre-filled mailto: to
      the owner's own address — an honest, zero-signup fallback that actually
      delivers the message. Swap this block for a real endpoint call once one
      is connected; the mailto stays as a safety net if that endpoint ever fails.
    */

    const ownerEmail = "mohamedadnandxb07@gmail.com";
    const name    = fields.name.input.value.trim();
    const email   = fields.email.input.value.trim();
    const company = fields.company.input.value.trim();
    const subjectLine = fields.subject.input.value.trim();
    const messageBody = fields.message.input.value.trim();

    const mailSubject = `Portfolio contact: ${subjectLine}`;
    const mailBody =
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${messageBody}`;
    const mailtoHref =
      `mailto:${encodeURIComponent(ownerEmail)}` +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(mailBody)}`;

    submit.disabled=true;
    submit.textContent="SENDING…";

    window.setTimeout(()=>{

      window.location.href = mailtoHref;

      form.reset();

      Object.values(fields).forEach(clearError);

      status.textContent=
        "Thanks — your email app should now be open with your message ready to send. If nothing opened, email me directly at " + ownerEmail + ".";

      status.className=
        "contact__status is-success";

      submit.disabled=false;
      submit.textContent="SEND MESSAGE";

    },650);

  });

  /* =========================================================
     GSAP + SCROLLTRIGGER
     ========================================================= */

  if(
    typeof gsap!=="undefined" &&
    typeof ScrollTrigger!=="undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ){

    gsap.registerPlugin(ScrollTrigger);

    const introTimeline=gsap.timeline({
      scrollTrigger:{
        trigger:section,
        start:"top 78%",
        once:true
      }
    });

    introTimeline
      .from(".contact__header > *",{
        opacity:0,
        y:28,
        duration:.7,
        stagger:.08,
        ease:"power3.out"
      })
      .from(".contact__info",{
        opacity:0,
        x:-28,
        duration:.65,
        ease:"power3.out"
      },"-=.35")
      .from(".contact__form-wrap",{
        opacity:0,
        x:28,
        duration:.65,
        ease:"power3.out"
      },"-=.55");

  }
}

