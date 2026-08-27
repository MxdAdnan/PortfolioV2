/* Ported verbatim from "Adnan Main Portfolio.html" lines 11165-11226.
   Only edit: 'export' added to the initGithubCard declaration. */
export function initGithubCard(){
    const target = document.getElementById("github-profile-badge");
    if(!target) return;

    const PROFILE_URL = "https://github.com/MxdAdnan";

    // API values are rendered as text, never injected as markup.
    const esc = v => String(v).replace(/[&<>"']/g, c =>
      ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));

    const safeUrl = u => (typeof u === "string" && /^https:\/\//i.test(u)) ? u : null;

    function renderError(){
      target.innerHTML = `
        <div class="btp-github-card">
          <div class="btp-github-name">GitHub profile</div>
          <p class="btp-github-bio">Live profile data isn't available right now. The profile itself still opens below.</p>
          <a class="btp-github-link" href="${PROFILE_URL}" target="_blank" rel="noopener noreferrer">View GitHub profile →</a>
        </div>`;
    }

    fetch("https://api.github.com/users/MxdAdnan")
      .then(r => { if(!r.ok) throw new Error("GitHub API " + r.status); return r.json(); })
      .then(user => {
        const name   = esc(user.name || user.login || "GitHub profile");
        const login  = esc(user.login || "");
        const bio    = esc(user.bio || "Building and shipping web projects.");
        const repos  = Number.isFinite(user.public_repos) ? user.public_repos : "—";
        const foll   = Number.isFinite(user.followers) ? user.followers : "—";
        const link   = safeUrl(user.html_url) || PROFILE_URL;
        const avatar = safeUrl(user.avatar_url);

        target.innerHTML = `
          <div class="btp-github-card">
            <div class="btp-github-top">
              ${avatar ? `<img class="btp-github-avatar" src="${esc(avatar)}" alt="" width="64" height="64" loading="lazy" decoding="async">` : ""}
              <div class="btp-github-id">
                <div class="btp-github-name">${name}</div>
                ${login ? `<div class="btp-github-handle">@${login}</div>` : ""}
              </div>
            </div>

            <p class="btp-github-bio">${bio}</p>

            <div class="btp-github-stats">
              <span><strong>${esc(repos)}</strong>Public repos</span>
              <span><strong>${esc(foll)}</strong>Followers</span>
            </div>

            <a class="btp-github-link" href="${esc(link)}" target="_blank" rel="noopener noreferrer">View GitHub profile →</a>
          </div>`;

        const img = target.querySelector(".btp-github-avatar");
        if(img) img.addEventListener("error", () => img.remove());
      })
      .catch(err => {
        console.warn("GitHub profile:", err.message);
        renderError();
      });
  
}

