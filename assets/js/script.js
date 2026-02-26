document.addEventListener("DOMContentLoaded", () => {
  
  // =========================================================
  // 1. SETUP & CONFIGURATION
  // =========================================================
  gsap.registerPlugin(ScrollTrigger);

  // SUPABASE KEYS
  const SB_URL = 'https://sunuodrpzvkdgdocmcqw.supabase.co';
  const SB_KEY = 'sb_publishable_tX0LkWnAeO1yf-pzm3r6Eg_53nDIWsq';
  
  let supabaseClient = null;
  
  try {
    if (typeof supabase !== 'undefined' && SB_URL.startsWith('https://')) {
      supabaseClient = supabase.createClient(SB_URL, SB_KEY);
    } else {
      console.warn("Supabase SDK not loaded.");
    }
  } catch (err) {
    console.log("Supabase init failed:", err);
  }

  // =========================================================
  // 2. LANGUAGE & TRANSLATIONS (I18N)
  // =========================================================
  const langBtn = document.getElementById("lang-toggle");
  let currentLang = "en";

  const content = {
    en: {
      nav_story: "Our Story", nav_gallery: "Gallery", nav_venues: "Venues", nav_albums: "Albums", nav_rsvp: "RSVP",
      hero_tagline: "We Are Getting Married", hero_sub: "Written in the Stars",
      label_days: "Days", label_hours: "Hrs", label_minutes: "Mins", label_seconds: "Secs",
      story_p1: "Some love stories start with a spark; ours began with a quiet understanding...",
      story_p2: "Through laughter, adventures, and life's little moments...",
      story_quote: "\"Everything makes sense when we're together.\"",
      gallery_title: "Captured Moments", gallery_sub: "Glimpses of our journey",
      venues_title: "When & Where", venue_wedding: "The Wedding", venue_wedding_time: "March 8, 2026 | 11:11 AM",
      venue_reception: "The Reception", venue_reception_time: "March 11, 2026 | 7:00 PM Onwards",
      btn_live: "Watch Live", btn_map: "View Map",
      albums_title: "Photo Albums", album_haldi: "Haldi", album_mehendi: "Mehendi", album_wedding: "Wedding", album_reception: "Reception",
      rsvp_headline: "Join The Celebration", 
      visit_label: "Views:"
    },
    te: {
      nav_story: "మా కథ", nav_gallery: "జ్ఞాపకాలు", nav_venues: "వేదికలు", nav_albums: "ఆల్బమ్స్", nav_rsvp: "ఆహ్వానం",
      hero_tagline: "మేము ఒక్కటవుతున్నాము", hero_sub: "నక్షత్రాలలో లిఖించబడింది",
      label_days: "రోజులు", label_hours: "గంటలు", label_minutes: "నిమిషాలు", label_seconds: "సెకన్లు",
      story_p1: "మా పరిచయం ఒక సాధారణ కాఫీతో మొదలైంది...",
      story_p2: "గమ్యం లేని ప్రయాణాలు, మౌనంగా సాగిన సంభాషణలు...",
      story_quote: "\"మేము కలిసున్నప్పుడు ప్రపంచం అందంగా కనిపిస్తుంది.\"",
      gallery_title: "మధుర క్షణాలు", gallery_sub: "మా ప్రయాణంలోని కొన్ని దృశ్యాలు",
      venues_title: "వేదికలు", venue_wedding: "వివాహం", venue_wedding_time: "మార్చి 8, 2026 | ఉదయం 11:11",
      venue_reception: "రిసెప్షన్", venue_reception_time: "మార్చి 11, 2026 | సాయంత్రం 7:00",
      btn_live: "లైవ్ చూడండి", btn_map: "మ్యాప్ చూడండి",
      albums_title: "ఫోటో ఆల్బమ్స్", album_haldi: "హల్దీ", album_mehendi: "మెహందీ", album_wedding: "వివాహం", album_reception: "రిసెప్షన్",
      rsvp_headline: "వేడుకలో మాతో చేరండి",
      visit_label: "వీక్షణలు:"
    }
  };

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "te" : "en";
      document.querySelectorAll("[data-i18n]").forEach(el => {
        gsap.to(el, { opacity: 0, duration: 0.2, onComplete: () => {
          const key = el.getAttribute("data-i18n");
          if (content[currentLang][key]) el.innerHTML = content[currentLang][key];
          gsap.to(el, { opacity: 1, duration: 0.2 });
        }});
      });
      // Shows Native Script
      langBtn.innerText = currentLang === "en" ? "EN / తెలుగు" : "తెలుగు / EN";
    });
  }

  // =========================================================
  // 3. CINEMATIC ANIMATIONS
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
  // 4. SMART MUSIC PLAYER (Start, Pause on Exit, Resume)
  // =========================================================
  const musicBtn = document.getElementById("music-control");
  const audio = document.getElementById("bg-music");
  let isPlaying = false;

  if (musicBtn && audio) {
    
    const updateMusicUI = (playing) => {
      if (playing) {
        musicBtn.classList.remove("opacity-50");
        musicBtn.classList.add("playing"); 
      } else {
        musicBtn.classList.add("opacity-50");
        musicBtn.classList.remove("playing");
      }
    };

    // Toggle Button
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation(); 
      if (isPlaying) { audio.pause(); isPlaying = false; } 
      else { audio.play(); isPlaying = true; }
      updateMusicUI(isPlaying);
    });

    // Auto-Play Unlock Strategy
    const attemptPlay = () => {
        if (sessionStorage.getItem('music_finished')) return;

        audio.play().then(() => {
            isPlaying = true;
            updateMusicUI(true);
        }).catch(() => {
            console.log("Autoplay waiting for interaction...");
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
    };

    attemptPlay();
  }

  // =========================================================
  // 5. COUNTDOWN TIMER & CELEBRATION MANAGER
  // =========================================================
  const weddingDate = new Date("2026-03-08T11:11:00+05:30").getTime();
  
  // State tracker to prevent infinite explosions
  let celebrationTriggered = false;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // A. DOM Elements
    const timerContainer = document.querySelector('.flex.gap-4.md\\:gap-8.mt-12'); // The div holding days/hrs/mins
    const tagline = document.querySelector('[data-i18n="hero_tagline"]');
    
    // B. If Countdown is ACTIVE
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
    
    } else {
      // C. If Countdown is FINISHED (The Wedding has started/passed)
      
      // 1. Trigger the Celebration ONCE
      if (!celebrationTriggered) {
        celebrationTriggered = true;
        launchConfetti(); // Fire the cannons
        
        // 2. Animate the Transition
        if(timerContainer) {
            // Fade out the numbers
            gsap.to(timerContainer, { 
                opacity: 0, 
                duration: 1, 
                onComplete: () => {
                    // Replace numbers with "Just Married"
                    timerContainer.innerHTML = `
                        <div class="flex flex-col items-center animate-fade-in-up">
                            <span class="text-4xl md:text-6xl font-serif text-[#D4AF37] drop-shadow-lg">Just Married</span>
                            <span class="text-sm uppercase tracking-[0.3em] text-white/80 mt-4">Est. March 8, 2026</span>
                        </div>
                    `;
                    // Fade it back in
                    gsap.to(timerContainer, { opacity: 1, duration: 1.5 });
                }
            });
        }

        // 3. Update the Top Tagline
        if (tagline) {
            gsap.to(tagline, { opacity: 0, duration: 0.5, onComplete: () => {
                tagline.innerText = "The Adventure Begins";
                tagline.classList.add("text-[#D4AF37]");
                gsap.to(tagline, { opacity: 1, duration: 0.5 });
            }});
        }
      }
    }
  }

  // --- CONFETTI CANNONS (Gold & White) ---
  function launchConfetti() {
    const duration = 3000; // Lasts 3 seconds
    const end = Date.now() + duration;

    (function frame() {
      // Launch from Left
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#D4AF37', '#ffffff', '#FDF8F5'] // Gold, White, Cream
      });
      // Launch from Right
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#D4AF37', '#ffffff', '#FDF8F5']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  updateTimer(); 
  setInterval(updateTimer, 1000);

  // =========================================================
  // 7. ROBUST RSVP FORM
  // =========================================================
  const rsvpForm = document.getElementById('rsvp-form');
  const guestDropdown = document.getElementById('guests-dropdown');
  const manualWrapper = document.getElementById('manual-guest-wrapper');
  const manualInput = document.getElementById('guests-manual');

  // A. Toggle manual input
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

  // B. Handle Submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const submitBtn = document.getElementById('submit-btn');
      const statusMsg = document.getElementById('form-status');
      
      // UI Loading
      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";

      // 1. Get Guest Count
      let finalGuestCount = guestDropdown.value;
      if (finalGuestCount === 'more') {
        finalGuestCount = manualInput.value;
      }

      // 2. Get Contact
      const countryCode = document.getElementById('country-code').value;
      const phoneNumber = document.getElementById('phone-number').value;

      // 3. Build Data
      const formData = {
        name: document.getElementById('name').value,
        contact: `${countryCode} ${phoneNumber}`,
        side: document.querySelector('input[name="side"]:checked').value,
        guests: parseInt(finalGuestCount),
        attending: "Yes"
      };

      try {
        const { error } = await supabaseClient.from('rsvps').insert([formData]);
        if (error) throw error;

        // Success
        statusMsg.textContent = "✨ RSVP Confirmed! Thank you.";
        statusMsg.className = "text-center text-sm font-medium mt-4 text-green-600 block";
        statusMsg.classList.remove('hidden');
        
        rsvpForm.reset();
        // Reset the manual box safely
        manualWrapper.classList.remove('grid-rows-[1fr]');
        manualWrapper.classList.add('grid-rows-[0fr]');

        setTimeout(() => { 
            submitBtn.disabled = false;
            submitBtn.innerText = "Confirm Presence";
        }, 3000);

      } catch (err) {
        console.error(err);
        statusMsg.textContent = "❌ Connection failed. Please try again.";
        statusMsg.className = "text-center text-sm font-medium mt-4 text-red-600 block";
        statusMsg.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
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

  // =========================================================
  // 9. EXTERNAL EVENTS (Visibility & Audio Sync)
  // =========================================================

  document.addEventListener('visibilitychange', function() {
    const audio = document.getElementById('bg-music');
    if (!audio) return;
    
    if (document.hidden) {
        audio.pause(); // Pause when tab is hidden
    } else {
        // Resume ONLY if it hasn't finished yet
        if (!sessionStorage.getItem('music_finished')) {
            audio.play().catch(() => console.log("Resume blocked"));
        }
    }
  });

  const audioEl = document.getElementById('bg-music');
  if(audioEl) {
    audioEl.addEventListener('ended', function() {
        sessionStorage.setItem('music_finished', 'true'); // Mark as done forever
        
        const btn = document.getElementById('music-control');
        if(btn) {
              btn.classList.add("opacity-50");
              btn.classList.remove("playing");
        }
    });
  }

  // =========================================================
  // 10. 3D HOLOGRAPHIC TILT EFFECT (Desktop Only)
  // =========================================================
  const tiltCards = document.querySelectorAll(".tilt-box");

  // Only run this logic on larger screens (Desktop/Laptop)
  if (window.innerWidth > 1024) {
      tiltCards.forEach(card => {
          card.addEventListener("mousemove", (e) => {
              const el = card.querySelector(".tilt-element");
              const rect = card.getBoundingClientRect();
              
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              
              // Limit rotation to 20 degrees
              const rotateX = ((y - centerY) / centerY) * -20; 
              const rotateY = ((x - centerX) / centerX) * 20;

              el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
          });

          card.addEventListener("mouseleave", () => {
              const el = card.querySelector(".tilt-element");
              el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
          });
      });
  }

  // =========================================================
  // 11. PARALLAX HERO TEXT
  // =========================================================
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroText = document.querySelector('#hero h1');
    if(heroText) {
        heroText.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroText.style.opacity = 1 - (scrolled / 700);
    }
  });

  // =========================================================
  // 12. VENUE CARDS FLY-IN ANIMATION
  // =========================================================
  gsap.from("#venues .tilt-box:first-child", {
    scrollTrigger: { trigger: "#venues", start: "top 80%" },
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
  });

  gsap.from("#venues .tilt-box:last-child", {
    scrollTrigger: { trigger: "#venues", start: "top 80%" },
    x: 100,
    opacity: 0,
    duration: 1.5,
    delay: 0.2, // Slight delay for the second card
    ease: "power3.out"
  });

});