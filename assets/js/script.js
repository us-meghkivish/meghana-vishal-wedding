const LIVE_LINKS = {
  weddingLive:   "", // paste YouTube/vimeo later
  weddingMap:    "https://maps.app.goo.gl/example-muhurtham-map",
  receptionLive: "",
  receptionMap:  "https://maps.app.goo.gl/example-reception-map"
};

function applyLiveLinks() {
  const setLink = (id, url) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (url && url.trim()) {
      el.href = url; el.removeAttribute("disabled");
      el.classList.remove("opacity-50","pointer-events-none");
    } else {
      el.href = "#"; el.setAttribute("disabled","true");
      el.classList.add("opacity-50","pointer-events-none");
    }
  };
  setLink("wedding-live",   LIVE_LINKS.weddingLive);
  setLink("wedding-map",    LIVE_LINKS.weddingMap);
  setLink("reception-live", LIVE_LINKS.receptionLive);
  setLink("reception-map",  LIVE_LINKS.receptionMap);
}
document.addEventListener("DOMContentLoaded", applyLiveLinks);

/* =========================
   I18N: English + Telugu
   ========================= */
const I18N = {
  en: {
    nav_story: "Our Story",
    nav_details: "Details",
    nav_gallery: "Gallery",
    nav_rsvp: "RSVP",

    hero_tagline: "Are getting married",
    hero_date: "March 8, 2026",

    label_days: "Days",
    label_hours: "Hours",
    label_minutes: "Minutes",
    label_seconds: "Seconds",

    our_story: "Our Story",
    wedding_details: "Wedding Details",
    sangeet: "Sangeet",
    muhurtham: "Muhurtham",
    reception: "Reception",
    view_map: "View Map",

    our_moments: "Our Moments",

    story_p1:
      "With the blessings of our parents and elders, we are taking our first step towards a new life. We are so excited to celebrate our love story with all of our cherished family and friends.",
    story_p2:
      "Your presence and blessings as we begin our journey together is the greatest gift of all.",

    /* RSVP */
    title: "Will You Be Joining Us?",
    subtitle: "Kindly RSVP by February 8, 2026, so we can make arrangements.",
    full_name_label: "Full Name *",
    email_label: "Email *",
    phone_label: "Phone",
    side_label: "Side *",
    side_bride: "Bride",
    side_groom: "Groom",
    headcount_label: "Headcount (incl. you) *",
    events_legend: "Events attending",
    attend_marriage: "Marriage (Mar 8, 2026)",
    attend_reception: "Reception (Mar 8, 2026, evening)",
    note_private: "(Sangeet, Mehendi are private invites.)",
    dietary_label: "Dietary Preference",
    dietary_veg: "Veg",
    dietary_nonveg: "Non-Veg",
    notes_label: "Notes",
    submit_btn: "Submit RSVP",
    submitting: "Submitting…",
    missing: "Please fill required fields.",
    duplicate: "You’ve already RSVP’d with this email. If you need changes, contact us!",
    error: "Oops! Could not submit. Please try again in a minute.",
    success: "Thank you! Your RSVP has been recorded.",

    rights: "© 2026 Meghana & Vishal. All rights reserved."
  },

  te: {
    nav_story: "మా కథ",
    nav_details: "వివరాలు",
    nav_gallery: "గ్యాలరీ",
    nav_rsvp: "ఆహ్వానం",

    hero_tagline: "వివాహ బంధంలోకి అడుగుపెడుతున్నాం",
    hero_date: "మార్చి 8, 2026",

    label_days: "రోజులు",
    label_hours: "గంటలు",
    label_minutes: "నిమిషాలు",
    label_seconds: "సెకన్లు",

    our_story: "మా కథ",
    wedding_details: "వివాహ వివరాలు",
    sangeet: "సంగీత్",
    muhurtham: "ముహూర్తం",
    reception: "రిసెప్షన్",
    view_map: "మ్యాప్ చూడండి",

    our_moments: "మన క్షణాలు",

    story_p1:
      "మా తల్లిదండ్రులు, పెద్దల ఆశీర్వాదాలతో మా కొత్త జీవితంలోకి అడుగుపెడుతున్నాం. మా బంధువులు, స్నేహితులతో కలిసి ఈ ప్రేమకథను జరుపుకోవడం ఎంతో ఆనందంగా ఉంది.",
    story_p2:
      "ఈ ప్రయాణాన్ని మొదలుపెట్టే సమయంలో మీ హాజరు, ఆశీర్వాదాలే మా కోసం గొప్ప బహుమతి.",

    /* RSVP */
    title: "మీరు హాజరు అవుతున్నారా?",
    subtitle: "దయచేసి 2026 ఫిబ్రవరి 8 లోపు RSVP చేయండి.",
    full_name_label: "పూర్తి పేరు *",
    email_label: "ఈమెయిల్ *",
    phone_label: "ఫోన్",
    side_label: "వైపు *",
    side_bride: "వధువు",
    side_groom: "వరుడు",
    headcount_label: "పాల్గొనే వారి సంఖ్య (మీరు సహా) *",
    events_legend: "ఏ కార్యక్రమాలకు వస్తున్నారు",
    attend_marriage: "వివాహం (మార్చి 8, 2026)",
    attend_reception: "రిసెప్షన్ (మార్చి 8, 2026 సాయంత్రం)",
    note_private: "(సంగీత్, మెహెందీ ప్రత్యేక ఆహ్వానాలు.)",
    dietary_label: "ఆహార అలవాటు",
    dietary_veg: "శాకాహారం",
    dietary_nonveg: "మాంసాహారం",
    notes_label: "గమనికలు",
    submit_btn: "హాజరు నమోదు పంపించండి",
    submitting: "సబ్మిట్ అవుతోంది…",
    missing: "దయచేసి అవసరమైన వివరాలు పూరించండి.",
    duplicate: "ఈ ఈమెయిల్‌తో ఇప్పటికే RSVP చేశారు. మార్చాలి అనుకుంటే మాకు తెలియజేయండి!",
    error: "క్షమించండి! ఇప్పుడే పంపలేకపోయాం. కొద్దిసేపటి తర్వాత ప్రయత్నించండి.",
    success: "ధన్యవాదాలు! మీ హాజరు వివరాలు నమోదు అయ్యాయి.",

    rights: "© 2026 మెఘనా & విశాల్. అన్ని హక్కులు రిజర్వు."
  }
};

let currentLang = localStorage.getItem("lang") || "en";
function applyI18n(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "te" ? "te" : "en";

  document.querySelectorAll("[data-i18n]").forEach(node => {
    const key = node.getAttribute("data-i18n");
    const txt = I18N[lang][key];
    if (typeof txt !== "undefined") node.textContent = txt;
  });

  // update hidden lang field (if present in RSVP)
  const langInput = document.getElementById("rsvp-language");
  if (langInput) langInput.value = lang;

  // animate language pill thumb (desktop)
  const isTE = lang === "te";
  if (window.gsap) {
    gsap.to("#lang-thumb", { x: isTE ? 22 : 0, duration: 0.25, ease: "power2.out" });
    gsap.fromTo("#lang-toggle", { boxShadow: "0 0 0 rgba(0,0,0,0)" },
                             { boxShadow: "0 8px 20px rgba(0,0,0,.08)", duration: 0.25, ease: "power2.out" });
    // mobile pill (if present)
    gsap.to("#lang-thumb-mobile", { x: isTE ? 22 : 0, duration: 0.25, ease: "power2.out" });
  } else {
    const thumb = document.getElementById("lang-thumb");
    if (thumb) thumb.style.transform = isTE ? "translateX(22px)" : "translateX(0)";
    const thumbM = document.getElementById("lang-thumb-mobile");
    if (thumbM) thumbM.style.transform = isTE ? "translateX(22px)" : "translateX(0)";
  }

  localStorage.setItem("lang", lang);
}

const langToggle = document.getElementById("lang-toggle");
if (langToggle) {
  langToggle.addEventListener("click", () => applyI18n(currentLang === "en" ? "te" : "en"));
  if (window.gsap) gsap.from("#lang-toggle", { y: -8, opacity: 0, duration: 0.5, ease: "power3.out", delay: 0.1 });
}
const langToggleMobile = document.getElementById("lang-toggle-mobile");
if (langToggleMobile) {
  langToggleMobile.addEventListener("click", () => applyI18n(currentLang === "en" ? "te" : "en"));
}

// initial language
applyI18n(currentLang);


/* =========================
   UI interactions
   ========================= */

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('hidden') === false;
    mobileMenuButton.setAttribute('aria-expanded', String(open));
  });
}

// Smooth scroll for in-page links (offset for sticky header)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    const target = document.querySelector(href);
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

// Custom cursor (desktop only)
const cursorDot = document.getElementById('cursor-dot');
if (cursorDot) {
  window.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovered'));
  });
}

// Scroll reveal + story photo slide-in
const revealElements = document.querySelectorAll('.reveal');
const storyContainer = document.getElementById('story-container');
const groomPhoto = document.getElementById('groom-photo');
const bridePhoto = document.getElementById('bride-photo');
let storyAnimated = false;

const handleScrollAnimations = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) el.classList.add('visible');
  });

  if (storyContainer && !storyAnimated) {
    const rect = storyContainer.getBoundingClientRect();
    if (rect.top < windowHeight * 0.75) {
      if (bridePhoto) bridePhoto.style.transform = 'translateX(25%)';
      if (groomPhoto) groomPhoto.style.transform = 'translateX(-25%)';
      storyAnimated = true;
    }
  }
};
window.addEventListener('scroll', handleScrollAnimations);
handleScrollAnimations();

// Countdown timer
const countdown = () => {
  const countDate = new Date('March 8, 2026 00:00:00').getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const container = document.getElementById('countdown');
  if (!container) return;

  if (gap < 0) {
    container.innerHTML = `<h2 class='text-3xl font-serif'>${currentLang === 'te' ? 'ఈ రోజు వచ్చేసింది!' : 'The day is here!'}</h2>`;
    return;
  }

  const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
  const d = Math.floor(gap / day);
  const h = Math.floor((gap % day) / hour);
  const m = Math.floor((gap % hour) / minute);
  const s = Math.floor((gap % minute) / second);

  const upd = (id, val) => {
    const e = document.getElementById(id);
    if (e && e.innerText != val) {
      e.innerText = val;
      e.classList.add('tick');
      e.addEventListener('animationend', () => e.classList.remove('tick'), { once: true });
    }
  };

  upd('days', d); upd('hours', h); upd('minutes', m); upd('seconds', s);
};
setInterval(countdown, 1000);
countdown();


/* =========================
   Supabase RSVP submit
   ========================= */
/*  IMPORTANT:
    Replace the placeholders below with your real values from
    Supabase → Settings → API:
      - SUPABASE_URL looks like: https://xxxxxx.supabase.co
      - SUPABASE_ANON_KEY is the anon public key
*/
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function submitRsvp(e) {
  e.preventDefault();
  const form = e.target;
  const statusEl = document.getElementById('rsvp-status');
  const t = I18N[currentLang];

  statusEl.textContent = t.submitting;
  statusEl.style.color = "";

  const data = {
    full_name: form.full_name.value.trim(),
    email: form.email.value.trim().toLowerCase(),
    phone: form.phone.value.trim() || null,
    side: form.side.value,
    headcount: Number(form.headcount.value || 0),
    attending_marriage: form.attending_marriage.checked,
    attending_reception: form.attending_reception.checked,
    dietary: (form.dietary.value === 'Veg' || form.dietary.value === 'Non-Veg') ? form.dietary.value : null,
    language: currentLang,
    notes: form.notes.value?.trim() || null,
    user_agent: navigator.userAgent
  };

  if (!data.full_name || !data.email || !data.side || !data.headcount) {
    statusEl.textContent = t.missing;
    statusEl.style.color = "crimson";
    return;
  }

  const { error } = await sb.from('rsvps').insert(data);

  if (error) {
    // TEMP: expose exact error to help diagnose; you can remove details later
    const details = error?.message || "";
    statusEl.textContent = /duplicate key/i.test(details) ? t.duplicate : `${t.error} (${details})`;
    statusEl.style.color = "crimson";
    console.error(error);
    return;
  }

  statusEl.textContent = t.success;
  statusEl.style.color = "green";
  form.reset();
}

const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) rsvpForm.addEventListener('submit', submitRsvp);