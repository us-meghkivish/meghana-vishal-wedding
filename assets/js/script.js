document.addEventListener("DOMContentLoaded", () => {
  
  // =========================================================
  // 1. SETUP & CONFIGURATION
  // =========================================================
  gsap.registerPlugin(ScrollTrigger);

  // 🔴🔴🔴 PASTE YOUR SUPABASE KEYS HERE 🔴🔴🔴
  const SB_URL = 'https://sunuodrpzvkdgdocmcqw.supabase.co';
  const SB_KEY = 'sb_publishable_tX0LkWnAeO1yf-pzm3r6Eg_53nDIWsq';
  
  let supabaseClient = null;
  
  // Initialize Supabase
  try {
    if (typeof supabase !== 'undefined' && SB_URL.startsWith('https://')) {
      supabaseClient = supabase.createClient(SB_URL, SB_KEY);
    } else {
      console.warn("Supabase SDK not loaded or keys missing.");
    }
  } catch (err) {
    console.log("Supabase initialization failed:", err);
  }


  // =========================================================
  // 2. LANGUAGE & TRANSLATIONS (I18N)
  // =========================================================
  const langBtn = document.getElementById("lang-toggle");
  let currentLang = "en";

  const content = {
    en: {
      nav_story: "Our Story", nav_gallery: "Gallery", nav_venues: "Venues", nav_albums: "Albums", nav_rsvp: "RSVP",
      hero_tagline: "We Are Getting Married",
      label_days: "Days", label_hours: "Hrs", label_minutes: "Mins", label_seconds: "Secs",
      story_label: "How It Happened", story_title: "It Wasn't Love at First Sight...",
      story_p1: "It started with a casual coffee that turned into a 4-hour conversation...",
      story_p2: "From long drives with no destination to quiet moments...",
      story_quote: "\"Everything makes sense when we're together.\"",
      gallery_title: "Captured Moments", gallery_sub: "Glimpses of our journey",
      venues_title: "When & Where", venue_wedding: "The Wedding", venue_wedding_time: "August 14, 2025 | 9:30 AM",
      venue_reception: "The Reception", venue_reception_time: "August 14, 2025 | 7:00 PM",
      btn_live: "Watch Live", btn_map: "View Map",
      albums_title: "Celebrations", album_haldi: "Haldi", album_sangeet: "Sangeet", album_wedding: "Wedding", album_reception: "Reception",
      rsvp_title: "RSVP", rsvp_deadline: "Please respond by August 1, 2025",
      visit_label: "Views:"
    },
    te: {
      nav_story: "మా కథ", nav_gallery: "జ్ఞాపకాలు", nav_venues: "వేదికలు", nav_albums: "వేడుకలు", nav_rsvp: "ఆహ్వానం",
      hero_tagline: "మేము ఒక్కటవుతున్నాము",
      label_days: "రోజులు", label_hours: "గంటలు", label_minutes: "నిమిషాలు", label_seconds: "సెకన్లు",
      story_label: "మా ప్రయాణం", story_title: "ఇది తొలిచూపు ప్రేమ కాదు...",
      story_p1: "మా పరిచయం ఒక సాధారణ కాఫీతో మొదలైంది...",
      story_p2: "గమ్యం లేని ప్రయాణాలు, మౌనంగా సాగిన సంభాషణలు...",
      story_quote: "\"మేము కలిసున్నప్పుడు ప్రపంచం అందంగా కనిపిస్తుంది.\"",
      gallery_title: "మధుర క్షణాలు", gallery_sub: "మా ప్రయాణంలోని కొన్ని దృశ్యాలు",
      venues_title: "వేదికలు", venue_wedding: "వివాహం", venue_wedding_time: "ఆగస్టు 14, 2025 | ఉదయం 9:30",
      venue_reception: "రిసెప్షన్", venue_reception_time: "ఆగస్టు 14, 2025 | సాయంత్రం 7:00",
      btn_live: "లైవ్ చూడండి", btn_map: "మ్యాప్ చూడండి",
      albums_title: "వేడుకలు", album_haldi: "హల్దీ", album_sangeet: "సంగీత్", album_wedding: "వివాహం", album_reception: "రిసెప్షన్",
      rsvp_title: "ఆహ్వానం", rsvp_deadline: "దయచేసి ఆగస్టు 1, 2025 లోపు తెలియజేయండి",
      visit_label: "వీక్షణలు:"
    }
  };

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "te" : "en";
      document.querySelectorAll("[data-i18n]").forEach(el => {
        gsap.to(el, { opacity: 0, duration: 0.2, onComplete: () => {
          const key = el.getAttribute("data-i18n");
          if (content[currentLang][key]) {
            el.innerHTML = content[currentLang][key];
          }
          gsap.to(el, { opacity: 1, duration: 0.2 });
        }});
      });
      langBtn.innerText = currentLang === "en" ? "EN / తెలుగు" : "తెలుగు / EN";
    });
  }


  // =========================================================
  // 3. CINEMATIC ANIMATIONS (GSAP)
  // =========================================================
  const heroTl = gsap.timeline();
  heroTl.to(".animate-fade-in-up", { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.2 });

  gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.to(text, { scrollTrigger: { trigger: text, start: "top 85%", toggleActions: "play none none reverse" }, y: 0, opacity: 1, duration: 1, ease: "power2.out" });
  });

  gsap.utils.toArray('.curtain-reveal').forEach(revealItem => {
    ScrollTrigger.create({ trigger: revealItem, start: "top 75%", onEnter: () => revealItem.classList.add('active') });
  });


  // =========================================================
  // 4. SMART MUSIC PLAYER (Fixed Glitch)
  // =========================================================
  const musicBtn = document.getElementById("music-control");
  const audio = document.getElementById("bg-music");
  let isPlaying = false;

  if (musicBtn && audio) {
    
    // Check if song finished in a previous session
    const hasFinishedBefore = sessionStorage.getItem('music_finished');
    if (hasFinishedBefore) {
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
        // Don't auto-play
    } else {
        // Try auto-play if not finished
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => { isPlaying = true; updateMusicUI(true); })
            .catch(() => {
                // Browser blocked auto-play, wait for interaction
                const startOnInteraction = () => {
                    if(!sessionStorage.getItem('music_finished')) {
                        audio.play(); isPlaying = true; updateMusicUI(true);
                    }
                    document.removeEventListener('click', startOnInteraction);
                    document.removeEventListener('scroll', startOnInteraction);
                };
                document.addEventListener('click', startOnInteraction);
                document.addEventListener('scroll', startOnInteraction);
            });
        }
    }

    const updateMusicUI = (playing) => {
      if (playing) {
        musicBtn.classList.remove("opacity-50");
        musicBtn.classList.add("playing"); 
      } else {
        musicBtn.classList.add("opacity-50");
        musicBtn.classList.remove("playing");
      }
    };

    musicBtn.addEventListener("click", () => {
      if (isPlaying) { audio.pause(); isPlaying = false; } 
      else { audio.play(); isPlaying = true; }
      updateMusicUI(isPlaying);
    });
  }


  // =========================================================
  // 5. LIVE COUNTDOWN TIMER
  // =========================================================
  const weddingDate = new Date("2026-03-08T11:11:00+05:30").getTime();
  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const fmt = (n) => n < 10 ? "0" + n : n;
      const dEl = document.getElementById("days"); if (dEl) dEl.innerText = fmt(days);
      const hEl = document.getElementById("hours"); if (hEl) hEl.innerText = fmt(hours);
      const mEl = document.getElementById("minutes"); if (mEl) mEl.innerText = fmt(minutes);
      const sEl = document.getElementById("seconds"); if (sEl) sEl.innerText = fmt(seconds);
    }
  }
  updateTimer(); setInterval(updateTimer, 1000);


  // =========================================================
  // 6. VISITOR COUNTER
  // =========================================================
  const countEl = document.getElementById('visit-count');
  if (countEl) {
    let views = localStorage.getItem('page_views') || 842;
    views = parseInt(views) + 1;
    localStorage.setItem('page_views', views);
    countEl.innerText = views.toLocaleString();
  }


  // =========================================================
  // 7. JOYFUL RSVP FORM (Starts from 5)
  // =========================================================
  const rsvpForm = document.getElementById('rsvp-form');
  const guestDropdown = document.getElementById('guests-dropdown');
  const manualWrapper = document.getElementById('manual-guest-wrapper');
  const manualInput = document.getElementById('guests-manual');
  const submitBtn = document.getElementById('submit-btn');
  const statusMsg = document.getElementById('form-status');

  // A. Handle "More than 5" Dropdown Logic
  if (guestDropdown) {
    guestDropdown.addEventListener('change', function() {
      if (this.value === 'more') {
        manualWrapper.classList.remove('grid-rows-[0fr]');
        manualWrapper.classList.add('grid-rows-[1fr]');
        manualInput.required = true;
        manualInput.focus();
      } else {
        manualWrapper.classList.remove('grid-rows-[1fr]');
        manualWrapper.classList.add('grid-rows-[0fr]');
        manualInput.required = false;
        manualInput.value = ''; 
      }
    });
  }

  // B. Handle Form Submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      if (!supabaseClient) {
        alert("Please set up Supabase and add your API Keys in assets/js/script.js");
        return;
      }

      // UI Loading State
      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = "Processing...";
      submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
      statusMsg.classList.add('hidden');

      // 1. Get Phone & Country Code
      const countryCode = document.getElementById('country-code').value;
      const phoneNumber = document.getElementById('phone-number').value;

      // 2. Determine Guest Count (Dropdown or Manual?)
      let finalGuestCount = guestDropdown.value;
      if (finalGuestCount === 'more') {
        finalGuestCount = manualInput.value;
        if (!finalGuestCount || finalGuestCount < 5) {
          alert("Please enter a valid number of guests (5 or more).");
          resetButton();
          return;
        }
      }

      // 3. Get Side (Bride or Groom)
      const sideSelection = document.querySelector('input[name="side"]:checked');
      if (!sideSelection) {
        alert("Please select if you are from the Bride's family or Groom's family.");
        resetButton();
        return;
      }

      // 4. Build Data Object
      const formData = {
        name: document.getElementById('name').value,
        contact: `${countryCode} ${phoneNumber}`,
        side: sideSelection.value,
        guests: parseInt(finalGuestCount),
        attending: "Yes" 
      };

      // 5. Send to Supabase
      try {
        const { data, error } = await supabaseClient
          .from('rsvps')
          .insert([formData]);

        if (error) throw error;

        // Success State
        statusMsg.textContent = "✨ Thank you! We have received your RSVP.";
        statusMsg.className = "text-center text-sm font-medium mt-4 text-green-600 block";
        submitBtn.textContent = "Confirmed ✓";
        submitBtn.classList.remove('bg-gradient-to-r'); 
        submitBtn.classList.add('bg-green-600'); 
        
        rsvpForm.reset();
        
        // Reset animations
        manualWrapper.classList.remove('grid-rows-[1fr]');
        manualWrapper.classList.add('grid-rows-[0fr]');

        // Reset button after 3 seconds
        setTimeout(() => {
            resetButton();
        }, 3000);

      } catch (error) {
        console.error('Error:', error);
        statusMsg.textContent = "❌ Connection failed. Please try again.";
        statusMsg.className = "text-center text-sm font-medium mt-4 text-red-600 block";
        resetButton();
      }

      function resetButton() {
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-green-600');
        submitBtn.classList.add('bg-gradient-to-r'); 
      }
    });
  }


  // =========================================================
  // 8. UTILITIES (Cursor)
  // =========================================================
  const cursor = document.getElementById('cursor-dot');
  if (cursor) {
    window.addEventListener('mousemove', e => gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 }));
    document.querySelectorAll('a, button, input, label, .group').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 3, opacity: 0.4 }));
      el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, opacity: 1 }));
    });
  }

});

// =========================================================
// 9. EXTERNAL EVENTS (Visibility & Audio)
// =========================================================

// Smart Audio Manager (The Fix for the Glitch)
document.addEventListener('visibilitychange', function() {
    const audio = document.getElementById('bg-music');
    if (!audio) return;
    
    if (document.hidden) {
        // Tab hidden -> Pause
        audio.pause();
    } else {
        // Tab visible -> Play ONLY if it hasn't finished
        if (audio.ended || sessionStorage.getItem('music_finished')) {
            return; // STOP! Do not play again.
        }
        
        var playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => console.log("Auto-resume prevented"));
        }
    }
});

// Event Listener: When the song finishes, save it to Memory
const audioEl = document.getElementById('bg-music');
const musicBtnEl = document.getElementById('music-control');
if(audioEl) {
    audioEl.addEventListener('ended', function() {
        // 1. Save to session memory
        sessionStorage.setItem('music_finished', 'true');

        // 2. Update UI Icon
        if(musicBtnEl) {
            const icon = musicBtnEl.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-music');
            }
        }
    });
}