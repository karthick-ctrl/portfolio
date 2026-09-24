/**
 * KARTHICK S — PORTFOLIO INTERACTIVE LOGIC
 * High-performance, robust Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons if available
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Theme Toggle System
  initThemeToggle();

  // 2. Dynamic Typing Role Effect
  initDynamicTyping();

  // 3. Navigation Bar & Mobile Drawer
  initNavigation();

  // 4. Projects Category Filter
  initProjectFilters();

  // 5. Live Chennai Time Clock
  initChennaiClock();

  // 6. Interactive AI Playground
  initVoiceAgentSimulator();
  initAviationSimulator();

  // 7. Copyright Year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   1. THEME TOGGLE SYSTEM (Warm Editorial / Midnight Dark)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const root = document.documentElement;

  // Retrieve saved preference or check system preference
  const savedTheme = localStorage.getItem('ks_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(activeTheme);
      localStorage.setItem('ks_portfolio_theme', activeTheme);
      showToast(`Switched to ${activeTheme === 'dark' ? 'Midnight Dark' : 'Warm Editorial'} mode`);
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  }
}

/* ==========================================================================
   2. DYNAMIC ROLE TYPING EFFECT
   ========================================================================== */
function initDynamicTyping() {
  const roleTextElem = document.getElementById('roleText');
  if (!roleTextElem) return;

  const roles = [
    'AI & Machine Learning Engineer',
    'Computer Vision Specialist',
    'LLM & Voice Agent Developer',
    'Deep Learning Systems Builder',
    'REST API & Backend Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleTextElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      roleTextElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVIGATION BAR, SCROLL SPY & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const closeMobileDrawer = document.getElementById('closeMobileDrawer');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar Scroll Shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Drawer Toggle
  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeMobileDrawer) {
      closeMobileDrawer.addEventListener('click', closeDrawer);
    }

    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeDrawer();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Active Section Observer (Scroll Spy)
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
  }
}

/* ==========================================================================
   4. PROJECTS FILTER SYSTEM
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-large');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'grid';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. LIVE CHENNAI CLOCK
   ========================================================================== */
function initChennaiClock() {
  const timeElem = document.getElementById('chennaiTime');
  if (!timeElem) return;

  function update() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      timeElem.textContent = `${timeString} IST`;
    } catch (e) {
      timeElem.textContent = 'Chennai (IST)';
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   6. INTERACTIVE AI PLAYGROUND
   ========================================================================== */
// Switch Tabs
window.switchPlaygroundTab = function(tabName) {
  const voicePane = document.getElementById('voicePlaygroundPane');
  const documindPane = document.getElementById('documindPlaygroundPane');
  const aviationPane = document.getElementById('aviationPlaygroundPane');
  const tabVoiceBtn = document.getElementById('tabVoiceBtn');
  const tabDocuMindBtn = document.getElementById('tabDocuMindBtn');
  const tabAviationBtn = document.getElementById('tabAviationBtn');

  // Reset all
  if (voicePane) voicePane.style.display = 'none';
  if (documindPane) documindPane.style.display = 'none';
  if (aviationPane) aviationPane.style.display = 'none';
  if (tabVoiceBtn) tabVoiceBtn.classList.remove('active');
  if (tabDocuMindBtn) tabDocuMindBtn.classList.remove('active');
  if (tabAviationBtn) tabAviationBtn.classList.remove('active');

  if (tabName === 'voice') {
    if (voicePane) voicePane.style.display = 'block';
    if (tabVoiceBtn) tabVoiceBtn.classList.add('active');
  } else if (tabName === 'documind') {
    if (documindPane) documindPane.style.display = 'block';
    if (tabDocuMindBtn) tabDocuMindBtn.classList.add('active');
  } else {
    if (aviationPane) aviationPane.style.display = 'block';
    if (tabAviationBtn) tabAviationBtn.classList.add('active');
  }
};

// Voice AI Simulator
let isListening = false;
let speechRecognizer = null;

function initVoiceAgentSimulator() {
  // Speech Recognition setup if supported
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognizer = new SpeechRecognition();
    speechRecognizer.continuous = false;
    speechRecognizer.interimResults = false;
    speechRecognizer.lang = 'en-US';

    speechRecognizer.onstart = () => {
      isListening = true;
      setWaveActive(true);
      const micBtn = document.getElementById('micBtn');
      if (micBtn) micBtn.style.background = 'var(--accent-primary)';
      showToast('🎤 Listening to your voice...');
    };

    speechRecognizer.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const input = document.getElementById('voiceTextInput');
      if (input) input.value = transcript;
      processVoiceUserMessage(transcript);
    };

    speechRecognizer.onerror = (e) => {
      console.warn('Speech recognition error:', e);
      setWaveActive(false);
      isListening = false;
      const micBtn = document.getElementById('micBtn');
      if (micBtn) micBtn.style.background = '';
    };

    speechRecognizer.onend = () => {
      isListening = false;
      setWaveActive(false);
      const micBtn = document.getElementById('micBtn');
      if (micBtn) micBtn.style.background = '';
    };
  }
}

window.toggleVoiceSpeechRecognition = function() {
  if (!speechRecognizer) {
    showToast('Speech recognition not available on this browser. Please type your message below!');
    document.getElementById('voiceTextInput')?.focus();
    return;
  }

  if (isListening) {
    speechRecognizer.stop();
  } else {
    try {
      speechRecognizer.start();
    } catch (e) {
      console.error(e);
    }
  }
};

window.handleVoiceAgentSubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('voiceTextInput');
  if (!input) return;
  const message = input.value.trim();
  if (!message) return;
  input.value = '';
  processVoiceUserMessage(message);
};

window.sendQuickPrompt = function(promptText) {
  processVoiceUserMessage(promptText);
};

function processVoiceUserMessage(userText) {
  const chatHistory = document.getElementById('voiceChatHistory');
  if (!chatHistory) return;

  // Append user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = userText;
  chatHistory.appendChild(userMsg);
  chatHistory.scrollTop = chatHistory.scrollHeight;

  // Trigger Waveform & Thinking
  setWaveActive(true);

  setTimeout(() => {
    // Generate intelligent AI response
    const { reply, orderSummary } = generateAgentResponse(userText);
    
    const agentMsg = document.createElement('div');
    agentMsg.className = 'chat-msg agent';
    agentMsg.innerHTML = `🤖 <strong>Karthick's Pizza AI:</strong> ${reply}`;
    chatHistory.appendChild(agentMsg);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Update order box
    if (orderSummary) {
      const orderList = document.getElementById('orderItemsList');
      if (orderList) orderList.innerHTML = orderSummary;
    }

    // Speak response via browser SpeechSynthesis
    speakText(reply);
    setWaveActive(false);
  }, 450);
}

function generateAgentResponse(text) {
  const lower = text.toLowerCase();
  
  if (lower.includes('pepperoni') || lower.includes('pizza') || lower.includes('margherita') || lower.includes('bread')) {
    return {
      reply: "Excellent choice! I have added that to your order basket with fresh mozzarella and homemade tomato basil sauce. Would you like a beverage or garlic bread to go with that?",
      orderSummary: "• 2x Large Pepperoni Pizzas ($32.00)<br>• 1x Stuffed Garlic Bread ($6.50)<br>• <strong>Total: $38.50</strong> • Awaiting Checkout"
    };
  } else if (lower.includes('topping') || lower.includes('menu') || lower.includes('special')) {
    return {
      reply: "We feature handcrafted sourdough crusts, smoked artisanal pepperoni, black truffles, jalapeños, bell peppers, sun-dried tomatoes, and vegan cheese options. What sounds good?",
      orderSummary: "• Status: Exploring Topping Customizations"
    };
  } else if (lower.includes('deliver') || lower.includes('chennai') || lower.includes('address') || lower.includes('street')) {
    return {
      reply: "Order confirmed for delivery to your location in Chennai! Our estimated dispatch time is 22 minutes. Thank you for testing Karthick's Voice AI agent!",
      orderSummary: "• <strong>Delivery Confirmed:</strong> Chennai, India<br>• Estimated Arrival: 22 Mins<br>• <strong>Order ID: #KP-8942</strong> (Active)"
    };
  } else {
    return {
      reply: `Got it: "${text}". I have synchronized that request with our stateless FastAPI backend. Would you like to confirm this order for pickup or delivery?`,
      orderSummary: "• 1x Custom Order Request Logged<br>• Status: Awaiting final confirmation"
    };
  }
}

function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setWaveActive(true);
    utterance.onend = () => setWaveActive(false);
    utterance.onerror = () => setWaveActive(false);
    
    window.speechSynthesis.speak(utterance);
  }
}

function setWaveActive(active) {
  const bars = document.querySelectorAll('.wave-bar');
  bars.forEach(bar => {
    if (active) {
      bar.classList.add('active');
    } else {
      bar.classList.remove('active');
    }
  });
}

// Aviation Safety Simulator Logic
window.updateAviationSimulation = function() {
  const obstacles = parseInt(document.getElementById('sliderObstacles').value, 10);
  const wind = parseInt(document.getElementById('sliderWind').value, 10);
  const anomaly = parseInt(document.getElementById('sliderAnomaly').value, 10);
  const friction = parseInt(document.getElementById('sliderFriction').value, 10);

  // Update text labels
  document.getElementById('valObstacles').textContent = `${obstacles} Object${obstacles === 1 ? '' : 's'}`;
  document.getElementById('valWind').textContent = `${wind} kts`;
  document.getElementById('valAnomaly').textContent = anomaly > 50 ? `${(anomaly / 100).toFixed(2)} (High Anomaly)` : `${(anomaly / 100).toFixed(2)} (Normal)`;
  
  const frictionLabels = ['Dry / Optimal', 'Wet / Reduced Grip', 'Icy / Critical Risk'];
  document.getElementById('valFriction').textContent = frictionLabels[friction - 1];

  // Calculate composite risk percentage
  let riskScore = (obstacles * 16.5) + (wind * 0.45) + (anomaly * 0.35) + ((friction - 1) * 14.0);
  riskScore = Math.min(99.9, Math.max(1.5, riskScore));

  const scoreElem = document.getElementById('aviationRiskScore');
  const verdictElem = document.getElementById('aviationVerdictBadge');
  const breakdownElem = document.getElementById('xaiBreakdownText');

  scoreElem.textContent = `${riskScore.toFixed(1)}%`;

  if (riskScore < 25) {
    scoreElem.style.color = 'var(--accent-emerald)';
    verdictElem.textContent = 'LOW RISK • RUNWAY SAFE FOR OPERATIONS';
    verdictElem.style.background = 'rgba(16, 185, 129, 0.15)';
    verdictElem.style.color = 'var(--accent-emerald)';
    breakdownElem.innerHTML = `
      • YOLOv8 reports ${obstacles === 0 ? 'zero runway hazards' : 'negligible hazard proximity'}.<br>
      • Wind speed (${wind} kts) well within safety bounds.<br>
      • Engine telemetry and runway friction are optimal.
    `;
  } else if (riskScore < 60) {
    scoreElem.style.color = 'var(--accent-secondary)';
    verdictElem.textContent = 'MODERATE HAZARD • ADVISORY ALERT';
    verdictElem.style.background = 'rgba(234, 88, 12, 0.15)';
    verdictElem.style.color = 'var(--accent-secondary)';
    breakdownElem.innerHTML = `
      • YOLOv8 detected ${obstacles} object(s) near taxiway / active zone.<br>
      • Weather / wind telemetry elevated to ${wind} kts.<br>
      • Recommend secondary radar visual confirmation.
    `;
  } else {
    scoreElem.style.color = 'var(--accent-primary)';
    verdictElem.textContent = 'CRITICAL TAKEOFF HAZARD • ABORT RECOMMENDED';
    verdictElem.style.background = 'var(--accent-subtle)';
    verdictElem.style.color = 'var(--accent-primary)';
    breakdownElem.innerHTML = `
      • <strong>CRITICAL:</strong> YOLOv8 flagged ${obstacles} direct runway obstructions.<br>
      • High engine telemetry anomaly index combined with runway surface degradation.<br>
      • Automated XAI safety protocol triggered for immediate ATC hold.
    `;
  }
};

/* ==========================================================================
   DOCUMIND RAG DOCUMENT ASSISTANT SIMULATOR
   ========================================================================== */
window.handleDocChange = function() {
  const docSelect = document.getElementById('docSelect');
  const chatHistory = document.getElementById('documindChatHistory');
  const citationSnippet = document.getElementById('citationSnippetBox');
  const simScore = document.getElementById('similarityScoreVal');
  const simBar = document.getElementById('similarityBarFill');

  if (!docSelect || !chatHistory) return;
  const val = docSelect.value;

  if (val === 'aviation') {
    chatHistory.innerHTML = `
      <div class="chat-msg agent">
        📄 <strong>DocuMind:</strong> Switched context to <em>Aviation_Safety_System_Report.pdf</em> (48 pages, 192 indexed FAISS chunks). Ready for questions!
      </div>
    `;
    if (citationSnippet) {
      citationSnippet.innerHTML = `
        <strong style="color: var(--accent-primary);">[Page 3, Section 2.1 — Aviation Architecture]:</strong><br>
        "The system consolidates real-time YOLOv8 bounding box obstacle detection with Random Forest &amp; SVM anomaly detection on black box flight telemetry..."
      `;
    }
    if (simScore) simScore.textContent = '96.4% Match';
    if (simBar) simBar.style.width = '96.4%';
  } else if (val === 'resume') {
    chatHistory.innerHTML = `
      <div class="chat-msg agent">
        📄 <strong>DocuMind:</strong> Loaded <em>Karthick_S_AI_ML_Profile.pdf</em> (SRM IST, AI & ML Degree, CGPA 8.24). Ready for questions!
      </div>
    `;
    if (citationSnippet) {
      citationSnippet.innerHTML = `
        <strong style="color: var(--accent-primary);">[Page 1, Section: Education &amp; Skills]:</strong><br>
        "B.Tech CSE (AI &amp; ML) graduate from SRM Institute of Science and Technology (CGPA: 8.24, First Class with Distinction). Skilled in Python, YOLOv8, OpenCV, FastAPI, and SQL..."
      `;
    }
    if (simScore) simScore.textContent = '98.8% Match';
    if (simBar) simBar.style.width = '98.8%';
  } else {
    chatHistory.innerHTML = `
      <div class="chat-msg agent">
        📄 <strong>DocuMind:</strong> Loaded <em>Voice_AI_Groq_Benchmark.pdf</em> (Latency evaluations for LLaMA 3.3 70B). Ready for questions!
      </div>
    `;
    if (citationSnippet) {
      citationSnippet.innerHTML = `
        <strong style="color: var(--accent-primary);">[Page 2, Table 1 — Latency Breakdown]:</strong><br>
        "Groq Cloud hosted LLaMA 3.3 70B achieves time-to-first-token of 118ms, enabling seamless real-time duplex dialogue loops..."
      `;
    }
    if (simScore) simScore.textContent = '94.1% Match';
    if (simBar) simBar.style.width = '94.1%';
  }

  showToast(`Document switched to ${docSelect.options[docSelect.selectedIndex].text}`);
};

window.handleDocuMindSubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('documindTextInput');
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;
  input.value = '';
  processDocuMindQuery(query);
};

window.sendDocuMindPrompt = function(queryText) {
  processDocuMindQuery(queryText);
};

function processDocuMindQuery(queryText) {
  const chatHistory = document.getElementById('documindChatHistory');
  const citationSnippet = document.getElementById('citationSnippetBox');
  const simScore = document.getElementById('similarityScoreVal');
  const simBar = document.getElementById('similarityBarFill');
  const latencyElem = document.getElementById('docRetrievalLatency');
  if (!chatHistory) return;

  // Add user query
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.style.background = '#9333EA';
  userMsg.textContent = queryText;
  chatHistory.appendChild(userMsg);
  chatHistory.scrollTop = chatHistory.scrollHeight;

  // Simulate vector similarity search
  const lower = queryText.toLowerCase();
  let reply = '';
  let citation = '';
  let matchPercentage = '95.2%';

  if (lower.includes('aviation') || lower.includes('algorithm') || lower.includes('yolo') || lower.includes('safety') || lower.includes('model')) {
    matchPercentage = '97.8%';
    citation = `<strong style="color: #9333EA;">[Page 4, Section 3.2 — Core Models]:</strong><br>"YOLOv8 executes at 60 FPS for runway FOD detection; Random Forest &amp; SVM classify multi-sensor black box anomalies, integrated into a Flask REST API with Explainable AI (XAI)."`;
    reply = `According to <strong>[Aviation_Safety_Report.pdf, Page 4]</strong>, the framework uses: 1) <strong>YOLOv8</strong> for real-time runway obstacle tracking at 60 FPS, 2) <strong>Random Forest &amp; SVM</strong> for multi-parameter telemetry anomaly classification, and 3) <strong>Explainable AI (XAI)</strong> for pilot decision interpretability.`;
  } else if (lower.includes('karthick') || lower.includes('cgpa') || lower.includes('degree') || lower.includes('college') || lower.includes('education') || lower.includes('srm')) {
    matchPercentage = '99.2%';
    citation = `<strong style="color: #9333EA;">[Page 1, Section: Education]:</strong><br>"B.Tech Computer Science &amp; Engineering (AI &amp; ML), SRM Institute of Science and Technology, Chennai. CGPA: 8.24 — First Class with Distinction (Graduated Aug 2026)."`;
    reply = `Based on <strong>[Karthick_S_Resume.pdf, Page 1]</strong>, Karthick holds a <strong>B.Tech in Computer Science &amp; Engineering (AI &amp; ML)</strong> from <strong>SRM Institute of Science and Technology</strong> with a <strong>8.24 CGPA (First Class with Distinction)</strong>.`;
  } else if (lower.includes('voice') || lower.includes('latency') || lower.includes('groq') || lower.includes('llama') || lower.includes('pizza')) {
    matchPercentage = '96.5%';
    citation = `<strong style="color: #9333EA;">[Page 2, Section: Architecture Flow]:</strong><br>"Browser Web Speech APIs handle audio capture, dispatching stateless turn history to FastAPI backend powered by Groq-hosted LLaMA 3.3 70B generating responses in ~120ms."`;
    reply = `According to <strong>[Voice_AI_Groq_Benchmark.pdf, Page 2]</strong>, sub-120ms conversational responsiveness is achieved through <strong>Groq Cloud hardware acceleration</strong> paired with <strong>LLaMA 3.3 70B</strong> and a lightweight stateless FastAPI client loop.`;
  } else {
    matchPercentage = '92.4%';
    citation = `<strong style="color: #9333EA;">[Page 1, Section 1.0 — Overview]:</strong><br>"Dense vector embeddings indexed with FAISS IndexFlatIP. Query matched against highest semantic cosine similarity chunk."`;
    reply = `Matching context found for "<em>${queryText}</em>". Retrieved 1 top-scoring semantic embedding chunk from the active FAISS vector index with <strong>${matchPercentage}</strong> similarity confidence.`;
  }

  // Update telemetry
  if (simScore) simScore.textContent = `${matchPercentage} Match`;
  if (simBar) simBar.style.width = matchPercentage;
  if (latencyElem) latencyElem.textContent = `${Math.floor(Math.random() * 20 + 25)}ms Retrieval`;
  if (citationSnippet) citationSnippet.innerHTML = citation;

  setTimeout(() => {
    const agentMsg = document.createElement('div');
    agentMsg.className = 'chat-msg agent';
    agentMsg.innerHTML = `📄 <strong>DocuMind:</strong> ${reply}`;
    chatHistory.appendChild(agentMsg);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }, 400);
}

/* ==========================================================================
   7. MODALS SYSTEM
   ========================================================================== */
window.openAviationModal = function() {
  const modal = document.getElementById('aviationModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.openFaceRecognitionModal = function() {
  const modal = document.getElementById('faceModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.openDocuMindModal = function() {
  const modal = document.getElementById('documindModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.handleBackdropClick = function(e, modalId) {
  if (e.target.id === modalId) {
    closeModal(modalId);
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal('aviationModal');
    closeModal('faceModal');
    closeModal('documindModal');
  }
});

/* ==========================================================================
   8. COPY TO CLIPBOARD & TOAST NOTIFICATIONS
   ========================================================================== */
window.copyToClipboard = function(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || 'Copied to clipboard!');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
};

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg || 'Copied to clipboard!');
  } catch (err) {
    showToast('Failed to copy. Please copy manually.');
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle" style="width: 16px; height: 16px; color: var(--accent-emerald);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  setTimeout(() => {
    toast.classList.add('show');
  }, 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 3200);
}

/* ==========================================================================
   9. CONTACT FORM HANDLER
   ========================================================================== */
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const subject = document.getElementById('contactSubject')?.value.trim();
  const message = document.getElementById('contactMessage')?.value.trim();

  if (!name || !email || !message) {
    showToast('Please fill out all required fields.');
    return;
  }

  // Generate direct mailto link as reliable fallback
  const mailtoUrl = `mailto:karthick0email@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject || 'Collaboration'}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
  
  showToast(`Thank you, ${name}! Opening mail client...`);
  
  setTimeout(() => {
    window.location.href = mailtoUrl;
    document.getElementById('contactForm')?.reset();
  }, 800);
};
