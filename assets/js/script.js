document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const SB_URL = 'YOUR_URL'; const SB_KEY = 'YOUR_KEY'; // Placeholder

  // --- I18N DICTIONARY ---
  const content = {
    en: {
      nav_story: "Our Story",
      nav_gallery: "Gallery",
      nav_albums: "Albums",
      nav_rsvp: "RSVP",
      hero_tagline: "We Are Getting Married",
      label_days: "Days", label_hours: "Hrs", label_minutes: "Mins",
      
      story_label: "How It Happened",
      story_title: "It Wasn't Love at First Sight...",
      story_p1: "It started with a casual coffee that turned into a 4-hour conversation. We didn't realize it then, but amidst the debates about movies and shared laughter over bad jokes, we were finding our home in each other.",
      story_p2: "From long drives with no destination to quiet moments that said everything, our bond grew stronger every day. Now, with the blessings of our families, we are ready to turn our \"best friendship\" into a \"forever partnership.\"",
      story_quote: "\"Everything makes sense when we're together.\"",
      
      gallery_title: "Captured Moments",
      gallery_sub: "Glimpses of our journey",
      
      albums_title: "Celebrations",
      album_haldi: "Haldi",
      album_sangeet: "Sangeet",
      
      rsvp_title: "RSVP",
      rsvp_deadline: "Please respond by Feb 15, 2026",
      rsvp_name: "Full Name",
      rsvp_phone: "Mobile Number",
      rsvp_side_label: "You are from",
      rsvp_bride_side: "Bride's Side",
      rsvp_groom_side: "Groom's Side",
      rsvp_events_label: "Events Attending",
      rsvp_event_m: "Marriage (Muhurtham)",
      rsvp_event_r: "Reception (Evening)",
      rsvp_guests: "Total Guests",
      rsvp_btn: "Confirm Attendance"
    },
    te: {
      nav_story: "మా కథ",
      nav_gallery: "చిత్రమాలిక",
      nav_albums: "వేడుకలు",
      nav_rsvp: "ఆహ్వానం",
      hero_tagline: "మేము ఒక్కటవుతున్నాము",
      label_days: "రోజులు", label_hours: "గంటలు", label_minutes: "నిమిషాలు",
      
      story_label: "మా ప్రయాణం",
      story_title: "ఇది తొలిచూపు ప్రేమ కాదు...",
      story_p1: "మా కథ ఒక సాధారణ కాఫీతో మొదలైంది. సినిమాల గురించి చర్చలు, చిన్న చిన్న జోకులు... మాకు తెలియకుండానే మేము ఒకరికొకరం దగ్గరయ్యాం.",
      story_p2: "గమ్యం లేని ప్రయాణాలు, మౌనంగా సాగిన సంభాషణలు... మా బంధం బలపడింది. ఇప్పుడు, పెద్దల ఆశీర్వాదంతో, మా స్నేహాన్ని పెళ్లి బంధంగా మార్చుకుంటున్నాం.",
      story_quote: "\"మేము కలిసున్నప్పుడు ప్రపంచం అందంగా కనిపిస్తుంది.\"",
      
      gallery_title: "మధుర క్షణాలు",
      gallery_sub: "మా ప్రయాణంలోని కొన్ని దృశ్యాలు",
      
      albums_title: "వేడుకలు",
      album_haldi: "హల్దీ",
      album_sangeet: "సంగీత్",
      
      rsvp_title: "ఆహ్వానం",
      rsvp_deadline: "దయచేసి ఫిబ్రవరి 15, 2026 లోపు తెలియజేయండి",
      rsvp_name: "పూర్తి పేరు",
      rsvp_phone: "ఫోన్ నంబర్",
      rsvp_side_label: "మీరు ఎవరి తరపు?",
      rsvp_bride_side: "వధువు తరపు",
      rsvp_groom_side: "వరుడు తరపు",
      rsvp_events_label: "కార్యక్రమాలు",
      rsvp_event_m: "వివాహం (ముహూర్తం)",
      rsvp_event_r: "రిసెప్షన్",
      rsvp_guests: "మొత్తం అతిథులు",
      rsvp_btn: "నిర్ధారించండి"
    }
  };

  // --- ANIMATIONS ---
  gsap.to(".animate-fade-in-up", { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.2 });
  gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.to(text, { scrollTrigger: { trigger: text, start: "top 85%" }, y: 0, opacity: 1, duration: 1 });
  });
  gsap.utils.toArray('.curtain-reveal').forEach(el => {
    ScrollTrigger.create({ trigger: el, start: "top 75%", onEnter: () => el.classList.add('reveal-active') });
  });

  // --- LANGUAGE SWITCHER ---
  const langBtn = document.getElementById("lang-toggle");
  let currentLang = "en";
  if (langBtn) {
    langBtn.onclick = () => {
      currentLang = currentLang === "en" ? "te" : "en";
      document.querySelectorAll("[data-i18n]").forEach(el => {
        gsap.to(el, { opacity: 0, duration: 0.2, onComplete: () => {
          el.innerHTML = content[currentLang][el.getAttribute("data-i18n")];
          gsap.to(el, { opacity: 1, duration: 0.2 });
        }});
      });
      langBtn.innerText = currentLang === "en" ? "EN / తెలుగు" : "తెలుగు / EN";
    };
  }

  // --- MUSIC ---
  const musicBtn = document.getElementById("music-control");
  const audio = document.getElementById("bg-music");
  let isPlaying = false;
  musicBtn.onclick = () => {
    if(isPlaying) { audio.pause(); musicBtn.classList.add("opacity-50"); }
    else { audio.play(); musicBtn.classList.remove("opacity-50"); }
    isPlaying = !isPlaying;
  };
  document.addEventListener('click', () => { if(!isPlaying) { audio.play().then(() => isPlaying=true).catch(()=>{}); } }, {once:true});

  // --- COUNTDOWN ---
  setInterval(() => {
    const gap = new Date('March 8, 2026 11:11:00').getTime() - new Date().getTime();
    if(gap > 0) {
       document.getElementById("days").innerText = Math.floor(gap / 86400000);
       document.getElementById("hours").innerText = Math.floor((gap % 86400000) / 3600000);
       document.getElementById("minutes").innerText = Math.floor((gap % 3600000) / 60000);
    }
  }, 1000);

  // --- RSVP COUNTER ---
  let gCount = 1;
  document.getElementById('plus').onclick = () => { if(gCount<10) { gCount++; document.getElementById('guest-count').innerText = gCount; } };
  document.getElementById('minus').onclick = () => { if(gCount>1) { gCount--; document.getElementById('guest-count').innerText = gCount; } };

  // --- UTILS ---
  const cursor = document.getElementById('cursor-dot');
  window.addEventListener('mousemove', e => gsap.to(cursor, {x: e.clientX, y: e.clientY, duration: 0.1}));
});