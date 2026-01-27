document.addEventListener("DOMContentLoaded", () => {
  
  // =========================================================
  // 1. SETUP & CONFIGURATION
  // =========================================================
  gsap.registerPlugin(ScrollTrigger);

  // SUPABASE CONFIGURATION
  // If you want to save RSVPs to a real database, add your keys here.
  const SB_URL = 'YOUR_SUPABASE_URL_HERE';
  const SB_KEY = 'YOUR_SUPABASE_KEY_HERE';
  
  let supabaseClient = null;
  try {
    if (typeof supabase !== 'undefined' && SB_URL.startsWith('https://')) {
      supabaseClient = supabase.createClient(SB_URL, SB_KEY);
    }
  } catch (err) {
    console.log("Supabase not configured. Running in simulation mode.");
  }


  // =========================================================
  // 2. LANGUAGE & TRANSLATIONS (I18N)
  // =========================================================
  const langBtn = document.getElementById("lang-toggle");
  let currentLang = "en";

  const content = {
    en: {
      // Navigation
      nav_story: "Our Story",
      nav_gallery: "Gallery",
      nav_venues: "Venues",
      nav_albums: "Albums",
      nav_rsvp: "RSVP",
      
      // Hero
      hero_tagline: "We Are Getting Married",
      label_days: "Days", label_hours: "Hrs", label_minutes: "Mins", label_seconds: "Secs",
      
      // Story
      story_label: "How It Happened",
      story_title: "It Wasn't Love at First Sight...",
      story_p1: "It started with a casual coffee that turned into a 4-hour conversation. We didn't realize it then, but amidst the debates about movies and shared laughter over bad jokes, we were finding our home in each other.",
      story_p2: "From long drives with no destination to quiet moments that said everything, our bond grew stronger every day. Now, with the blessings of our families, we are ready to turn our \"best friendship\" into a \"forever partnership.\"",
      story_quote: "\"Everything makes sense when we're together.\"",
      
      // Gallery
      gallery_title: "Captured Moments",
      gallery_sub: "Glimpses of our journey",

      // Venues (New)
      venues_title: "When & Where",
      venue_wedding: "The Wedding",
      venue_wedding_time: "March 8, 2026 | 11:11 AM",
      venue_reception: "The Reception",
      venue_reception_time: "March 8, 2026 | 7:00 PM",
      btn_live: "Watch Live",
      btn_map: "View Map",
      
      // Albums
      albums_title: "Celebrations",
      album_haldi: "Haldi",
      album_sangeet: "Sangeet",
      album_wedding: "Wedding",
      album_reception: "Reception",
      
      // RSVP
      rsvp_title: "RSVP",
      rsvp_deadline: "Please respond by Feb 15, 2026",
      rsvp_name: "Full Name",
      rsvp_phone: "Mobile Number",
      rsvp_side_label: "You are from",
      rsvp_bride_side: "Bride's Side",
      rsvp_groom_side: "Groom's Side",
      rsvp_events_label: "Events Attending",
      rsvp_event_m: "Wedding (Muhurtham)",
      rsvp_event_r: "Reception (Evening)",
      rsvp_guests: "Total Guests",
      rsvp_btn: "Confirm Attendance",
      
      // Footer/Misc
      visit_label: "Views:"
    },
    te: {
      // Navigation
      nav_story: "మా కథ",
      nav_gallery: "జ్ఞాపకాలు",
      nav_venues: "వేదికలు",
      nav_albums: "వేడుకలు",
      nav_rsvp: "ఆహ్వానం",
      
      // Hero
      hero_tagline: "మేము ఒక్కటవుతున్నాము",
      label_days: "రోజులు", label_hours: "గంటలు", label_minutes: "నిమిషాలు", label_seconds: "సెకన్లు",
      
      // Story
      story_label: "మా ప్రయాణం",
      story_title: "ఇది తొలిచూపు ప్రేమ కాదు...",
      story_p1: "మా పరిచయం ఒక సాధారణ కాఫీతో మొదలైంది. సినిమాల గురించి చర్చలు, చిన్న చిన్న జోకులు... మాకు తెలియకుండానే మేము ఒకరికొకరం దగ్గరయ్యాం.",
      story_p2: "గమ్యం లేని ప్రయాణాలు, మౌనంగా సాగిన సంభాషణలు... మా బంధం బలపడింది. ఇప్పుడు, పెద్దల ఆశీర్వాదంతో, మా స్నేహాన్ని పెళ్లి బంధంగా మార్చుకుంటున్నాం.",
      story_quote: "\"మేము కలిసున్నప్పుడు ప్రపంచం అందంగా కనిపిస్తుంది.\"",
      
      // Gallery
      gallery_title: "మధుర క్షణాలు",
      gallery_sub: "మా ప్రయాణంలోని కొన్ని దృశ్యాలు",

      // Venues
      venues_title: "వేదికలు",
      venue_wedding: "వివాహం",
      venue_wedding_time: "మార్చి 8, 2026 | ఉదయం 11:11",
      venue_reception: "రిసెప్షన్",
      venue_reception_time: "మార్చి 8, 2026 | సాయంత్రం 7:00",
      btn_live: "లైవ్ చూడండి",
      btn_map: "మ్యాప్ చూడండి",
      
      // Albums
      albums_title: "వేడుకలు",
      album_haldi: "హల్దీ",
      album_sangeet: "సంగీత్",
      album_wedding: "వివాహం",
      album_reception: "రిసెప్షన్",
      
      // RSVP
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
      rsvp_btn: "నిర్ధారించండి",

      // Footer
      visit_label: "వీక్షణలు:"
    }
  };

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "te" : "en";
      
      // Animate transition
      document.querySelectorAll("[data-i18n]").forEach(el => {
        gsap.to(el, { opacity: 0, duration: 0.2, onComplete: () => {
          const key = el.getAttribute("data-i18n");
          if (content[currentLang][key]) {
            el.innerHTML = content[currentLang][key];
          }
          gsap.to(el, { opacity: 1, duration: 0.2 });
        }});
      });
      
      // Update Button Text
      langBtn.innerText = currentLang === "en" ? "EN / తెలుగు" : "తెలుగు / EN";
    });
  }


  // =========================================================
  // 3. CINEMATIC ANIMATIONS (GSAP)
  // =========================================================
  
  // A. Hero Text Staggered Entry
  const heroTl = gsap.timeline();
  heroTl.to(".animate-fade-in-up", {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.2
  });

  // B. Scroll Reveal for Text
  gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.to(text, {
      scrollTrigger: {
        trigger: text,
        start: "top 85%", 
        toggleActions: "play none none reverse"
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });
  });

  // C. Gold Curtain Reveal (The Fix)
  // This triggers the CSS class .active on the CONTAINER
  gsap.utils.toArray('.curtain-reveal').forEach(revealItem => {
    ScrollTrigger.create({
      trigger: revealItem,
      start: "top 75%",
      onEnter: () => revealItem.classList.add('active') 
    });
  });




  // =========================================================
  // 4. MUSIC PLAYER LOGIC (Auto-Play with Browser Policy Fix)
  // =========================================================
  const musicBtn = document.getElementById("music-control");
  const audio = document.getElementById("bg-music");
  let isPlaying = false;

  if (musicBtn && audio) {
    
    // Function to update UI (Wave Animation)
    const updateMusicUI = (playing) => {
      if (playing) {
        musicBtn.classList.remove("opacity-50");
        musicBtn.classList.add("playing"); 
      } else {
        musicBtn.classList.add("opacity-50");
        musicBtn.classList.remove("playing");
      }
    };

    // 1. Manual Toggle (Clicking the icon)
    musicBtn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        audio.play();
        isPlaying = true;
      }
      updateMusicUI(isPlaying);
    });

    // 2. Intelligent Auto-Play Strategy
    // Attempt to play immediately when page loads
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Auto-play started successfully!
        isPlaying = true;
        updateMusicUI(true);
      }).catch(error => {
        // Auto-play was blocked by browser. 
        // We wait for the FIRST user interaction (scroll or click) to start it.
        console.log("Autoplay prevented. Waiting for interaction.");
        
        const startOnInteraction = () => {
          audio.play();
          isPlaying = true;
          updateMusicUI(true);
          
          // Remove listeners so it doesn't try to play again
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('scroll', startOnInteraction);
          document.removeEventListener('touchstart', startOnInteraction);
        };

        document.addEventListener('click', startOnInteraction);
        document.addEventListener('scroll', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);
      });
    }
  }


  // =========================================================
  // 5. LIVE COUNTDOWN TIMER (IST Fixed)
  // =========================================================
  
  // Set date to March 8, 2026 11:11 AM IST (+05:30)
  const weddingDate = new Date("2026-03-08T11:11:00+05:30").getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Helper for leading zeros
      const fmt = (n) => n < 10 ? "0" + n : n;

      const dEl = document.getElementById("days");
      const hEl = document.getElementById("hours");
      const mEl = document.getElementById("minutes");
      const sEl = document.getElementById("seconds");

      if (dEl) dEl.innerText = fmt(days);
      if (hEl) hEl.innerText = fmt(hours);
      if (mEl) mEl.innerText = fmt(minutes);
      if (sEl) sEl.innerText = fmt(seconds);
    }
  }

  // Update immediately and then every second
  updateTimer();
  setInterval(updateTimer, 1000);


  // =========================================================
  // 6. VISITOR COUNTER (Simulation)
  // =========================================================
  const countEl = document.getElementById('visit-count');
  if (countEl) {
    // Check localStorage for existing hits, else start at a realistic number
    let views = localStorage.getItem('page_views');
    
    if (!views) {
      views = 842; // Starting number
    } else {
      views = parseInt(views) + 1; // Increment on reload
    }
    
    localStorage.setItem('page_views', views);
    countEl.innerText = views.toLocaleString();
  }


  // =========================================================
  // 7. SMART RSVP FORM
  // =========================================================
  const rsvpForm = document.getElementById('rsvp-form');
  const guestDisplay = document.getElementById('guest-count');
  const guestInput = document.getElementById('guests-input');
  let guests = 1;

  // Counter
  if (document.getElementById('plus')) {
    document.getElementById('plus').onclick = () => { if (guests < 10) { guests++; updateG(); } };
    document.getElementById('minus').onclick = () => { if (guests > 1) { guests--; updateG(); } };
    function updateG() { guestDisplay.innerText = guests; guestInput.value = guests; }
  }

  // Submission
  if (rsvpForm) {
    rsvpForm.onsubmit = async (e) => {
      e.preventDefault();
      const status = document.getElementById('rsvp-status');
      const btn = rsvpForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;

      btn.innerText = "Sending Response...";
      btn.disabled = true;

      const formData = new FormData(rsvpForm);
      const payload = {
        full_name: formData.get('full_name'),
        phone: formData.get('phone'),
        side: formData.get('side'),
        guests: parseInt(formData.get('guests')),
        attending_marriage: formData.get('event_marriage') === 'on',
        attending_reception: formData.get('event_reception') === 'on',
        timestamp: new Date().toISOString()
      };

      try {
        if (supabaseClient) {
          // Real DB
          const { error } = await supabaseClient.from('rsvps').insert([payload]);
          if (error) throw error;
          showSuccess(payload.full_name);
        } else {
          // Simulation
          await new Promise(r => setTimeout(r, 1500));
          showSuccess(payload.full_name);
        }
      } catch (err) {
        console.error(err);
        status.innerText = "Connection error. Please try again.";
        status.style.color = "red";
        btn.innerText = originalText;
        btn.disabled = false;
      }

      function showSuccess(name) {
        rsvpForm.reset();
        guests = 1; updateG();
        btn.innerText = "Confirmed ✓";
        btn.style.backgroundColor = "#D4AF37";
        btn.style.borderColor = "#D4AF37";
        status.innerText = `Thank you, ${name}! We can't wait to see you.`;
        status.style.color = "#D4AF37";
        
        setTimeout(() => {
          btn.disabled = false;
          btn.innerText = originalText;
          btn.style.backgroundColor = "";
          btn.style.borderColor = "";
          status.innerText = "";
        }, 5000);
      }
    };
  }

// test
  // =========================================================
  // 8. UTILITIES (Cursor)
  // =========================================================
  const cursor = document.getElementById('cursor-dot');
  if (cursor) {
    window.addEventListener('mousemove', e => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });
    
    document.querySelectorAll('a, button, input, label, .group').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 3, opacity: 0.4 }));
      el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, opacity: 1 }));
    });
  }

});