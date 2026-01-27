document.addEventListener("DOMContentLoaded", () => {
  
  // =========================================================
  // 1. SETUP & CONFIGURATION
  // =========================================================
  gsap.registerPlugin(ScrollTrigger);

  // 🔴 YOUR SUPABASE KEYS 🔴
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
      // Nav
      nav_story: "Our Story", nav_gallery: "Gallery", nav_venues: "Venues", 
      nav_albums: "Photo Albums", nav_rsvp: "RSVP",
      
      // Hero
      hero_tagline: "We Are Getting Married",
      hero_sub: "Written in the Stars", 
      label_days: "Days", label_hours: "Hrs", label_minutes: "Mins", label_seconds: "Secs",
      
      // Story
      story_label: "How It Happened", 
      story_title: "It Wasn't Love at First Sight...",
      story_p1: "It started with a casual coffee that turned into a 4-hour conversation. We didn't realize it then, but amidst the debates about movies and shared laughter over bad jokes, we were finding our home in each other.",
      story_p2: "From long drives with no destination to quiet moments that said everything, our bond grew stronger every day. Now, with the blessings of our families, we are ready to turn our 'best friendship' into a 'forever partnership.'",
      story_quote: "\"Everything makes sense when we're together.\"",
      
      gallery_title: "Captured Moments", gallery_sub: "Glimpses of our journey",
      
      // Venues (CORRECT DATE: March 8, 2026)
      venues_title: "When & Where", 
      venue_wedding: "The Wedding", 
      venue_wedding_time: "March 8, 2026 | 11:11 AM",
      venue_reception: "The Reception", 
      venue_reception_time: "March 11, 2026 | 7:00 PM Onwards",
      btn_live: "Watch Live", btn_map: "View Map",
      
      // Albums
      albums_title: "Photo Albums", 
      album_haldi: "Haldi", album_sangeet: "Sangeet", album_wedding: "Wedding", album_reception: "Reception",
      
      // RSVP
      rsvp_title: "RSVP", 
      rsvp_headline: "Join The Celebration", 
      rsvp_deadline: "Please respond by February 15, 2026",
      visit_label: "Views:"
    },
    te: {
      // Nav
      nav_story: "మా కథ", nav_gallery: "జ్ఞాపకాలు", nav_venues: "వేదికలు", 
      nav_albums: "ఫోటో ఆల్బమ్స్", nav_rsvp: "ఆహ్వానం",
      
      // Hero
      hero_tagline: "మేము ఒక్కటవుతున్నాము",
      hero_sub: "నక్షత్రాలలో లిఖించబడింది",
      label_days: "రోజులు", label_hours: "గంటలు", label_minutes: "నిమిషాలు", label_seconds: "సెకన్లు",
      
      // Story
      story_label: "మా ప్రయాణం", 
      story_title: "ఇది తొలిచూపు ప్రేమ కాదు...",
      story_p1: "మా పరిచయం ఒక సాధారణ కాఫీతో మొదలైంది. సినిమాల గురించి చర్చలు, చిన్న చిన్న జోకులు... మాకు తెలియకుండానే మేము ఒకరికొకరం దగ్గరయ్యాం.",
      story_p2: "గమ్యం లేని ప్రయాణాలు, మౌనంగా సాగిన సంభాషణలు... మా బంధం బలపడింది. ఇప్పుడు, పెద్దల ఆశీర్వాదంతో, మా స్నేహాన్ని పెళ్లి బంధంగా మార్చుకుంటున్నాం.",
      story_quote: "\"మేము కలిసున్నప్పుడు ప్రపంచం అందంగా కనిపిస్తుంది.\"",
      
      gallery_title: "మధుర క్షణాలు", gallery_sub: "మా ప్రయాణంలోని కొన్ని దృశ్యాలు",
      
      // Venues (CORRECT DATE: March 8, 2026)
      venues_title: "వేదికలు", 
      venue_wedding: "వివాహం", 
      venue_wedding_time: "మార్చి 8, 2026 | ఉదయం 11:11",
      venue_reception: "రిసెప్షన్", 
      venue_reception_time: "మార్చి 11, 2026 | సాయంత్రం 7:00",
      btn_live: "లైవ్ చూడండి", btn_map: "మ్యాప్ చూడండి",
      
      // Albums
      albums_title: "ఫోటో ఆల్బమ్స్", 
      album_haldi: "హల్దీ", album_sangeet: "సంగీత్", album_wedding: "వివాహం", album_reception: "రిసెప్షన్",
      
      // RSVP
      rsvp_title: "ఆహ్వానం", 
      rsvp_headline: "వేడుకలో మాతో చేరండి", 
      rsvp_deadline: "దయచేసి ఫిబ్రవరి 15, 2026 లోపు తెలియజేయండి",
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
  // 4. MUSIC PLAYER (UNLOCK + ICON)
  // =========================================================
  const musicBtn = document.getElementById("music-control");
  const audio = document.getElementById("bg-music");
  let isPlaying = false;

  if (musicBtn && audio) {
    
    // UI Update Function
    const updateMusicUI = (playing) => {
      if (playing) {
        musicBtn.classList.remove("opacity-50");
        musicBtn.classList.add("playing"); 
        // Start spinning icon
        const icon = musicBtn.querySelector('i');
        if(icon) icon.classList.add('fa-spin');
        // SVG Fallback spin
        const svg = musicBtn.querySelector('svg');
        if(svg) svg.classList.add('animate-spin');
      } else {
        musicBtn.classList.add("opacity-50");
        musicBtn.classList.remove("playing");
        // Stop spinning icon
        const icon = musicBtn.querySelector('i');
        if(icon) icon.classList.remove('fa-spin');
        // Stop SVG spin
        const svg = musicBtn.querySelector('svg');
        if(svg) svg.classList.remove('animate-spin');
      }
    };

    // Toggle Button Click
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation(); 
      if (isPlaying) { audio.pause(); isPlaying = false; } 
      else { audio.play(); isPlaying = true; }
      updateMusicUI(isPlaying);
    });

    // 🔴 AUTO-PLAY "UNLOCK" STRATEGY
    const attemptPlay = () => {
        if (sessionStorage.getItem('music_finished')) return;

        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                updateMusicUI(true);
            }).catch(() => {
                console.log("Autoplay blocked. Waiting for first interaction...");
                const unlockAudio = () => {
                    if (!isPlaying && !sessionStorage.getItem('music_finished')) {
                        audio.play().then(() => {
                            isPlaying = true;
                            updateMusicUI(true);
                        });
                    }
                    document.removeEventListener('click', unlockAudio);
                    document.removeEventListener('touchstart', unlockAudio);
                };
                document.addEventListener('click', unlockAudio);
                document.addEventListener('touchstart', unlockAudio);
            });
        }
    };

    attemptPlay();
  }


  // =========================================================
  // 5. LIVE COUNTDOWN TIMER (FIXED)
  // =========================================================
  // Date set to: March 8, 2026 11:11:00 AM IST
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
  // 7. JOYFUL RSVP FORM
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
        alert("Please set up Supabase keys in assets/js/script.js");
        return;
      }

      // UI Loading State
      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = "Processing...";
      submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
      statusMsg.classList.add('hidden');

      const countryCode = document.getElementById('country-code').value;
      const phoneNumber = document.getElementById('phone-number').value;

      let finalGuestCount = guestDropdown.value;
      if (finalGuestCount === 'more') {
        finalGuestCount = manualInput.value;
        if (!finalGuestCount || finalGuestCount < 5) {
          alert("Please enter a valid number of guests (5 or more).");
          resetButton();
          return;
        }
      }

      const sideSelection = document.querySelector('input[name="side"]:checked');
      if (!sideSelection) {
        alert("Please select if you are from the Bride's family or Groom's family.");
        resetButton();
        return;
      }

      const formData = {
        name: document.getElementById('name').value,
        contact: `${countryCode} ${phoneNumber}`,
        side: sideSelection.value,
        guests: parseInt(finalGuestCount),
        attending: "Yes" 
      };

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

        setTimeout(() => { resetButton(); }, 3000);

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

// Smart Audio Manager
document.addEventListener('visibilitychange', function() {
    const audio = document.getElementById('bg-music');
    if (!audio) return;
    
    if (document.hidden) {
        audio.pause();
    } else {
        if (audio.ended || sessionStorage.getItem('music_finished')) {
            return; 
        }
        var playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => console.log("Auto-resume prevented"));
        }
    }
});

// Song Finished Handler
const audioEl = document.getElementById('bg-music');
if(audioEl) {
    audioEl.addEventListener('ended', function() {
        sessionStorage.setItem('music_finished', 'true');
        
        const btn = document.getElementById('music-control');
        if(btn) {
             btn.classList.add("opacity-50");
             btn.classList.remove("playing");
             // Stop animation for both I tag and SVG
             const icon = btn.querySelector('i');
             if(icon) icon.classList.remove('fa-spin');
             const svg = btn.querySelector('svg');
             if(svg) svg.classList.remove('animate-spin');
        }
    });
}