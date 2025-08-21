(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();class g{constructor(){this.element=document.getElementById("boot-sequence"),this.textElement=document.getElementById("boot-text"),this.progressElement=document.getElementById("progress-bar"),this.currentStep=0,this.audioFiles={},this.isSkipped=!1,this.skipResolver=null,this.keypressAudioBuffer=null,this.audioContext=null,this.lastKeypressTime=0,this.keypressThrottle=20,this.hddStartupTimeout=null,console.log("BootSequence constructor elements:",{element:!!this.element,textElement:!!this.textElement,progressElement:!!this.progressElement}),this.loadAudioFiles(),this.setupWebAudio(),this.setupSpacebarSkip(),this.steps=["BERRYBOT v3.14.159 MAINFRAME SYSTEM","BERRY ANALYTICS CORPORATION","","INITIALIZING CORE SYSTEMS...","TRADING ENGINE CONTROLS...........[OK]","RISK MANAGEMENT SYSTEMS............[OK]","MARKET DATA PROCESSORS.............[OK]","COMMUNICATIONS ARRAY...............[OK]","SECURITY PROTOCOLS.................[OK]","","LOADING AI CONSENSUS MATRIX...","PROTOCOL: MULTI-LLM INTEGRATION","","AI PROVIDER STATUS:","> OPENAI NEURAL NETWORK.........[ACTIVE]","> ANTHROPIC SYSTEMS.............[ACTIVE]","> GOOGLE COGNITIVE ENGINE.......[ACTIVE]","> LOCAL PROCESSING UNITS........[ACTIVE]","> OLLAMA DISTRIBUTED NODES......[ACTIVE]","> CUSTOM API INTERFACES.........[ACTIVE]","","CONSENSUS PROTOCOL VERIFICATION...[OK]","MULTI-LLM VOTING SYSTEM ONLINE....[OK]","","TRADING ENGINE STATUS:","> RISK ASSESSMENT PROTOCOLS....[LOADED]","> MARKET DATA ACQUISITION.......[ACTIVE]","> EXCHANGE API CONNECTIONS......[SECURE]","> PAPER TRADING MODE............[ENABLED]","","SYSTEM DIAGNOSTICS:","> CPU: RASPBERRY PI 5 ARM CORTEX..[OK]","> MEMORY: 8GB NEURAL PROCESSING...[OK]","> STORAGE: 256GB SSD ARCHIVE......[OK]","> NEURAL NET: BERRYBOT MATRIX.....[OK]","> QUANTUM PROCESSORS..............[OK]","> NETWORK COMMUNICATIONS..........[OK]","","RUNNING COMPREHENSIVE DIAGNOSTICS...","","TESTING AI CONSENSUS PATHWAYS...","TESTING INTER-LLM COMMUNICATIONS...","TESTING VOTING ALGORITHM STABILITY...","TESTING RISK ASSESSMENT PROTOCOLS...","TESTING MARKET DATA INTEGRITY...","TESTING SECURITY ENCRYPTION...","TESTING BACKUP SYSTEMS...","TESTING EMERGENCY PROTOCOLS...","","ALL SYSTEMS NOMINAL","","TRADING PROTOCOL CONFIRMED","PROFIT MAXIMIZATION ENABLED","","BERRYBOT SYSTEM READY","AWAITING USER INSTRUCTIONS..."]}loadAudioFiles(){const t={startup:"./assets/audio/bootsound.mp3",keypress:"./assets/audio/keypress.mp3",hdd_startup:"./assets/audio/hdd_startup.mp3",hdd_loop:"./assets/audio/hdd_loop.mp3",glitch:"./assets/audio/glitch.mp3",degauss:"./assets/audio/degauss.mp3"};Object.keys(t).forEach(e=>{this.audioFiles[e]=new Audio(t[e]),e==="keypress"?this.audioFiles[e].volume=.15:e==="hdd_startup"?(this.audioFiles[e].volume=.25,this.audioFiles[e].loop=!1):e==="hdd_loop"?(this.audioFiles[e].volume=.2,this.audioFiles[e].loop=!0):e==="glitch"?this.audioFiles[e].volume=.4:e==="ambient"?(this.audioFiles[e].volume=.15,this.audioFiles[e].loop=!0):e==="fan_noise"?(this.audioFiles[e].volume=.1,this.audioFiles[e].loop=!0):e==="degauss"?this.audioFiles[e].volume=.35:e==="startup"?this.audioFiles[e].volume=1:this.audioFiles[e].volume=.3,this.audioFiles[e].preload="auto",this.audioFiles[e].addEventListener("error",()=>{console.log(`Audio file ${t[e]} not found - skipping sound effects`)}),this.audioFiles[e].addEventListener("canplaythrough",()=>{console.log(`Audio file ${e} loaded successfully`)})}),this.setupAudioUnlock()}setupAudioUnlock(){const t=()=>{console.log("User interaction detected - attempting to unlock audio"),Object.values(this.audioFiles).forEach(e=>{e.readyState>=2&&e.play().then(()=>{e.pause(),e.currentTime=0,console.log("Audio unlocked")}).catch(i=>{console.log("Audio unlock failed:",i)})}),document.removeEventListener("click",t),document.removeEventListener("keydown",t),document.removeEventListener("touchstart",t)};document.addEventListener("click",t),document.addEventListener("keydown",t),document.addEventListener("touchstart",t)}async playSound(t){if(this.audioFiles[t])try{this.audioFiles[t].paused&&(this.audioFiles[t].currentTime=0);const e=this.audioFiles[t].play();return e!==void 0?await e.catch(i=>{throw i.name==="NotAllowedError"?(console.log("Audio blocked by browser - user interaction required"),this.waitForUserInteraction(t),i):(console.log(`Could not play ${t}:`,i),i)}):Promise.resolve()}catch(e){throw console.log(`Error playing ${t}:`,e),e}else return console.log(`Audio file ${t} not loaded`),Promise.reject(new Error(`Audio file ${t} not loaded`))}playKeypressSound(){const t=Date.now();if(!(t-this.lastKeypressTime<this.keypressThrottle)&&(this.lastKeypressTime=t,this.audioFiles.keypress&&this.audioFiles.keypress.readyState>=2))try{this.keypressAudioBuffer?this.playKeypressWithWebAudio():setTimeout(()=>{try{const e=this.audioFiles.keypress.cloneNode();e.volume=.12,e.currentTime=0,e.play().catch(()=>{})}catch{}},0)}catch{}}setupWebAudio(){try{(window.AudioContext||window.webkitAudioContext)&&(this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.loadKeypressBuffer(),this.setupGlitchEffects())}catch{}}setupGlitchEffects(){if(this.audioContext)try{this.glitchGain=this.audioContext.createGain(),this.distortion=this.audioContext.createWaveShaper(),this.filter=this.audioContext.createBiquadFilter(),this.distortion.curve=this.createDistortionCurve(50),this.distortion.oversample="4x",this.filter.type="highpass",this.filter.frequency.value=1e3,this.filter.Q.value=25,this.glitchGain.connect(this.distortion),this.distortion.connect(this.filter),this.filter.connect(this.audioContext.destination),console.log("Audio glitch effects initialized")}catch(t){console.log("Could not set up audio distortion effects:",t)}}createDistortionCurve(t){const i=new Float32Array(44100),s=Math.PI/180;for(let o=0;o<44100;o++){const n=o*2/44100-1;i[o]=(3+t)*n*20*s/(Math.PI+t*Math.abs(n))}return i}async loadKeypressBuffer(){try{const e=await(await fetch("./assets/audio/keypress.mp3")).arrayBuffer();this.keypressAudioBuffer=await this.audioContext.decodeAudioData(e)}catch{}}playKeypressWithWebAudio(){try{const t=this.audioContext.createBufferSource(),e=this.audioContext.createGain();t.buffer=this.keypressAudioBuffer,e.gain.value=.12,t.connect(e),e.connect(this.audioContext.destination),t.start()}catch{}}playGlitchSound(){console.log("Boot sequence glitch sound - DISABLED (only for main page)")}playDegaussSound(){console.log("Playing CRT degauss sound effect"),this.audioFiles.degauss&&this.playSound("degauss")}triggerDegaussEffect(){console.log("Triggering CRT degauss screen distortion effect");const t=document.querySelector(".boot-content")||document.body;t&&(this.createDegaussOverlay(t),this.applyDegaussDistortion(t))}createDegaussOverlay(t){const e=document.createElement("div");e.className="degauss-overlay",e.style.cssText=`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background: 
        linear-gradient(45deg, 
          transparent 30%, 
          rgba(255,255,255,0.1) 35%, 
          rgba(255,176,0,0.15) 40%, 
          rgba(255,255,255,0.1) 45%, 
          transparent 50%
        );
      background-size: 200% 200%;
      animation: degaussWave 1.8s ease-out forwards;
      opacity: 0;
    `,t.appendChild(e),setTimeout(()=>{e&&e.parentNode&&e.parentNode.removeChild(e)},1800)}applyDegaussDistortion(t){const e=t.style.transform;t.style.transition="transform 0.1s ease-out",t.style.transform="scaleX(1.02) scaleY(0.98) skewX(0.5deg)",setTimeout(()=>{t.style.transition="transform 0.2s ease-in-out",t.style.transform="scaleX(0.98) scaleY(1.03) skewX(-1deg) rotate(0.2deg)"},300),setTimeout(()=>{t.style.transition="transform 0.15s ease-in-out",t.style.transform="scaleX(1.01) scaleY(0.99) skewX(0.3deg) rotate(-0.1deg)"},800),setTimeout(()=>{t.style.transition="transform 0.1s ease-in-out",t.style.transform="scaleX(0.999) scaleY(1.001) skewX(-0.1deg)"},1200),setTimeout(()=>{t.style.transition="transform 0.4s ease-out",t.style.transform=e,setTimeout(()=>{t.style.transition=""},400)},1600)}distortAllCurrentAudio(t=400){console.log("Distorting all currently playing audio");const e=[];if(Object.keys(this.audioFiles).forEach(s=>{this.audioFiles[s]&&!this.audioFiles[s].paused&&e.push({name:s,audio:this.audioFiles[s]})}),e.length===0){console.log("No active audio to distort");return}console.log(`Distorting ${e.length} active audio sources:`,e.map(s=>s.name));const i=e.map(({name:s,audio:o})=>({name:s,audio:o,volume:o.volume,playbackRate:o.playbackRate||1}));e.forEach(({audio:s})=>{switch(Math.floor(Math.random()*3)){case 0:this.applyVolumeGlitch(s,t);break;case 1:this.applySpeedDistortion(s,t);break;case 2:this.applyVolumeGlitch(s,t*.6),setTimeout(()=>this.applySpeedDistortion(s,t*.4),t*.3);break}}),setTimeout(()=>{i.forEach(({audio:s,volume:o,playbackRate:n})=>{s&&(s.volume=o,s.playbackRate=n)}),console.log("Audio distortion effects ended, restored original states")},t)}applyVolumeGlitch(t,e){const i=t.volume;let s=0;const o=Math.floor(e/30),n=setInterval(()=>{if(s>=o){clearInterval(n);return}t.volume=i*(.1+Math.random()*.9),s++},30)}applySpeedDistortion(t,e){const i=t.playbackRate||1,s=i*(.7+Math.random()*.6);t.playbackRate=s,setTimeout(()=>{t&&(t.playbackRate=i)},e)}applyAudioGlitch(t=200){if(!(!this.audioContext||!this.glitchGain)){console.log("Applying audio distortion glitch effect");try{const e=this.audioContext.createBuffer(1,this.audioContext.sampleRate*(t/1e3),this.audioContext.sampleRate),i=e.getChannelData(0);for(let o=0;o<i.length;o++)i[o]=(Math.random()*2-1)*.3;const s=this.audioContext.createBufferSource();s.buffer=e,this.glitchGain.gain.value=1,s.connect(this.glitchGain),s.start(),setTimeout(()=>{this.glitchGain&&this.glitchGain.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+.1)},t*.7)}catch(e){console.log("Audio glitch effect failed:",e)}}}async startHDDSequence(){if(console.log("Starting HDD startup sequence"),this.audioFiles.hdd_startup){this.playSound("hdd_startup");const t=()=>{console.log("HDD startup sound finished, starting loop"),this.startHDDLoop(),this.audioFiles.hdd_startup.removeEventListener("ended",t)};this.audioFiles.hdd_startup.addEventListener("ended",t),this.hddStartupTimeout=setTimeout(()=>{console.log("HDD startup timeout reached, starting loop (fallback)"),this.startHDDLoop(),this.audioFiles.hdd_startup.removeEventListener("ended",t)},2e4)}else this.startHDDLoop()}startHDDLoop(){console.log("Starting HDD loop sound"),this.audioFiles.hdd_loop?(console.log("HDD loop audio file available, attempting to play"),this.audioFiles.hdd_loop.currentTime=0,this.audioFiles.hdd_loop.loop=!0,this.audioFiles.hdd_loop.addEventListener("ended",()=>{console.log("HDD loop ended, restarting for seamless playback"),this.audioFiles.hdd_loop.currentTime=0,this.audioFiles.hdd_loop.play().catch(t=>console.log("HDD loop restart failed:",t))}),this.playSound("hdd_loop").then(()=>{console.log("HDD loop started successfully"),this.setupSeamlessLoop(this.audioFiles.hdd_loop)}).catch(t=>{console.log("HDD loop start failed:",t)}),typeof window<"u"&&(window.berryBotHDD=this.audioFiles.hdd_loop,window.berryBotStopHDD=()=>this.stopAllHDDSounds(),window.berryBotAudio=this,console.log("HDD loop and audio system made globally available")),this.startBackgroundSounds()):console.log("HDD loop audio file not available")}startBackgroundSounds(){console.log("Starting additional background sound effects"),setTimeout(()=>{this.audioFiles.ambient&&!this.isSkipped&&(console.log("Starting ambient background sound"),this.playSound("ambient").catch(t=>console.log("Ambient sound failed:",t)),this.audioFiles.ambient.duration&&this.setupSeamlessLoop(this.audioFiles.ambient))},2e3),setTimeout(()=>{this.audioFiles.fan_noise&&!this.isSkipped&&(console.log("Starting fan noise background sound"),this.playSound("fan_noise").catch(t=>console.log("Fan noise failed:",t)),this.audioFiles.fan_noise.duration&&this.setupSeamlessLoop(this.audioFiles.fan_noise))},5e3)}setupSeamlessLoop(t){const e=()=>{if(t&&!t.paused&&t.duration){const s=t.duration>60?.5:.1;t.currentTime>=t.duration-s&&(console.log(`Seamless loop: restarting HDD sound (${Math.round(t.duration)}s duration)`),t.currentTime=0)}},i=t&&t.duration>60?200:50;this.hddLoopInterval=setInterval(e,i),this.audioFiles.hdd_loop.seamlessLoopInterval=this.hddLoopInterval,console.log(`Set up seamless looping with ${i}ms intervals for ${Math.round(t.duration||0)}s audio`)}transitionHDDToBackground(){if(console.log("Transitioning HDD sounds to background mode"),this.hddStartupTimeout&&(clearTimeout(this.hddStartupTimeout),this.hddStartupTimeout=null),this.audioFiles.hdd_startup&&!this.audioFiles.hdd_startup.paused){console.log("HDD startup still playing, letting it finish before starting loop");const t=()=>{console.log("HDD startup finished during background transition"),this.startHDDLoop(),this.audioFiles.hdd_loop&&(this.audioFiles.hdd_loop.volume=.1),this.audioFiles.hdd_startup.removeEventListener("ended",t)};this.audioFiles.hdd_startup.addEventListener("ended",t),typeof window<"u"&&(window.berryBotStopHDD=()=>this.stopAllHDDSounds());return}this.audioFiles.hdd_loop?(console.log("Keeping HDD loop running as background sound"),console.log("HDD loop current state:",{paused:this.audioFiles.hdd_loop.paused,currentTime:this.audioFiles.hdd_loop.currentTime,duration:this.audioFiles.hdd_loop.duration,volume:this.audioFiles.hdd_loop.volume}),(this.audioFiles.hdd_loop.paused||this.audioFiles.hdd_loop.currentTime===0)&&(console.log("HDD loop not playing, starting it"),this.playSound("hdd_loop")),this.audioFiles.hdd_loop.volume=.1,typeof window<"u"&&(window.berryBotHDD=this.audioFiles.hdd_loop,window.berryBotStopHDD=()=>this.stopAllHDDSounds())):console.log("HDD loop audio file not available during transition")}stopAllHDDSounds(){console.log("Stopping all background sounds completely"),this.hddStartupTimeout&&(clearTimeout(this.hddStartupTimeout),this.hddStartupTimeout=null),this.hddLoopInterval&&(clearInterval(this.hddLoopInterval),this.hddLoopInterval=null),["hdd_startup","hdd_loop","ambient","fan_noise"].forEach(e=>{this.audioFiles[e]&&(this.audioFiles[e].seamlessLoopInterval&&(clearInterval(this.audioFiles[e].seamlessLoopInterval),this.audioFiles[e].seamlessLoopInterval=null),this.audioFiles[e].pause(),this.audioFiles[e].currentTime=0,console.log(`Stopped ${e} background sound`))}),typeof window<"u"&&(window.berryBotHDD=null,window.berryBotStopHDD=null)}stopHDDSounds(){this.stopAllHDDSounds()}waitForUserInteraction(t){const e=()=>{this.audioFiles[t].play().catch(i=>{console.log(`Still could not play ${t}:`,i)}),document.removeEventListener("click",e),document.removeEventListener("keydown",e)};document.addEventListener("click",e,{once:!0}),document.addEventListener("keydown",e,{once:!0}),console.log("Click or press any key to enable audio")}setupSpacebarSkip(){const t=e=>{e.code==="Space"&&(e.preventDefault(),console.log("Spacebar pressed - skipping boot sequence"),this.skipBootSequence())};document.addEventListener("keydown",t),this.spacebarHandler=t}skipBootSequence(){this.isSkipped=!0,this.skipResolver&&this.skipResolver(),this.audioFiles.hdd_loop&&!this.audioFiles.hdd_loop.currentTime&&(console.log("Boot sequence skipped - starting HDD loop"),this.startHDDLoop()),this.completeBootSequence()}completeBootSequence(){console.log("Boot sequence completed/skipped"),this.transitionHDDToBackground(),this.element&&(this.element.style.display="none");const t=document.getElementById("main-content");t&&(t.style.display="block"),this.spacebarHandler&&document.removeEventListener("keydown",this.spacebarHandler)}async start(){if(console.log("🚀 Boot sequence start() called"),!this.element){console.error("❌ Boot sequence element not found - this is the problem!");return}if(!this.textElement){console.error("❌ Boot text element not found!");return}console.log("✅ Boot sequence elements found, proceeding with animation"),console.log("Elements found:",{element:!!this.element,textElement:!!this.textElement,progressElement:!!this.progressElement}),this.element.style.display="flex",this.textElement&&(this.textElement.textContent=""),this.progressElement&&(this.progressElement.style.width="0%"),await this.terminalPowerOn(),console.log("Attempting to play startup sound"),await this.playSound("startup"),typeof window<"u"&&(window.berryBotAudio=this,console.log("Boot sequence audio system made globally accessible")),this.startHDDSequence(),await this.systemWakeUp(),console.log("Starting boot sequence typing..."),await this.typeBootSequence(),console.log("Waiting for continue..."),await this.waitForContinue(),!this.isSkipped&&(console.log("Hiding boot sequence"),await this.terminalPowerOff(),this.completeBootSequence())}async typeBootSequence(){console.log("typeBootSequence started, steps:",this.steps.length);for(let t=0;t<this.steps.length;t++){if(this.isSkipped){console.log("Boot sequence skipped, breaking loop");break}const e=this.steps[t];console.log(`Typing line ${t}: "${e}"`);const i=document.createElement("div");i.className="boot-line",i.style.color="#FFB000",Math.random()<.075&&(i.classList.add("text-corrupt"),setTimeout(()=>{i.classList.remove("text-corrupt")},Math.random()*1e3+500)),e.startsWith(">")||e.includes("BERRY ANALYTICS")||e.includes("[OK]")||e.includes("[ACTIVE]")||e.includes("[LOADED]")||e.includes("[SECURE]")||e.includes("[ENABLED]")||e.includes("NOMINAL")?i.style.color="#00FF00":e.includes("ERROR")||e.includes("FAILED")?i.style.color="#FF0000":e.includes("PROTOCOL")||e.includes("BERRYBOT")||e.includes("PROFIT MAXIMIZATION")?i.style.color="#FFFFFF":(e.includes("TESTING")||e.includes("LOADING")||e.includes("INITIALIZING")||e.includes("RUNNING"))&&(i.style.color="#FFB000"),this.textElement.appendChild(i),e.trim()?await this.typeLine(i,e):i.innerHTML="&nbsp;",this.textElement.scrollTop=this.textElement.scrollHeight,i.scrollIntoView({behavior:"smooth",block:"end"}),e.includes("BERRYBOT")||e.includes("PROTOCOL")||e.includes("PROFIT MAXIMIZATION")?await this.delay(75):e.includes("BERRY ANALYTICS")?await this.delay(60):e.includes("[OK]")||e.includes("[ACTIVE]")||e.includes("[LOADED]")?await this.delay(11):e.includes("INITIALIZING")||e.includes("LOADING")||e.includes("RUNNING")?await this.delay(30):e.startsWith(">")?await this.delay(15):e.includes("READY")?await this.delay(90):await this.delay(19),Math.random()<.04&&this.triggerMalfunction(),await this.addScreenArtifacts(),Math.random()<.08&&this.addAmbientFlicker()}console.log("typeBootSequence completed")}async typeLine(t,e){if(console.log(`Typing text: "${e}"`),e.includes("[OK]")||e.includes("[ACTIVE]")||e.includes("NOMINAL")?this.playSound("success"):e.includes("TESTING")||e.includes("LOADING")||e.includes("INITIALIZING")?this.playSound("beep"):(e.includes("BERRYBOT SYSTEM READY")||e.includes("PROFIT MAXIMIZATION"))&&this.playSound("complete"),e.startsWith("TESTING ")){for(let o=0;o<e.length;o++)t.textContent+=e[o],e[o]!==" "&&this.playKeypressSound(),await this.delay(1.9);t.textContent+=" [";for(let o=0;o<=100;o+=Math.random()<.2?5:3){const n=t.textContent.substring(0,t.textContent.indexOf("[")+1),a=`${o}%`,l=o<100?"...":"";t.textContent=n+a+l+"]",t.scrollIntoView({behavior:"smooth",block:"end"}),o<10||o>95?await this.delay(11):o%20===0?await this.delay(19):await this.delay(6)}const s=t.textContent.substring(0,t.textContent.indexOf("["));t.textContent=s+"[100%] PASSED"}else for(let s=0;s<e.length;s++)t.textContent+=e[s],e[s]!==" "&&this.playKeypressSound(),e.includes("PROFIT MAXIMIZATION")?await this.delay(11):e.includes("[OK]")||e.includes("[ACTIVE]")||e.includes("NOMINAL")?await this.delay(1.1):e.includes("PROTOCOL")||e.includes("BERRYBOT")?await this.delay(6):e.includes("BERRY ANALYTICS")?await this.delay(4.5):e.includes("TESTING")||e.includes("LOADING")||e.includes("INITIALIZING")?await this.delay(3):e.startsWith(">")?await this.delay(1.5):await this.delay(2.25);console.log(`Finished typing: "${e}"`)}async animateProgressBar(){this.progressElement.innerHTML="";const e=`${100/50}%`;for(let n=0;n<50;n++){const a=document.createElement("div");a.className="progress-rectangle",a.style.width=e,a.style.flex="none",this.progressElement.appendChild(a)}const s=(this.steps.length*60+2e3)/50,o=this.progressElement.querySelectorAll(".progress-rectangle");for(let n=0;n<50;n++)o[n]&&o[n].classList.add("filled"),n<8?await this.delay(s*.8):n<16?await this.delay(s*1.2):n<25?await this.delay(s*.6):n<35?await this.delay(s*.4):n<45?await this.delay(s*1):await this.delay(s*1.5);o.forEach(n=>{n&&!n.classList.contains("filled")&&n.classList.add("filled")})}async waitForContinue(){return console.log("Waiting for continue - 2 second timeout or user interaction"),new Promise(t=>{const e=setTimeout(()=>{console.log("Auto-continuing after timeout"),t()},2e3),i=o=>{console.log("Key pressed, continuing"),clearTimeout(e),document.removeEventListener("keydown",i),document.removeEventListener("click",s),t()},s=o=>{console.log("Click detected, continuing"),clearTimeout(e),document.removeEventListener("keydown",i),document.removeEventListener("click",s),t()};document.addEventListener("keydown",i),document.addEventListener("click",s)})}delay(t){return new Promise(e=>{if(this.isSkipped){e();return}const i=setTimeout(()=>{e()},t);this.skipResolver=()=>{clearTimeout(i),e()}})}async terminalPowerOn(){const t=document.querySelector(".boot-content"),e=document.querySelector(".boot-sequence");t&&e&&(e.style.background="#000000",t.style.opacity="0",t.style.filter="brightness(0)",console.log("Starting CRT monitor degauss on power-on"),this.playDegaussSound(),console.log("Starting fast CRT warm-up sequence immediately on user interaction"),this.startFastWarmUp(t,e),setTimeout(()=>{this.triggerDegaussEffect()},200),setTimeout(()=>{t.style.animation="terminalFlicker 0.1s ease-in-out 1"},1200))}startFastWarmUp(t,e){t.style.transition="opacity 0.12s cubic-bezier(0.4, 0, 0.2, 1), filter 0.12s cubic-bezier(0.4, 0, 0.2, 1)",e.style.transition="background 0.12s cubic-bezier(0.4, 0, 0.2, 1)",[{opacity:.1,brightness:.1,time:0},{opacity:.2,brightness:.2,time:120},{opacity:.3,brightness:.3,time:240},{opacity:.4,brightness:.4,time:360},{opacity:.5,brightness:.5,time:480},{opacity:.6,brightness:.6,time:600},{opacity:.7,brightness:.7,time:720},{opacity:.8,brightness:.8,time:840},{opacity:.9,brightness:.9,time:960},{opacity:1,brightness:1,time:1080}].forEach((s,o)=>{setTimeout(()=>{const n=Math.round(s.opacity*40).toString(16).padStart(2,"0"),a=Math.round(20+s.opacity*50);s.opacity<1?e.style.background=`radial-gradient(circle at center, #00${n}00 0%, #000000 ${a}%)`:e.style.background="#000000",t.style.opacity=s.opacity.toString(),t.style.filter=`brightness(${s.brightness}) contrast(1)`,console.log(`CRT warm-up step ${o+1}/10: opacity ${s.opacity}, brightness ${s.brightness}`)},s.time)}),setTimeout(()=>{t.style.transition="",e.style.transition="",console.log("CRT warm-up completed - smooth progression from 0.1 to 1.0")},1200)}async systemWakeUp(){if(this.textElement){const t=document.createElement("div");t.innerHTML='<span style="color: #FFB000; animation: blink 1s infinite;">█</span>',this.textElement.appendChild(t),await this.delay(600),t.remove();const e=["","████████████████████████████████████████████████████████","██                                                    ██","██          BERRYBOT TERMINAL SYSTEM v3.14            ██","██                                                    ██","████████████████████████████████████████████████████████","","SYSTEM POWER: ON","TERMINAL READY","INITIALIZING BOOT SEQUENCE...",""];for(const i of e){const s=document.createElement("div");if(s.className="boot-line",s.style.color=i.includes("█")?"#FFB000":"#00FF00",s.style.textShadow="0 0 5px currentColor",i.includes("█")&&(s.style.letterSpacing="1px"),this.textElement.appendChild(s),i.trim()){const o=i.includes("█")?4:23;for(let n=0;n<i.length;n++)s.textContent+=i[n],i[n]!==" "&&this.playKeypressSound(),await this.delay(o)}else s.innerHTML="&nbsp;";this.textElement.scrollTop=this.textElement.scrollHeight,await this.delay(i.includes("BERRYBOT")?225:75)}await this.delay(375)}}async terminalPowerOff(){const t=document.querySelector(".boot-content"),e=document.querySelector(".boot-sequence");if(t&&e){for(let i=0;i<2;i++)t.style.opacity="0.7",t.style.filter="brightness(0.7)",await this.delay(75),t.style.opacity="1",t.style.filter="brightness(1)",await this.delay(38);t.style.transition="all 0.6s ease-in",t.style.transform="scaleY(0.01) scaleX(1)",t.style.filter="brightness(2) contrast(2)",await this.delay(300),t.style.transform="scaleY(0.001) scaleX(0.1)",t.style.filter="brightness(0)",await this.delay(300),t.style.transition="",t.style.transform="",t.style.filter="",t.style.opacity="1"}}async triggerMalfunction(){const t=document.querySelector(".boot-content"),e=document.querySelectorAll(".boot-line");if(t&&e.length>0){switch(console.log("System malfunction triggered - adding audio glitch effects"),Math.floor(Math.random()*2)){case 0:this.playGlitchSound(),this.distortAllCurrentAudio(300);break;case 1:this.distortAllCurrentAudio(400);break}t.style.filter="contrast(1.5) brightness(1.2)";const s=Math.random()*20+5;t.style.transform=`translateX(${Math.random()<.5?"-":""}${s}px)`;const o=Array.from(e).slice(-8),n=[];o.forEach(a=>{if(Math.random()<.4){const l=a.textContent,r=this.corruptText(l);a.textContent=r,a.style.color="#FF0000",a.style.animation="textCorruption 0.1s infinite",n.push({element:a,original:l})}}),t.style.background="rgba(255, 0, 0, 0.1)",await this.delay(113),t.style.filter="brightness(0.5)",await this.delay(38),t.style.filter="brightness(1.5)",await this.delay(38),t.style.filter="",t.style.transform="",t.style.background="",setTimeout(()=>{n.forEach(({element:a,original:l})=>{a.textContent=l,a.style.color="",a.style.animation=""})},225)}}corruptText(t){const e="!@#$%^&*()_+-=[]{}|;:,.<>?~`",i="█▓▒░▄▀■□▪▫";let s="";for(let o=0;o<t.length;o++)t[o]===" "?s+=" ":Math.random()<.3?s+=Math.random()<.7?e[Math.floor(Math.random()*e.length)]:i[Math.floor(Math.random()*i.length)]:s+=t[o];return s}async addScreenArtifacts(){const t=document.querySelector(".boot-content");if(t&&Math.random()<.15)switch(Math.floor(Math.random()*3)){case 0:const i=document.createElement("div");i.style.cssText=`
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #FFB000, transparent);
            top: ${Math.random()*80+10}%;
            z-index: 10;
            animation: scanlineMove 0.5s ease-out forwards;
          `,t.appendChild(i),setTimeout(()=>i.remove(),375);break;case 1:t.style.filter="hue-rotate(30deg) saturate(1.5)",setTimeout(()=>{t.style.filter=""},75);break;case 2:t.style.animation="brightnessFlicker 0.15s ease-in-out",setTimeout(()=>{t.style.animation=""},150);break}}addAmbientFlicker(){const t=document.querySelector(".boot-content");if(!t)return;switch(Math.floor(Math.random()*3)){case 0:t.style.transition="filter 0.1s ease-in-out",t.style.filter="brightness(0.95) contrast(1.02)",setTimeout(()=>{t.style.filter="brightness(1.02) contrast(0.99)",setTimeout(()=>{t.style.filter="",t.style.transition=""},80)},60);break;case 1:t.style.filter="contrast(1.05) brightness(0.98)",setTimeout(()=>{t.style.filter="contrast(0.98) brightness(1.03)",setTimeout(()=>{t.style.filter=""},40)},30);break;case 2:t.style.opacity="0.97",setTimeout(()=>{t.style.opacity="1.01",setTimeout(()=>{t.style.opacity="1"},50)},40);break}}}const f=`
.boot-line {
  margin: 2px 0;
  font-family: 'Courier New', 'Lucida Console', 'Monaco', 'Consolas', monospace;
  white-space: pre;
  color: #FFB000;
  font-weight: bold;
  text-shadow: 0 0 5px #FFB000;
  position: relative;
}

.boot-line:empty::before {
  content: ' ';
}

/* Loading animation for processing items */
.boot-line:has-text("TESTING") {
  animation: motherPulse 1.5s infinite;
}

@keyframes motherPulse {
  0%, 100% { 
    opacity: 1; 
    text-shadow: 0 0 5px #FFB000;
  }
  50% { 
    opacity: 0.7; 
    text-shadow: 0 0 10px #FFB000;
  }
}

/* Terminal flicker effect */
@keyframes terminalFlicker {
  0%, 100% { opacity: 1; filter: brightness(1); }
  25% { opacity: 0.8; filter: brightness(0.8); }
  50% { opacity: 1; filter: brightness(1.2); }
  75% { opacity: 0.9; filter: brightness(0.9); }
}

/* Text corruption animation */
@keyframes textCorruption {
  0% { transform: translateX(0); }
  20% { transform: translateX(-1px); }
  40% { transform: translateX(1px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
  100% { transform: translateX(0); }
}

/* Scanline movement animation */
@keyframes scanlineMove {
  0% { 
    opacity: 0; 
    top: 10%; 
    filter: blur(2px);
  }
  50% { 
    opacity: 1; 
    filter: blur(0px);
  }
  100% { 
    opacity: 0; 
    top: 90%; 
    filter: blur(2px);
  }
}

/* Brightness flicker animation */
@keyframes brightnessFlicker {
  0%, 100% { filter: brightness(1); }
  25% { filter: brightness(0.7); }
  50% { filter: brightness(1.3); }
  75% { filter: brightness(0.8); }
}

/* Cursor blink animation */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* CRT Degauss wave animation */
@keyframes degaussWave {
  0% { 
    opacity: 0;
    background-position: -200% -200%;
    transform: skewX(0deg);
  }
  5% {
    opacity: 0.8;
  }
  15% { 
    background-position: -100% -100%;
    transform: skewX(0.5deg);
  }
  30% { 
    background-position: 0% 0%;
    transform: skewX(-0.3deg);
  }
  50% { 
    background-position: 100% 100%;
    transform: skewX(0.2deg);
  }
  70% { 
    background-position: 200% 200%;
    transform: skewX(-0.1deg);
  }
  85% {
    opacity: 0.4;
  }
  100% { 
    opacity: 0;
    background-position: 300% 300%;
    transform: skewX(0deg);
  }
}

.boot-sequence {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Retro terminal scanlines effect */
  background-image: 
    linear-gradient(transparent 50%, rgba(255, 176, 0, 0.03) 50%);
  background-size: 100% 4px;
  /* Subtle screen curvature effect */
  filter: brightness(1) contrast(1.1);
}

.boot-content {
  text-align: left;
  max-width: 800px;
  width: 90%;
  border: 2px solid #FFB000;
  background: rgba(0, 0, 0, 0.95);
  padding: 2rem;
  box-shadow: 
    0 0 20px #FFB000,
    inset 0 0 0 1px #00FF00,
    inset 0 0 20px rgba(255, 176, 0, 0.1);
  position: relative;
  overflow: hidden;
  /* CRT-style subtle rounded corners */
  border-radius: 8px;
}

/* Add subtle CRT barrel distortion */
.boot-content::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: 
    radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.1) 100%);
  pointer-events: none;
  z-index: 1;
}

.boot-text {
  font-family: 'Courier New', 'Lucida Console', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  color: #FFB000;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
  max-height: 70vh;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-bottom: 2rem;
  font-weight: bold;
  position: relative;
  z-index: 2;
}

.boot-progress {
  background: #0A0A0A;
  border: 2px solid #FFB000;
  border-radius: 0;
  padding: 0.5rem;
  box-shadow: 
    0 0 10px #FFB000,
    inset 0 0 0 1px #00FF00;
}

.progress-bar {
  height: 20px;
  background: #000000;
  border-radius: 0;
  width: 100%;
  padding: 2px;
  display: flex;
  gap: 0px;
  box-sizing: border-box;
  position: relative;
}

.progress-rectangle {
  flex: 1;
  height: 100%;
  background: #0A0A0A;
  border: 1px solid #FFB000;
  border-radius: 0px;
  transition: background-color 0.3s ease;
  min-width: 2px;
  box-sizing: border-box;
  margin: 0;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}

.progress-rectangle.filled {
  background: #FFB000;
  box-shadow: 0 0 5px #FFB000;
}

/* Additional retro terminal effects with scanning pulses */
.boot-sequence::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 176, 0, 0.03) 2px,
      rgba(255, 176, 0, 0.03) 4px
    );
  pointer-events: none;
  z-index: 1000;
}

/* Boot sequence scanning pulse effects */
.boot-sequence::before {
  content: '';
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
  height: 25px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 176, 0, 0.6) 20%,
    rgba(255, 176, 0, 0.9) 50%,
    rgba(255, 176, 0, 0.6) 80%,
    transparent 100%
  );
  animation: boot-scanning-pulse 10s ease-in-out infinite;
  opacity: 0;
  pointer-events: none;
  z-index: 1001;
}

@keyframes boot-scanning-pulse {
  0%, 88%, 100% { 
    transform: translateY(-25px);
    opacity: 0;
  }
  3% { 
    opacity: 1;
  }
  20% { 
    transform: translateY(100vh);
    opacity: 0.8;
  }
  21%, 87% { 
    opacity: 0;
  }
}
`,h=document.createElement("style");h.textContent=f;document.head.appendChild(h);class y{constructor(){this.output=document.getElementById("terminal-output"),this.input=document.getElementById("terminal-input"),this.cursor=document.getElementById("cursor"),this.history=[],this.historyIndex=-1,this.currentDirectory="~",this.isProcessing=!1,this.commands={help:this.showHelp.bind(this),clear:this.clear.bind(this),explain:this.explainConcept.bind(this),architecture:this.showArchitecture.bind(this),consensus:this.explainConsensus.bind(this),risk:this.explainRisk.bind(this),llm:this.explainLLM.bind(this),config:this.showConfig.bind(this),ls:this.listDirectory.bind(this),cd:this.changeDirectory.bind(this),cat:this.displayFile.bind(this),berrybot:this.berryBotCommand.bind(this),echo:this.echo.bind(this),whoami:this.whoami.bind(this),uptime:this.uptime.bind(this),learn:this.learnMore.bind(this),about:this.aboutBot.bind(this),matrix:this.matrixEasterEgg.bind(this),exit:this.exit.bind(this)},this.files={"overview.md":`BerryBot MK3 Overview:

Revolutionary AI trading bot using 9-LLM consensus voting.
Combines multiple AI models for robust decision-making.
Advanced risk management and transparent operations.`,"architecture.txt":`System Architecture:
- Data Layer: Market data, news, sentiment
- AI Engine: 9 LLM providers with consensus voting
- Execution Engine: Order management and portfolio tracking
- Web UI: Real-time monitoring and configuration`,"consensus.py":`# 9-LLM Consensus Algorithm
def calculate_consensus(votes):
    # Weight by confidence and accuracy
    # Require 67% supermajority
    # Return aggregated decision`,"risk.py":`# Risk Management System
class RiskManager:
    def assess_trade(self, trade):
        # Position sizing
        # Portfolio correlation
        # Stop-loss levels
        return risk_score`,"config.json":`{
  "llm_providers": 9,
  "consensus_threshold": 0.67,
  "max_position_size": 0.1,
  "stop_loss": 0.02
}`},this.directories=["features","technology","performance","documentation","download"]}init(){this.input&&(this.setupEventListeners(),this.displayWelcome())}setupEventListeners(){this.input.addEventListener("keydown",this.handleKeyDown.bind(this)),this.input.addEventListener("focus",this.showCursor.bind(this)),this.input.addEventListener("blur",this.hideCursor.bind(this))}handleKeyDown(t){if(this.isProcessing){t.preventDefault();return}switch(t.key){case"Enter":t.preventDefault(),this.executeCommand(this.input.value.trim());break;case"ArrowUp":t.preventDefault(),this.navigateHistory(-1);break;case"ArrowDown":t.preventDefault(),this.navigateHistory(1);break;case"Tab":t.preventDefault(),this.autoComplete();break;case"l":t.ctrlKey&&(t.preventDefault(),this.clear());break}}async executeCommand(t){if(!t){this.addOutput(""),this.showPrompt();return}this.history.unshift(t),this.historyIndex=-1,this.addOutput(`user@berrybot:${this.currentDirectory}$ ${t}`,"command");const[e,...i]=t.split(" ");this.isProcessing=!0,this.hideCursor(),this.commands[e.toLowerCase()]?await this.commands[e.toLowerCase()](i):(this.addOutput(`bash: ${e}: command not found`,"error"),this.addOutput('Type "help" for available commands')),this.isProcessing=!1,this.showPrompt(),this.input.value="",this.showCursor()}addOutput(t,e=""){const i=document.createElement("div");i.className=`terminal-line ${e}`,i.textContent=t,this.output.appendChild(i),this.scrollToBottom()}addOutputHTML(t,e=""){const i=document.createElement("div");i.className=`terminal-line ${e}`,i.innerHTML=t,this.output.appendChild(i),this.scrollToBottom()}showPrompt(){this.addOutput(""),this.input.focus()}scrollToBottom(){const t=this.output.closest(".terminal-body");t&&(t.scrollTop=t.scrollHeight)}showCursor(){this.cursor&&(this.cursor.style.display="inline")}hideCursor(){this.cursor&&(this.cursor.style.display="none")}navigateHistory(t){this.history.length!==0&&(this.historyIndex+=t,this.historyIndex<-1?(this.historyIndex=-1,this.input.value=""):this.historyIndex>=this.history.length&&(this.historyIndex=this.history.length-1),this.historyIndex>=0?this.input.value=this.history[this.historyIndex]:this.input.value="")}autoComplete(){const t=this.input.value.toLowerCase(),e=Object.keys(this.commands).filter(i=>i.startsWith(t));e.length===1?this.input.value=e[0]:e.length>1&&this.addOutput(`Available commands: ${e.join(", ")}`)}focus(){this.input&&this.input.focus()}displayWelcome(){this.addOutput("BerryBot MK3 Terminal v3.14.159"),this.addOutput('Type "help" for available commands'),this.addOutput("")}showHelp(){this.addOutput("BerryBot MK3 Educational Terminal"),this.addOutput("================================="),this.addOutput(""),this.addOutput("Learning Commands:"),this.addOutput("explain <topic>  - Explain core concepts"),this.addOutput("architecture     - Show system architecture"),this.addOutput("consensus        - Learn about 9-LLM voting"),this.addOutput("risk             - Understand risk management"),this.addOutput("llm <provider>   - Learn about LLM providers"),this.addOutput("about            - About BerryBot MK3"),this.addOutput("learn            - Learning resources"),this.addOutput(""),this.addOutput("System Commands:"),this.addOutput("help             - Show this help message"),this.addOutput("clear            - Clear terminal screen"),this.addOutput("ls               - List files"),this.addOutput("cat <file>       - Display file contents"),this.addOutput("config           - Show configuration"),this.addOutput("whoami           - Current user"),this.addOutput("echo <text>      - Display text"),this.addOutput(""),this.addOutput("Try: explain consensus, architecture, or cat overview.md")}clear(){this.output.innerHTML=""}async showStatus(){this.addOutput("BerryBot MK3 System Status"),this.addOutput("=========================="),await this.typeSlowly("[✓] Trading Engine: ONLINE"),await this.typeSlowly("[✓] AI Providers: 9/9 CONNECTED"),await this.typeSlowly("[✓] Risk Manager: ACTIVE"),await this.typeSlowly("[✓] Market Data: STREAMING"),await this.typeSlowly("[>] Mode: PAPER TRADING")}async showStats(){this.addOutput("Trading Statistics"),this.addOutput("=================="),await this.typeSlowly("Portfolio Value:    $20,340.22"),await this.typeSlowly("Unrealized P&L:     +$10,340.22 (+103.40%)"),await this.typeSlowly("Total Trades:       88"),await this.typeSlowly("Win Rate:           67.3%"),await this.typeSlowly("Avg Trade Duration: 6.9 minutes"),await this.typeSlowly("LLM Accuracy:       85.2%"),await this.typeSlowly("Uptime:             99.8%")}async runDemo(t){const e=t.includes("--mode=live")?"live":"paper",i=t.includes("--confirm");if(e==="live"&&!i){this.addOutput("WARNING: Live trading mode detected!"),this.addOutput("Use --confirm flag to proceed with real trading");return}this.addOutput(`Starting ${e} trading demo...`),await this.delay(1e3),this.addOutput("Initializing LLM consensus voting..."),await this.typeSlowly("├─ OpenAI GPT-4:     ANALYZING"),await this.typeSlowly("├─ Anthropic Claude: ANALYZING"),await this.typeSlowly("├─ Google Gemini:    ANALYZING"),await this.typeSlowly("└─ Consensus:        BUY (8/9 votes)"),await this.delay(500),this.addOutput(""),this.addOutput("Demo trade executed successfully!"),this.addOutput(`Mode: ${e.toUpperCase()} TRADING`)}showConfig(){this.addOutput("BerryBot MK3 Configuration"),this.addOutput("==========================="),this.addOutput("LLM Providers:     9 connected"),this.addOutput("Trading Mode:      Paper Trading"),this.addOutput("Risk Level:        Conservative"),this.addOutput("Max Daily Trades:  10"),this.addOutput("Stop Loss:         2.0%"),this.addOutput("Portfolio Size:    $10,000"),this.addOutput("Update Interval:   5 seconds")}listDirectory(){this.addOutput("total 8"),this.addOutput("drwxr-xr-x  2 user user 4096 Jul 26 17:47 features/"),this.addOutput("drwxr-xr-x  2 user user 4096 Jul 26 17:47 technology/"),this.addOutput("drwxr-xr-x  2 user user 4096 Jul 26 17:47 performance/"),this.addOutput("drwxr-xr-x  2 user user 4096 Jul 26 17:47 documentation/"),this.addOutput("-rw-r--r--  1 user user  256 Jul 26 17:47 features.txt"),this.addOutput("-rw-r--r--  1 user user  128 Jul 26 17:47 README.md"),this.addOutput("-rw-r--r--  1 user user   64 Jul 26 17:47 config.json")}changeDirectory(t){const e=t[0];if(!e){this.addOutput("cd: missing directory operand");return}e===".."?(this.currentDirectory="~",this.addOutput(`Changed to: ${this.currentDirectory}`)):this.directories.includes(e)?(this.currentDirectory=`~/${e}`,this.addOutput(`Changed to: ${this.currentDirectory}`)):this.addOutput(`cd: ${e}: No such file or directory`)}downloadFile(t){const e=t[0];if(!e){this.addOutput("wget: missing URL operand");return}this.addOutput(`--2025-07-26 21:12:00--  ${e}`),this.addOutput("Resolving berrybot.ai... 192.168.1.100"),this.addOutput("Connecting to berrybot.ai... connected."),this.addOutput("HTTP request sent, awaiting response... 200 OK"),this.addOutput("Length: 2048 (2.0K) [application/octet-stream]"),this.addOutput(`Saving to: '${e}'`),this.addOutput(""),this.addOutput(`${e}       100%[===================>]   2.00K  --.-KB/s    in 0s`),this.addOutput(""),this.addOutput(`2025-07-26 21:12:00 (15.2 MB/s) - '${e}' saved [2048/2048]`)}displayFile(t){const e=t[0];if(!e){this.addOutput("cat: missing file operand");return}this.files[e]?this.addOutput(this.files[e]):this.addOutput(`cat: ${e}: No such file or directory`)}berryBotCommand(t){switch(t[0]){case"start":this.addOutput("🚀 BerryBot MK3 initialized successfully!"),this.addOutput("📊 Web UI: http://localhost:8501"),this.addOutput("📈 Trading engine: Active");break;case"status":this.showStatus();break;case"config":this.showConfig();break;default:this.addOutput("BerryBot MK3 Commands:"),this.addOutput("berrybot start   - Start trading engine"),this.addOutput("berrybot status  - Show system status"),this.addOutput("berrybot config  - Show configuration")}}echo(t){this.addOutput(t.join(" "))}whoami(){this.addOutput("user")}uptime(){this.addOutput("17:47:38 up 42 days, 13:24, 1 user, load average: 0.15, 0.09, 0.05")}showProcesses(){this.addOutput("  PID TTY          TIME CMD"),this.addOutput(" 1234 pts/0    00:00:01 berrybot-mk3"),this.addOutput(" 1235 pts/0    00:00:00 consensus-engine"),this.addOutput(" 1236 pts/0    00:00:00 risk-manager"),this.addOutput(" 1237 pts/0    00:00:00 bash")}showTopProcesses(){this.addOutput("PID  USER     CPU% MEM%    TIME+ COMMAND"),this.addOutput("1234 user     15.2  8.4   0:42.38 berrybot-mk3"),this.addOutput("1235 user      5.1  4.2   0:12.15 consensus-engine"),this.addOutput("1236 user      2.8  2.1   0:05.32 risk-manager")}neofetch(){this.addOutput("                    user@berrybot"),this.addOutput("                    -------------"),this.addOutput("        .-.         OS: BerryBot OS 3.14.159"),this.addOutput("       (o o)        Host: BerryBot MK3"),this.addOutput("        | |         Kernel: 5.15.0-berrybot"),this.addOutput("       (   )        Uptime: 42 days, 13 hours, 24 mins"),this.addOutput("      ^^^|^^^       Packages: 2847 (apt)"),this.addOutput("                    Shell: bash 5.1.16"),this.addOutput("                    CPU: ARM Cortex-A78 (4) @ 2.4GHz"),this.addOutput("                    Memory: 2.1GiB / 8.0GiB")}async matrixEasterEgg(){this.addOutput("Welcome to the Matrix...");const t="01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";for(let e=0;e<10;e++){let i="";for(let s=0;s<50;s++)i+=t[Math.floor(Math.random()*t.length)];this.addOutput(i,"matrix"),await this.delay(100)}this.addOutput("You take the red pill...")}exit(){this.addOutput("logout"),this.addOutput(""),this.addOutput("Connection closed."),this.input.disabled=!0}explainConcept(t){var i;switch((i=t[0])==null?void 0:i.toLowerCase()){case"consensus":this.explainConsensus();break;case"llm":this.explainLLM(t.slice(1));break;case"risk":this.explainRisk();break;case"architecture":this.showArchitecture();break;default:this.addOutput("Available topics: consensus, llm, risk, architecture"),this.addOutput("Usage: explain <topic>")}}showArchitecture(){this.addOutput("BerryBot MK3 System Architecture"),this.addOutput("================================"),this.addOutput(""),this.addOutput("┌─────────────────────────────────────────┐"),this.addOutput("│              Data Layer                 │"),this.addOutput("│  • Market Data  • News  • Sentiment    │"),this.addOutput("└─────────────┬───────────────────────────┘"),this.addOutput("              │"),this.addOutput("┌─────────────▼───────────────────────────┐"),this.addOutput("│             AI Engine                   │"),this.addOutput("│  • 9 LLM Providers  • Consensus Logic  │"),this.addOutput("└─────────────┬───────────────────────────┘"),this.addOutput("              │"),this.addOutput("┌─────────────▼───────────────────────────┐"),this.addOutput("│          Execution Engine               │"),this.addOutput("│  • Risk Manager  • Order Management    │"),this.addOutput("└─────────────────────────────────────────┘"),this.addOutput(""),this.addOutput("Each layer operates independently with clear interfaces.")}explainConsensus(){this.addOutput("9-LLM Consensus Voting System"),this.addOutput("============================="),this.addOutput(""),this.addOutput("How it works:"),this.addOutput("1. Market data sent to 9 different LLM providers"),this.addOutput("2. Each LLM analyzes and provides:"),this.addOutput("   • Trade recommendation (BUY/SELL/HOLD)"),this.addOutput("   • Confidence score (0-100%)"),this.addOutput("   • Reasoning explanation"),this.addOutput("3. Votes weighted by confidence & historical accuracy"),this.addOutput("4. Requires 67% supermajority for execution"),this.addOutput(""),this.addOutput("Benefits:"),this.addOutput("• Reduces individual AI bias"),this.addOutput("• Improves decision robustness"),this.addOutput("• Provides explainable decisions"),this.addOutput(""),this.addOutput("Try: cat consensus.py")}explainRisk(){this.addOutput("Advanced Risk Management System"),this.addOutput("==============================="),this.addOutput(""),this.addOutput("Three-Layer Protection:"),this.addOutput(""),this.addOutput("1. Pre-Trade Analysis:"),this.addOutput("   • Position sizing based on volatility"),this.addOutput("   • Portfolio correlation checks"),this.addOutput("   • Market condition assessment"),this.addOutput(""),this.addOutput("2. Real-Time Monitoring:"),this.addOutput("   • Automatic stop-loss execution"),this.addOutput("   • Portfolio exposure limits"),this.addOutput("   • Drawdown protection"),this.addOutput(""),this.addOutput("3. Post-Trade Analysis:"),this.addOutput("   • Performance attribution"),this.addOutput("   • Risk-adjusted returns"),this.addOutput("   • Continuous learning feedback"),this.addOutput(""),this.addOutput("Key Metrics: VaR, Sharpe Ratio, Max Drawdown")}explainLLM(t){var i;const e=(i=t[0])==null?void 0:i.toLowerCase();if(this.addOutput("LLM Provider Ecosystem"),this.addOutput("======================"),this.addOutput(""),!e){this.addOutput("Available providers:"),this.addOutput("• openai    - GPT-4 models"),this.addOutput("• anthropic - Claude models"),this.addOutput("• google    - Gemini models"),this.addOutput("• ollama    - Local models"),this.addOutput(""),this.addOutput("Usage: llm <provider>");return}switch(e){case"openai":this.addOutput("OpenAI GPT-4:"),this.addOutput("• Strength: General reasoning and market analysis"),this.addOutput("• Use case: Complex pattern recognition"),this.addOutput("• Integration: API-based, high reliability");break;case"anthropic":this.addOutput("Anthropic Claude:"),this.addOutput("• Strength: Risk assessment and ethical reasoning"),this.addOutput("• Use case: Conservative decision making"),this.addOutput("• Integration: API-based, safety-focused");break;case"google":this.addOutput("Google Gemini:"),this.addOutput("• Strength: Multi-modal analysis"),this.addOutput("• Use case: Chart analysis and data integration"),this.addOutput("• Integration: API-based, fast processing");break;case"ollama":this.addOutput("Local Ollama Models:"),this.addOutput("• Strength: Privacy and low latency"),this.addOutput("• Use case: Specialized fine-tuned models"),this.addOutput("• Integration: Self-hosted, customizable");break;default:this.addOutput(`Unknown provider: ${e}`),this.addOutput("Available: openai, anthropic, google, ollama")}}aboutBot(){this.addOutput("About BerryBot MK3"),this.addOutput("=================="),this.addOutput(""),this.addOutput("BerryBot MK3 represents the next evolution in"),this.addOutput("AI-powered trading technology. Unlike traditional"),this.addOutput("algorithmic trading systems that rely on fixed"),this.addOutput("rules or single AI models, BerryBot leverages"),this.addOutput("the collective intelligence of 9 different"),this.addOutput("Large Language Models."),this.addOutput(""),this.addOutput("Key Innovation: Consensus Voting"),this.addOutput("• Reduces single-model bias"),this.addOutput("• Improves decision accuracy"),this.addOutput("• Provides transparent reasoning"),this.addOutput(""),this.addOutput("Built for professional traders who need:"),this.addOutput("• Explainable AI decisions"),this.addOutput("• Advanced risk management"),this.addOutput("• Scalable architecture")}learnMore(){this.addOutput("Learning Resources"),this.addOutput("=================="),this.addOutput(""),this.addOutput("Navigate the website sections:"),this.addOutput("• Overview: Core concepts and philosophy"),this.addOutput("• Architecture: System design and components"),this.addOutput("• Consensus: 9-LLM voting mechanism"),this.addOutput("• Risk Management: Multi-layer protection"),this.addOutput("• Implementation: Technical details and setup"),this.addOutput(""),this.addOutput("Terminal Commands to Try:"),this.addOutput("• cat overview.md"),this.addOutput("• architecture"),this.addOutput("• consensus"),this.addOutput("• risk"),this.addOutput("• llm openai"),this.addOutput(""),this.addOutput("Use the navigation menu above to explore!")}async typeSlowly(t,e=50){const i=document.createElement("div");i.className="terminal-line",this.output.appendChild(i);for(let s=0;s<t.length;s++)i.textContent+=t[s],this.scrollToBottom(),await this.delay(e)}delay(t){return new Promise(e=>setTimeout(e,t))}}class E{constructor(){this.logoElement=document.getElementById("ascii-logo"),this.isMobileMode=window.innerWidth<768,this.fullLogo=`
_|_|_|                                            _|_|_|                _|           _|_|_|    _| 
_|    _|    _|_|    _|  _|_|  _|  _|_|  _|    _|  _|    _|    _|_|    _|_|_|_|       _|    _|     
_|_|_|    _|_|_|_|  _|_|      _|_|      _|    _|  _|_|_|    _|    _|    _|           _|_|_|    _| 
_|    _|  _|        _|        _|        _|    _|  _|    _|  _|    _|    _|           _|        _| 
_|_|_|      _|_|_|  _|        _|          _|_|_|  _|_|_|      _|_|        _|_|       _|        _| 
                                              _|                                                  
                                          _|_|                                                     
                                        MK3 - Teaching AI Greed`,this.mobileLogo=`
_|_|_|                                   
_|    _|    _|_|    _|  _|_|  _|  _|_|   
_|_|_|    _|_|_|_|  _|_|      _|_|       
_|    _|  _|        _|        _|         
_|_|_|      _|_|_|  _|        _|         

_|_|_|                _|           _|_|_|    _| 
_|    _|    _|_|    _|_|_|_|       _|    _|     
_|_|_|    _|    _|    _|           _|_|_|    _| 
_|    _|  _|    _|    _|           _|        _| 
_|_|_|      _|_|        _|_|       _|        _| 
          MK3 - Teaching AI Greed`,this.bitcoinSymbol=`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣴⣶⣶⣶⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣀⣤⣾⣿⡿⠿⠛⠛⠛⠛⠛⠛⠻⢿⣿⣿⣦⣄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⣼⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⣿⣷⣄⠀⠀⠀⠀
⠀⠀⠀⣰⣿⡿⠋⠀⠀⠀⠀⠀⣿⡇⠀⢸⣿⡇⠀⠀⠀⠀⠀⠈⢿⣿⣦⡀⠀⠀
⠀⠀⣸⣿⡿⠀⠀⠀⠸⠿⣿⣿⣿⡿⠿⠿⣿⣿⣿⣶⣄⠀⠀⠀⠀⢹⣿⣷⠀⠀
⠀⢠⣿⡿⠁⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠈⣿⣿⣿⠀⠀⠀⠀⠀⢹⣿⣧⠀
⠀⣾⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⢀⣠⣿⣿⠟⠀⠀⠀⠀⠀⠈⣿⣿⠀
⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⣿⡿⠿⠿⠿⣿⣿⣥⣄⠀⠀⠀⠀⠀⠀⣿⣿⠀
⠀⢿⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⢻⣿⣿⣧⠀⠀⠀⠀⢀⣿⣿⠀
⠀⠘⣿⣷⡀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⣼⣿⣿⡿⠀⠀⠀⠀⣸⣿⡟⠀
⠀⠀⢹⣿⣷⡀⠀⠀⢰⣶⣿⣿⣿⣷⣶⣶⣾⣿⣿⠿⠛⠁⠀⠀⠀⣸⣿⡿⠀⠀
⠀⠀⠀⠹⣿⣷⣄⠀⠀⠀⠀⠀⣿⡇⠀⢸⣿⡇⠀⠀⠀⠀⠀⢀⣾⣿⠟⠁⠀⠀
⠀⠀⠀⠀⠘⢻⣿⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⡿⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠛⢿⣿⣷⣶⣤⣤⣤⣤⣤⣤⣴⣾⣿⣿⠟⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠻⠿⠿⠿⠿⠟⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀

                      ₿ BITCOIN ₿                      
                  << DIGITAL GOLD FOUND >>`,this.ethereumSymbol=`
⠀⠀⠀⠀⠀⠀⠀⠀⢠⠃⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠠⠃⠀⣿⣿⢆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡐⠁⠀⠀⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡔⠀⠀⠀⠀⣿⣿⣿⣷⣷⡀⠀⠀⠀⠀
⠀⠀⠀⢀⠌⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀
⠀⠀⢀⠊⠀⠀⠀⠀⢀⣠⣿⣿⣿⣿⣿⣿⣗⡀⠀⠀
⠀⢠⠁⠀⣀⣤⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀
⢰⡥⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆
⠰⡢⢙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣋⡥⡆
⠀⠐⢄⠁⠂⢍⠛⢿⣿⣿⣿⣿⡿⠛⣉⣰⣼⣿⠋⠀
⠀⠀⠀⢢⡀⠀⠈⠐⠌⡙⢛⢡⣶⣷⣿⣿⡿⠁⠀⠀
⠀⠀⠀⠀⠑⣀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⢂⠀⠀⠀⣿⣿⣿⡯⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠱⡀⠀⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⢄⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀

                      ♦ ETHEREUM ♦                      
                  << SMART CONTRACTS ACTIVE >>`,this.rocketSymbol=`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣠⣤⣲⣶⣤⣿⣾⣿⣿⣿⣿⣿⣿⣿⣾⣾⣵⣶⣲⣤⢤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣄⣶⣾⣿⣿⣿⣿⡿⠿⠛⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠛⠛⠛⠻⠿⣿⣿⣿⣿⣽⣴⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣷⣿⡿⠿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠻⢿⣿⣿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣧⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣽⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣟⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣞⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⡆⠀⠀⠀⠀⣿⣿⠀⠀⠀⢀⣾⣶⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⡽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⢉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣷⣶⣶⣶⣶⣿⣿⠀⠀⠀⠀⣴⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡟⠛⠛⠛⠛⣿⣿⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣽⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡿⠃⠀⠀⠀⠀⢿⡿⠀⠀⠀⠀⢿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⡿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⡻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⡷⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣿⣷⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠻⡿⣿⣿⣷⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣴⣶⣿⣿⣿⡿⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠻⠿⢿⣿⣿⣿⣿⣶⣶⣶⣶⣦⡀⠀⠀⠀⠀⣴⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⠿⠟⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠻⠟⠛⠻⣿⣿⣷⠀⠀⡀⣰⣿⣿⠟⠿⠟⠝⠛⠉⠑⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢺⣿⣿⡆⠀⣰⣿⣿⡽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⣴⣿⣿⡏⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣻⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠃⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣄⣴⣄⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣾⣾⣿⣿⣿⣿⡦⡀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⠿⢿⣿⣿⡷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣜⣿⣿⠟⠁⠄⡙⢿⣿⣿⢄⠀⠀⠀⠀⠀⠀⣴⣿⣿⠟⡁⠄⠂⡙⢿⣿⣞⣄⢀⣀⡤⢠⣤⣴⣠⣶⣶⣴⣶⣾⣷⣷⣶⣶⣶⣂⣦⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⠏⡈⠐⠠⠐⠠⠿⣿⣯⣧⣤⣤⣤⣤⣼⣿⣿⠋⠄⡐⢈⠐⠠⢈⢻⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠛⢻⣿⣿⣿⣿⣿⣿⣿⣯⣶⡤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣽⣿⡏⠐⠠⢁⠂⡁⢂⠐⣹⣿⣿⣿⣿⣿⣿⣿⣿⡇⡈⠐⡀⠂⠌⡐⢀⠂⢛⠛⡛⢉⠉⠄⠠⠹⣿⣿⣿⣿⣿⣿⠃⡈⠼⣿⣿⣿⣿⣿⣿⡟⠻⢿⣿⣷⣷⣢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⣀⣀⠀⠀⠀⠀⠀⢠⣿⣿⡟⡠⢁⠂⠄⠂⠌⡁⠌⡘⢿⡿⠛⢿⡿⠛⢿⡿⠃⠄⠡⢀⠁⢂⠉⠄⡈⠄⢂⠐⠠⠈⢄⠁⡂⣌⣛⡛⠛⠋⠠⠐⡀⢂⠘⠻⠿⠿⠿⠋⢀⠂⠄⡈⠹⢿⣿⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⢄⣤⣀⠀⠀⠀
⣴⣯⣴⣬⣵⣿⣿⣶⣶⣯⣿⣿⠁⠔⠠⠈⠄⡁⠂⠔⠠⠐⠠⠐⡈⣤⡄⠡⠀⠄⡈⠄⡁⣂⠌⠠⢈⠐⠠⠈⢄⣬⣶⣿⣿⣿⣿⣿⣿⣿⠇⡈⠄⡁⠢⢐⠨⠐⠄⢂⠐⡈⠄⡈⠔⠠⢁⠂⠌⣻⣿⣿⡧⡀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣾⣢⠀
⠙⠿⠿⣿⡿⢿⣿⣿⣿⣿⣿⠇⡌⠠⠁⠌⣶⣿⣿⣮⠐⡁⢂⠡⢰⣿⣿⠂⡁⢂⠐⢠⣿⣿⣿⣧⠂⠌⡀⠃⠜⢿⠟⠛⢉⠡⢁⠠⠀⠄⢂⠐⠠⢀⠡⠂⠤⠡⠌⡀⠆⠰⠠⠐⡈⠔⠂⠌⡐⢀⠙⣿⣿⣿⠄⠀⠀⠀⠀⠀⠀⡠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣷
⢀⣤⣌⣾⣿⣿⣿⣵⣿⣿⡿⠀⠄⠡⢈⡐⢿⣿⣿⡿⠁⡐⢰⣿⣿⣿⣿⣿⣿⡆⠈⠌⢿⣿⣿⠟⢀⠂⠄⠡⢨⣶⣶⣿⣶⣶⣶⣶⣷⣮⡄⡈⠐⡀⢂⠑⠂⢃⠒⠐⢊⠐⡁⠒⡐⢈⠐⡈⡐⢀⠂⠌⢿⣿⣟⣆⠀⠀⠀⢀⣴⣿⣿⡟⠉⠻⣿⣿⣿⣿⣿⡿
⢺⣿⣿⡿⣿⣿⣿⣿⣿⣿⠇⡈⠄⡁⠂⡄⠂⠄⠠⠐⠠⢀⠡⢉⠩⢉⠉⢋⠁⢂⠡⠈⠄⠠⠀⠌⠠⠈⡄⠁⠆⠙⢋⠛⠙⠛⠛⠛⠛⢛⠃⠄⠡⢀⠡⣈⠡⣈⢈⠡⡈⢄⠡⡁⢌⡈⢄⡁⢌⠠⡈⠐⡈⢿⣿⣟⣄⣰⣶⣿⣿⣿⣿⣤⢈⠐⣀⢙⣿⣿⣷⠃
⠀⠉⠉⠀⠀⠀⢈⣽⣿⡿⢈⠐⠠⢀⠡⠄⠡⠈⠄⡁⢂⠰⢀⠂⡐⠠⠈⠄⡈⠄⢂⠡⠈⠄⠡⠈⠄⠡⠄⠩⠄⠃⠄⢂⠡⠈⠄⠃⠌⢠⠈⠄⠡⠂⠔⠠⠐⠄⠢⠐⠄⠢⠐⠄⠢⠄⠢⠄⠢⠠⠁⠆⡐⠘⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣦⣠⣾⣿⣿⠃⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠆⡈⠐⡀⠒⡈⠒⠑⢂⠒⠐⢂⠂⠒⡀⢃⠘⡀⢂⠘⡀⢂⠃⡘⠂⢃⠘⢂⠊⡐⢈⠂⡘⢀⠂⠡⢈⠂⠌⡀⠂⠌⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⢂⠁⢂⠑⡀⢃⠒⠠⠁⢿⣿⣿⣿⠁⢂⠙⢿⣿⣿⣿⣿⣿⣿⠗⠁⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣿⣿⠇⠂⠄⠡⡀⢡⠁⡉⢌⠠⡁⡉⠄⡉⢄⠡⡁⢌⠠⡁⢡⠈⡄⠡⢈⠌⡠⢉⠠⡁⢌⠠⡁⢉⡈⠡⢉⡈⡁⣉⢈⠡⡉⢠⠁⡌⢠⠁⡌⢠⠁⡌⢠⠁⡌⢐⠈⡌⢠⠁⢌⠠⢈⠡⢈⢸⣿⣿⣿⡇⠂⠌⣀⣽⣿⣿⣿⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡿⣿⣿⠀⠃⠌⡐⠠⠂⠔⠠⠂⠔⠠⠐⠰⢀⠢⠐⠄⠢⠐⠄⠂⠔⠠⢁⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠠⢁⠂⡐⠄⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠠⠂⠌⠠⠂⠄⡡⢈⠸⣿⣿⣿⣿⣶⣿⣿⣿⡿⠛⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣧⣿⣿⠈⡐⢠⠀⡑⠌⢂⠡⠘⡀⢃⢉⠐⢂⡐⢁⠊⠄⡑⢈⠡⠘⠠⡁⢂⢁⠊⡐⢁⠊⡐⢁⠊⡐⢁⠂⡘⠠⢈⠂⡑⢈⠂⡑⢈⠂⡑⢈⠂⡑⢈⠂⡑⠈⡄⠃⠌⠡⠘⡈⠡⢈⠐⡐⠠⢌⣿⣿⣿⣿⡻⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣣⣿⣿⠐⡀⢂⠐⠠⡁⢂⠡⠌⡐⠤⠈⠤⠁⠄⢂⠡⠌⡐⠠⠡⢈⠡⠐⡈⠄⢂⠡⢂⠡⠈⠄⡂⠡⢂⠡⠄⠡⢂⠡⠐⠄⡡⠐⠠⡁⠌⠠⡁⠌⡀⠆⣈⠡⠠⠡⢈⡁⠆⡁⢂⠁⠂⠄⠡⢸⣿⣿⣏⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣿⣿⡆⠐⠠⢈⠐⡁⢂⠂⠒⡀⢂⠑⡀⢃⠘⡀⢂⠒⡀⢃⠒⡀⢂⠑⡐⢈⠂⡐⠂⢂⠑⢂⠐⡁⢂⠂⡘⠐⢂⠂⡑⠂⠄⢃⠒⠐⡈⠒⡀⠒⡐⢂⠐⡀⢃⠒⠠⠐⢂⠐⡀⠊⠄⡁⠂⣽⣿⣿⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⣿⣿⡇⠌⡐⠠⠈⠄⡃⣈⠡⢈⠄⡡⢈⠄⡡⢈⠄⡡⢈⠄⣂⠡⣈⠐⡈⢄⠡⣈⠡⡈⢌⠠⡁⢌⠠⡁⢌⡈⠄⡡⢈⠌⡈⢄⡈⢡⢈⠁⡌⢁⠄⡡⢈⠄⡡⢈⡁⢡⢈⠐⠠⢁⠂⠄⢡⣿⣿⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⡄⠠⠁⠌⠠⠡⠄⠢⠄⠆⠰⠀⠆⠰⠀⠆⠰⠀⠆⠤⠐⡀⠆⠰⠀⠆⠤⠐⠄⠢⠐⠄⠢⠐⠄⠢⠀⠆⠰⠀⠆⠰⠠⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠂⠌⡐⠄⡈⠐⣸⣿⣟⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣧⠡⠈⠄⡁⢂⠘⡐⢂⠊⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⠒⠐⡈⠒⢁⠊⡐⢈⠂⡑⢈⠂⡑⢈⠂⡑⢈⠂⡑⢈⠂⡑⠂⡑⠊⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⢂⠐⠠⢀⢱⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣷⡁⢂⠐⠠⢈⠐⠠⡁⢌⠠⡁⣌⠠⡁⣌⠠⡁⢌⡈⢡⢈⢡⠈⡄⣉⠠⡁⢌⠠⡁⣌⠠⡁⣌⠠⡁⡌⢠⡁⢌⡁⡄⡡⢈⠄⡡⣈⠄⡡⣈⠄⡡⢈⠄⢂⠡⠀⠌⡐⢠⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣄⠌⡐⠠⢈⠐⡀⢂⠡⠐⠠⠐⢠⠠⠐⠄⢂⠰⢀⠢⠀⠆⡐⢀⠂⠔⠠⠂⠔⠠⠐⠠⠠⠐⠄⠰⠀⠄⠂⠤⠐⡀⠆⡐⠄⠠⢂⠐⠠⠐⣀⠂⠌⡀⢂⠁⢂⣰⣿⣿⡗⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣷⣤⠁⠌⡐⢀⠂⠄⡁⢂⠁⡂⠄⠡⠈⠄⠂⠄⢂⠁⢂⡐⢠⠈⡂⠡⠈⠄⠡⢈⠂⢡⠈⠄⡡⠘⠠⢁⠂⠡⠐⡐⠠⡈⢐⠀⡊⠄⠡⢀⠂⡐⢀⠂⢌⣴⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⣿⣿⣿⣦⡔⢂⠈⣐⣀⣆⣐⣠⣈⣄⣡⣈⣐⠈⠄⡈⣄⣐⣀⣂⣄⣡⣈⣄⣁⣂⣌⣀⣂⣐⣠⣁⣂⠄⡈⠄⣡⣀⣡⣐⣀⣂⣐⣈⣐⣀⠂⡐⣠⣾⣿⣿⡻⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⠀⢂⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡗⢠⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⡐⠸⣿⣿⢿⢿⣿⣿⣿⣿⣿⣿⡇⢠⢹⣿⣿⡍⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣜⣴⣿⣿⡞⠈⠉⠉⠚⠛⣿⣿⣧⣒⣼⣿⣟⠏⠉⠈⠁⠈⠈⠁⠒⠉⠒⠓⠚⠚⣿⣿⣷⣌⣿⣿⣿⠟⠀⠀⠁⠁⢹⣿⣿⣧⣦⣾⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢻⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠘⠻⡿⢿⣟⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

                        🚀 TO THE MOON 🚀                      
                    << ROCKET FUEL IGNITED >>`,this.dividers={heavy:"═".repeat(68),light:"─".repeat(68),double:"▓".repeat(68),dots:"·".repeat(68)},this.statusIcons={online:"[✓]",warning:"[!]",error:"[✗]",processing:"[~]",ready:"[>]"},this.progressBars={full:"█".repeat(30),twoThirds:"█".repeat(20)+"░".repeat(10),half:"█".repeat(15)+"░".repeat(15),oneThird:"█".repeat(10)+"░".repeat(20),empty:"░".repeat(30)}}renderLogo(){if(!this.logoElement)return;const t=this.isMobileMode?this.mobileLogo:this.fullLogo;this.logoElement.textContent="",this.logoElement.className="",this.logoElement.style.cssText="",this.logoElement.classList.add("text-glow-lg"),this.logoElement.setAttribute("data-text",t),this.playLogoIntroAnimation(t),setTimeout(()=>{this.startPeriodicGlitches()},1e3)}async animateLogoAppearance(){if(!this.logoElement)return;const t=this.logoElement.textContent.split(`
`);this.logoElement.textContent="";for(let e=0;e<t.length;e++)await this.delay(100),this.logoElement.textContent+=t[e]+(e<t.length-1?`
`:"")}async playLogoIntroAnimation(t){if(!this.logoElement)return;console.log("Starting BerryBot logo intro animation"),this.logoElement.className="",this.logoElement.style.cssText="",this.logoElement.removeAttribute("data-text"),this.logoElement.style.fontFamily='"JetBrains Mono", "Source Code Pro", "Courier New", "Liberation Mono", "DejaVu Sans Mono", monospace',this.logoElement.style.fontSize="16px",this.logoElement.style.lineHeight="1",this.logoElement.style.whiteSpace="pre",this.logoElement.style.color="#FFB000",this.logoElement.style.textAlign="center",this.logoElement.style.letterSpacing="0",this.logoElement.style.fontWeight="normal",this.logoElement.style.textRendering="optimizeSpeed",await this.delay(300),this.logoElement.textContent="█",this.logoElement.classList.add("cursor-flicker"),await this.delay(200),this.logoElement.classList.remove("cursor-flicker"),this.logoElement.textContent="";const e=t.split(`
`);let i="";for(let s=0;s<e.length;s++){s>0&&(i+=`
`);for(let o=0;o<e[s].length;o++){if(i+=e[s][o],this.logoElement.textContent=i,Math.random()<.05){const a=i.slice(0,-1)+"▓";this.logoElement.textContent=a,this.logoElement.style.color="#ff0040",this.logoElement.classList.add("intro-missing-pixels"),await this.delay(20),this.logoElement.textContent=i,this.logoElement.style.color="#FFB000",this.logoElement.classList.remove("intro-missing-pixels")}else Math.random()<.02&&(this.logoElement.classList.add("intro-missing-pixels"),await this.delay(10),this.logoElement.classList.remove("intro-missing-pixels"));const n=Math.random()<.1?15+Math.random()*10:3+Math.random()*5;await this.delay(n)}await this.delay(20)}await this.delay(100),this.logoElement.classList.add("screen-tear"),this.logoElement.style.color="#00ffff",await this.delay(50),this.logoElement.classList.remove("screen-tear"),this.logoElement.style.color="#FFB000",this.logoElement.classList.add("text-glow-lg"),console.log("BerryBot logo intro animation complete!")}async directLogoDisplay(t){this.logoElement.className="",this.logoElement.style.cssText="",this.logoElement.removeAttribute("data-text"),this.logoElement.style.fontFamily='"JetBrains Mono", "Source Code Pro", "Courier New", "Liberation Mono", "DejaVu Sans Mono", monospace',this.logoElement.style.fontSize="16px",this.logoElement.style.lineHeight="1",this.logoElement.style.whiteSpace="pre",this.logoElement.style.color="#FFB000",this.logoElement.style.textAlign="center",this.logoElement.style.letterSpacing="0",this.logoElement.style.fontWeight="normal",this.logoElement.style.textRendering="optimizeSpeed",await this.delay(300),this.logoElement.textContent=t,console.log("Logo displayed directly"),await this.delay(500),this.logoElement.className="text-glow-lg",this.logoElement.style.fontFamily='"JetBrains Mono", "Source Code Pro", "Courier New", "Liberation Mono", "DejaVu Sans Mono", monospace'}shuffleArray(t){const e=[...t];for(let i=e.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[e[i],e[s]]=[e[s],e[i]]}return e}setMobileMode(t){this.isMobileMode=t,this.renderLogo()}glitchEffect(){if(!this.logoElement)return;const t=this.logoElement.textContent,e="░▒▓█▄▀▐▌│┤┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌";this.logoElement.classList.add("glitch");for(let i=0;i<5;i++)setTimeout(()=>{let s="";for(let o of t)o!==" "&&o!==`
`&&Math.random()<.08?s+=e[Math.floor(Math.random()*e.length)]:s+=o;this.logoElement.textContent=s,Math.random()<.3&&(this.logoElement.style.color=["#ff0040","#00ffff","#ffff00"][Math.floor(Math.random()*3)]),setTimeout(()=>{this.logoElement.textContent=t,this.logoElement.style.color=""},40+Math.random()*30)},i*80);setTimeout(()=>{this.logoElement.classList.remove("glitch")},800)}startPeriodicGlitches(){if(!this.logoElement)return;const t=()=>{const o=Math.random()*7e3+8e3;setTimeout(()=>{Math.random()<.8&&this.triggerRandomGlitch(),t()},o)},e=()=>{const o=Math.random()*2e3+2e3;setTimeout(()=>{Math.random()<.85&&this.triggerPassivePixelGlitch(),e()},o)},i=()=>{const o=Math.random()*2e3+1e3;setTimeout(()=>{Math.random()<.6&&this.triggerRandomArtifact(),i()},o)},s=()=>{setTimeout(()=>{this.triggerSmileGlitch(),s()},3e4)};t(),e(),i(),s()}triggerPassivePixelGlitch(){if(!this.logoElement||this.logoElement.textContent.includes("BITCOIN")||this.logoElement.textContent.includes("ETHEREUM")||this.logoElement.textContent.includes("TO THE MOON"))return;const e=Math.random();e<.3?(this.logoElement.classList.add("pixel-shift-subtle"),setTimeout(()=>{this.logoElement.classList.remove("pixel-shift-subtle")},150+Math.random()*100)):e<.6?(this.logoElement.classList.add("pixel-displacement-minor"),setTimeout(()=>{this.logoElement.classList.remove("pixel-displacement-minor")},200+Math.random()*150)):e<.85?(this.logoElement.classList.add("scanline-interference"),setTimeout(()=>{this.logoElement.classList.remove("scanline-interference")},300+Math.random()*200)):(this.logoElement.classList.add("chromatic-aberration-brief"),setTimeout(()=>{this.logoElement.classList.remove("chromatic-aberration-brief")},100+Math.random()*100))}triggerRandomArtifact(){if(!this.logoElement||this.logoElement.textContent.includes("BITCOIN")||this.logoElement.textContent.includes("ETHEREUM")||this.logoElement.textContent.includes("TO THE MOON"))return;const e=Math.random();if(e<.2){const i=["#ff0040","#00ffff","#ffff00","#ff8000","#8000ff"];this.logoElement.style.color=i[Math.floor(Math.random()*i.length)],setTimeout(()=>{this.logoElement.style.color="#FFB000"},50+Math.random()*100)}else if(e<.35)this.logoElement.classList.add("opacity-flicker"),setTimeout(()=>{this.logoElement.classList.remove("opacity-flicker")},100+Math.random()*200);else if(e<.5){const i=this.logoElement.textContent,s="▓▒░█▄▀▐▌│┤┐└┴┬├─┼╞╟╚╔╩╦╠═╬";let o="";for(let n of i)n!==" "&&n!==`
`&&Math.random()<.02?o+=s[Math.floor(Math.random()*s.length)]:o+=n;this.logoElement.textContent=o,setTimeout(()=>{this.logoElement.textContent=i},80+Math.random()*120)}else e<.65?(this.logoElement.classList.add("micro-displacement"),setTimeout(()=>{this.logoElement.classList.remove("micro-displacement")},120+Math.random()*80)):e<.8?(this.logoElement.classList.add("static-overlay"),setTimeout(()=>{this.logoElement.classList.remove("static-overlay")},60+Math.random()*90)):e<.9?(this.logoElement.classList.add("horizontal-line-glitch"),setTimeout(()=>{this.logoElement.classList.remove("horizontal-line-glitch")},150+Math.random()*100)):(this.logoElement.classList.add("brightness-flicker"),setTimeout(()=>{this.logoElement.classList.remove("brightness-flicker")},200+Math.random()*150))}triggerRandomGlitch(){if(!this.logoElement)return;if(this.logoElement.textContent.includes("BITCOIN")||this.logoElement.textContent.includes("ETHEREUM")||this.logoElement.textContent.includes("TO THE MOON")){this.applyCryptoGlitchEffects();return}const e=Math.random();if(e<.25)this.applyLogoGlitchEffects();else if(e<.35)this.logoElement.classList.add("text-corrupt"),setTimeout(()=>{this.logoElement.classList.remove("text-corrupt")},200+Math.random()*300);else if(e<.45){const i=this.logoElement.textContent,s=i.split(`
`),o=Math.floor(Math.random()*s.length);if(s[o]&&s[o].trim()){const n="▓▒░█▄▀▐▌";let a="";for(let l of s[o])l!==" "&&Math.random()<.15?a+=n[Math.floor(Math.random()*n.length)]:a+=l;s[o]=a,this.logoElement.textContent=s.join(`
`),setTimeout(()=>{this.logoElement.textContent=i},150+Math.random()*200)}}else e<.55?(this.logoElement.classList.add("screen-tear"),setTimeout(()=>{this.logoElement.classList.remove("screen-tear")},800+Math.random()*400)):e<.97?(this.logoElement.classList.add("missing-section"),setTimeout(()=>{this.logoElement.classList.remove("missing-section")},1200+Math.random()*600)):e<.995?(this.logoElement.classList.add("displaced-section"),setTimeout(()=>{this.logoElement.classList.remove("displaced-section")},600+Math.random()*300)):this.glitchEffect()}applyLogoGlitchEffects(){if(!this.logoElement)return;const t=this.logoElement.textContent,e=Math.random();if(e<.3)this.logoElement.classList.add("text-corrupt"),this.logoElement.style.color=["#ff0040","#00ffff","#ffff00"][Math.floor(Math.random()*3)],setTimeout(()=>{this.logoElement.classList.remove("text-corrupt"),this.logoElement.style.color=""},300+Math.random()*200);else if(e<.6){let i="";const s="▓▒░█▄▀▐▌│┤┐└┴┬├─┼";for(let o of t)o==="█"&&Math.random()<.1||(o==="╗"||o==="╔"||o==="╝"||o==="╚")&&Math.random()<.15?i+=s[Math.floor(Math.random()*s.length)]:i+=o;this.logoElement.textContent=i,this.logoElement.classList.add("screen-tear"),this.logoElement.style.color="#ff0040",setTimeout(()=>{this.logoElement.textContent=t,this.logoElement.classList.remove("screen-tear"),this.logoElement.style.color=""},400+Math.random()*300)}else this.logoElement.classList.add("missing-section","displaced-section"),this.logoElement.style.color="#00ffff",setTimeout(()=>{this.logoElement.classList.remove("missing-section","displaced-section"),this.logoElement.style.color=""},600+Math.random()*400)}applyCryptoGlitchEffects(){if(!this.logoElement)return;this.logoElement.textContent;const t=this.logoElement.style.color,e=Math.random();e<.4?(this.logoElement.classList.add("text-corrupt"),this.logoElement.style.color=["#ff0040","#00ff00","#0040ff"][Math.floor(Math.random()*3)],setTimeout(()=>{this.logoElement.classList.remove("text-corrupt"),this.logoElement.style.color=t},200+Math.random()*200)):e<.7?(this.logoElement.classList.add("screen-tear"),setTimeout(()=>{this.logoElement.classList.remove("screen-tear")},300+Math.random()*200)):(this.logoElement.classList.add("missing-section"),setTimeout(()=>{this.logoElement.classList.remove("missing-section")},400+Math.random()*300))}async triggerSmileGlitch(){if(!this.logoElement)return;console.log("Triggering smiley face glitch!");const t=this.logoElement.textContent,e=this.logoElement.style.color;this.logoElement.classList.add("glitch","text-corrupt"),await this.delay(200);for(let l=0;l<3;l++){let r="";const d="▓▒░█▄▀▐▌│┤┐└┴┬├─┼#@$%^&*!?";for(let u of t)u!==" "&&u!==`
`&&Math.random()<.3+l*.2?r+=d[Math.floor(Math.random()*d.length)]:r+=u;this.logoElement.textContent=r,this.logoElement.style.color=["#ff0040","#00ffff","#ffff00","#ff4000"][Math.floor(Math.random()*4)],await this.delay(150)}this.logoElement.textContent="",await this.delay(100);const i=[this.bitcoinSymbol,this.ethereumSymbol,this.rocketSymbol],s=["#f7931a","#627eea","#ff6b35"],o=Math.floor(Math.random()*i.length),n=i[o],a=s[o];this.logoElement.textContent=n,this.logoElement.style.color=a,this.logoElement.classList.add("screen-tear");for(let l=0;l<4;l++){await this.delay(200);let r="";const d="▓▒░█";for(let u of n)u==="█"&&Math.random()<.3?r+=d[Math.floor(Math.random()*d.length)]:r+=u;this.logoElement.textContent=r,this.logoElement.style.color=["#ff0040","#00ff00","#0040ff"][Math.floor(Math.random()*3)],await this.delay(100),this.logoElement.textContent=n,this.logoElement.style.color=a}await this.delay(800),this.logoElement.classList.remove("screen-tear"),this.logoElement.classList.add("displaced-section");for(let l=0;l<3;l++)this.logoElement.textContent="",await this.delay(50),this.logoElement.textContent=n,await this.delay(50);this.logoElement.textContent="",await this.delay(100),this.logoElement.textContent=t,this.logoElement.style.color="#00ffff",await this.delay(300),this.logoElement.classList.remove("glitch","text-corrupt","displaced-section"),this.logoElement.style.color=e,console.log("Smiley face glitch completed!")}createDivider(t="heavy",e=68){return({heavy:"═",light:"─",double:"▓",dots:"·"}[t]||"═").repeat(e)}createProgressBar(t,e=30){const i=Math.floor(t/100*e),s=e-i;return"█".repeat(i)+"░".repeat(s)}createStatusLine(t,e,i=""){return`${this.statusIcons[e]||"[?]"} ${t}${i?": "+i:""}`}createArchitectureDiagram(){return`
 ┌─────────────────────────────────────────────────────────────┐
 │                    BERRYBOT MK3 ARCHITECTURE                │
 ├─────────────────────────────────────────────────────────────┤
 │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
 │  │   LLM #1    │    │   LLM #2    │    │   LLM #3    │     │
 │  │ OpenAI GPT  │    │ Anthropic   │    │   Google    │     │
 │  └─────────────┘    └─────────────┘    └─────────────┘     │
 │           │                 │                 │             │
 │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
 │  │   LLM #4    │    │   LLM #5    │    │   LLM #6    │     │
 │  │   Custom    │    │    Local    │    │   Ollama    │     │
 │  └─────────────┘    └─────────────┘    └─────────────┘     │
 │           │                 │                 │             │
 │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
 │  │   LLM #7    │    │   LLM #8    │    │   LLM #9    │     │
 │  │  Gemma3:27B │    │  Claude-3   │    │ Custom API  │     │
 │  └─────────────┘    └─────────────┘    └─────────────┘     │
 │                              │                              │
 │                    ┌─────────────────┐                     │
 │                    │  CONSENSUS      │                     │
 │                    │  VOTING ENGINE  │                     │
 │                    └─────────────────┘                     │
 │                              │                              │
 │                    ┌─────────────────┐                     │
 │                    │  RISK MANAGER   │                     │
 │                    └─────────────────┘                     │
 │                              │                              │
 │                    ┌─────────────────┐                     │
 │                    │ TRADE EXECUTOR  │                     │
 │                    └─────────────────┘                     │
 └─────────────────────────────────────────────────────────────┘`}createVotingVisualization(t){let e=`RECENT VOTING RESULTS
`;return e+=this.createDivider("heavy")+`
`,t.forEach((i,s)=>{const o=i.decision==="BUY"?"↗":i.decision==="SELL"?"↘":"→",n=s===t.length-1?"└─":"├─";e+=`${n} ${i.model}: ${o} ${i.decision} (${i.confidence}% confidence)
`}),e}createSystemSpecsTable(){return`
┌─────────────────┬──────────────────┬─────────────────────────┐
│    Option       │    Complexity    │        Features         │
├─────────────────┼──────────────────┼─────────────────────────┤
│ Cloud VPS       │     Medium       │ 24/7 uptime, scalable  │
│ Raspberry Pi    │      Easy        │ Low power, affordable   │
│ Local Machine   │      Easy        │ Full control, testing   │
│ Docker          │     Medium       │ Portable, isolated     │
│ Kubernetes      │      Hard        │ Enterprise, redundant   │
└─────────────────┴──────────────────┴─────────────────────────┘`}delay(t){return new Promise(e=>setTimeout(e,t))}}class v{constructor(){this.statsElements={portfolio:document.querySelector(".stats-ticker .stat:nth-child(1) .value"),winRate:document.querySelector(".stats-ticker .stat:nth-child(2) .value"),uptime:document.querySelector(".stats-ticker .stat:nth-child(3) .value")},this.baseStats={portfolio:20340.22,winRate:67.3,uptime:99.8,trades:88,pnl:10340.22,avgDuration:6.9,llmAccuracy:85.2},this.isRunning=!1}init(){this.isRunning=!0,this.updateDisplayStats()}updateStats(){if(!this.isRunning)return;const t=this.generateVariations();if(this.statsElements.portfolio){const e=this.baseStats.portfolio+t.portfolio;this.statsElements.portfolio.textContent=`$${e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,t.portfolio>0?this.statsElements.portfolio.style.color="var(--terminal-green)":t.portfolio<0&&(this.statsElements.portfolio.style.color="var(--terminal-red)")}if(this.statsElements.winRate){const e=Math.max(0,Math.min(100,this.baseStats.winRate+t.winRate));this.statsElements.winRate.textContent=`${e.toFixed(1)}%`}if(this.statsElements.uptime){const e=Math.min(100,this.baseStats.uptime+t.uptime);this.statsElements.uptime.textContent=`${e.toFixed(1)}%`}this.baseStats.portfolio+=t.portfolio*.1,this.baseStats.winRate+=t.winRate*.1,this.baseStats.uptime+=t.uptime*.01}generateVariations(){return{portfolio:(Math.random()-.5)*1e3,winRate:(Math.random()-.5)*4,uptime:Math.random()*.1}}updateDisplayStats(){this.createLiveStatsDisplay()}createLiveStatsDisplay(){const t=document.getElementById("performance");if(!t||t.querySelector(".live-stats"))return;const i=`
      <div class="live-stats">
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-label">Total Trades Executed</div>
            <div class="stat-value" id="total-trades">${this.baseStats.trades}</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Portfolio Value</div>
            <div class="stat-value" id="portfolio-value">$${this.baseStats.portfolio.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Unrealized P&L</div>
            <div class="stat-value positive" id="unrealized-pnl">+$${this.baseStats.pnl.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Win Rate</div>
            <div class="stat-value" id="win-rate">${this.baseStats.winRate.toFixed(1)}%</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Average Trade Duration</div>
            <div class="stat-value" id="avg-duration">${this.baseStats.avgDuration} minutes</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">LLM Consensus Accuracy</div>
            <div class="stat-value" id="llm-accuracy">${this.baseStats.llmAccuracy.toFixed(1)}%</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Risk Score</div>
            <div class="stat-value low-risk" id="risk-score">0.28 (Low)</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">System Uptime</div>
            <div class="stat-value" id="system-uptime">${this.baseStats.uptime.toFixed(1)}%</div>
          </div>
          
          <div class="stat-box full-width">
            <div class="stat-label">Last Updated</div>
            <div class="stat-value" id="last-updated">${new Date().toISOString().replace("T"," ").substring(0,19)} UTC</div>
          </div>
        </div>
        
        <div class="recent-voting">
          <h3>Recent Voting Results</h3>
          <div class="voting-result" id="voting-result">
            <div class="cycle-header">Cycle #1: BUY Consensus (8/9 votes) - EXECUTED ✓</div>
            <div class="vote-breakdown">
              <div class="vote-line">├─ OpenAI GPT-4:       <span class="buy">BUY</span>  (75% confidence)</div>
              <div class="vote-line">├─ Anthropic Claude:   <span class="buy">BUY</span>  (75% confidence)</div>
              <div class="vote-line">├─ Google Gemini:      <span class="buy">BUY</span>  (75% confidence)</div>
              <div class="vote-line">├─ Local Gemma3:       <span class="buy">BUY</span>  (75% confidence)</div>
              <div class="vote-line">├─ Custom LLM #1:      <span class="buy">BUY</span>  (75% confidence)</div>
              <div class="vote-line">├─ Custom LLM #2:      <span class="buy">BUY</span>  (75% confidence)</div>
              <div class="vote-line">├─ Custom LLM #3:      <span class="buy">BUY</span>  (75% confidence)</div>
              <div class="vote-line">├─ Custom LLM #4:      <span class="buy">BUY</span>  (75% confidence)</div>
              <div class="vote-line">└─ Ollama Local:       <span class="hold">HOLD</span> (75% confidence)</div>
            </div>
            <div class="final-decision">
              Final Decision: <span class="buy">BUY</span> (Confidence: 75.4%)<br>
              Trade Executed: $3.66 USDT at $118,074.48
            </div>
          </div>
        </div>
      </div>
    `,s=t.querySelector(".section-content");s&&(s.innerHTML=i)}updateLiveStats(){const t={totalTrades:document.getElementById("total-trades"),portfolioValue:document.getElementById("portfolio-value"),unrealizedPnl:document.getElementById("unrealized-pnl"),winRate:document.getElementById("win-rate"),avgDuration:document.getElementById("avg-duration"),llmAccuracy:document.getElementById("llm-accuracy"),systemUptime:document.getElementById("system-uptime"),lastUpdated:document.getElementById("last-updated")},e=this.generateVariations();if(t.portfolioValue){const i=this.baseStats.portfolio+e.portfolio;t.portfolioValue.textContent=`$${i.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`}if(t.unrealizedPnl){const i=this.baseStats.pnl+e.portfolio*.5,s=(i/(this.baseStats.portfolio-this.baseStats.pnl)*100).toFixed(2);t.unrealizedPnl.innerHTML=`+$${i.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} (+${s}%)`}if(t.winRate){const i=Math.max(0,Math.min(100,this.baseStats.winRate+e.winRate));t.winRate.textContent=`${i.toFixed(1)}%`}t.lastUpdated&&(t.lastUpdated.textContent=`${new Date().toISOString().replace("T"," ").substring(0,19)} UTC`),Math.random()<.1&&t.totalTrades&&(this.baseStats.trades+=1,t.totalTrades.textContent=this.baseStats.trades.toString(),t.totalTrades.style.color="var(--terminal-green)",setTimeout(()=>{t.totalTrades.style.color=""},1e3))}simulateNewVotingCycle(){const t=document.getElementById("voting-result");if(!t)return;const e=["BUY","SELL","HOLD"],i=["OpenAI GPT-4","Anthropic Claude","Google Gemini","Local Gemma3","Custom LLM #1","Custom LLM #2","Custom LLM #3","Custom LLM #4","Ollama Local"],s=e[Math.floor(Math.random()*e.length)],o=i.map(r=>{const d=Math.random()<.8?s:e[Math.floor(Math.random()*e.length)],u=Math.floor(Math.random()*30)+70;return{model:r,decision:d,confidence:u}}),n=o.filter(r=>r.decision===s).length,l=`
      <div class="cycle-header">Cycle #${Math.floor(Math.random()*100)+1}: ${s} Consensus (${n}/9 votes) - ${n>=6?"EXECUTED ✓":"REJECTED ✗"}</div>
      <div class="vote-breakdown">
        ${o.map((r,d)=>{const u=d===o.length-1?"└─":"├─",p=r.decision.toLowerCase();return`<div class="vote-line">${u} ${r.model.padEnd(18)}: <span class="${p}">${r.decision}</span> (${r.confidence}% confidence)</div>`}).join("")}
      </div>
      <div class="final-decision">
        Final Decision: <span class="${s.toLowerCase()}">${s}</span> (Confidence: ${Math.floor(o.reduce((r,d)=>r+d.confidence,0)/o.length)}%)<br>
        ${n>=6?`Trade Executed: $${(Math.random()*10+1).toFixed(2)} USDT at $${(Math.random()*1e4+11e4).toFixed(2)}`:"Trade rejected due to insufficient consensus"}
      </div>
    `;t.innerHTML=l}stop(){this.isRunning=!1}forceUpdate(){this.updateStats(),this.updateLiveStats(),Math.random()<.3&&this.simulateNewVotingCycle()}}const b=`
.live-stats {
  margin-top: var(--space-6);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.stat-box {
  background: var(--bg-darker);
  border: 1px solid var(--terminal-green);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  text-align: center;
}

.stat-box.full-width {
  grid-column: 1 / -1;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-dim);
  margin-bottom: var(--space-2);
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
  text-shadow: var(--glow-sm);
}

.stat-value.positive {
  color: var(--terminal-green);
}

.stat-value.negative {
  color: var(--terminal-red);
}

.stat-value.low-risk {
  color: var(--terminal-green);
}

.recent-voting {
  margin-top: var(--space-8);
}

.recent-voting h3 {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  text-align: center;
}

.voting-result {
  background: var(--bg-darker);
  border: 1px solid var(--text-secondary);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  font-family: var(--font-mono);
}

.cycle-header {
  color: var(--text-secondary);
  font-weight: 700;
  margin-bottom: var(--space-3);
}

.vote-breakdown {
  margin: var(--space-3) 0;
}

.vote-line {
  margin: var(--space-1) 0;
  color: var(--text-primary);
}

.vote-line .buy {
  color: var(--terminal-green);
  font-weight: 700;
}

.vote-line .sell {
  color: var(--terminal-red);
  font-weight: 700;
}

.vote-line .hold {
  color: var(--text-secondary);
  font-weight: 700;
}

.final-decision {
  margin-top: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid var(--text-dim);
  color: var(--text-primary);
}

.final-decision .buy {
  color: var(--terminal-green);
  font-weight: 700;
}

.final-decision .sell {
  color: var(--terminal-red);
  font-weight: 700;
}

.final-decision .hold {
  color: var(--text-secondary);
  font-weight: 700;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-box {
    padding: var(--space-3);
  }
  
  .stat-value {
    font-size: var(--font-size-lg);
  }
}
`,m=document.createElement("style");m.textContent=b;document.head.appendChild(m);class O{constructor(){this.bootSequence=new g,this.terminal=new y,this.asciiArt=new E,this.statsUpdater=new v,this.init()}async init(){try{console.log("Starting boot sequence..."),await Promise.race([this.bootSequence.start(),new Promise(t=>setTimeout(t,1e4))]),console.log("Boot sequence completed")}catch(t){console.error("Boot sequence error:",t),this.forceShowMainContent()}this.initializeComponents(),this.setupEventListeners(),this.startPeriodicUpdates()}forceShowMainContent(){const t=document.getElementById("boot-sequence"),e=document.getElementById("main-content");t&&(t.style.display="none"),e&&(e.style.display="block")}initializeComponents(){const t=document.getElementById("main-content");t&&(t.style.display="block"),this.asciiArt.renderLogo(),this.terminal.init(),this.typeTagline(),this.statsUpdater.init()}setupEventListeners(){document.querySelectorAll('a[href^="#"]').forEach(i=>{i.addEventListener("click",this.handleSmoothScroll.bind(this))});const t=document.querySelector(".cta-primary"),e=document.querySelector(".cta-secondary");t&&t.addEventListener("click",this.handleInitializeTrading.bind(this)),e&&e.addEventListener("click",this.handlePaperTradingDemo.bind(this)),document.addEventListener("keydown",this.handleKeyboardShortcuts.bind(this)),window.addEventListener("resize",this.handleResize.bind(this))}handleSmoothScroll(t){t.preventDefault();const e=t.currentTarget.getAttribute("href"),i=document.querySelector(e);i&&i.scrollIntoView({behavior:"smooth",block:"start"})}handleInitializeTrading(){var t;(t=document.getElementById("architecture"))==null||t.scrollIntoView({behavior:"smooth"})}handlePaperTradingDemo(){var t;(t=document.getElementById("implementation"))==null||t.scrollIntoView({behavior:"smooth"})}handleKeyboardShortcuts(t){var e;t.altKey&&t.key.toLowerCase()==="t"&&(t.preventDefault(),this.terminal.focus()),t.altKey&&t.key.toLowerCase()==="h"&&(t.preventDefault(),(e=document.getElementById("hero"))==null||e.scrollIntoView({behavior:"smooth"})),t.key==="Escape"&&document.activeElement===this.terminal.input&&this.terminal.clear()}handleResize(){window.innerWidth<768?this.asciiArt.setMobileMode(!0):this.asciiArt.setMobileMode(!1)}async typeTagline(){const t=document.getElementById("tagline");if(!t)return;const e="Teaching a circuit board to experience greed";t.innerHTML="";const i=document.createElement("span");i.className="cursor",i.textContent="█",t.appendChild(i);for(let s=0;s<e.length;s++)await this.delay(25),t.insertBefore(document.createTextNode(e[s]),i);await this.delay(500),i.remove()}startPeriodicUpdates(){setInterval(()=>{this.statsUpdater.updateStats()},5e3),setInterval(()=>{Math.random()<.1&&this.asciiArt.glitchEffect()},3e4),setInterval(()=>{Math.random()<.05&&this.triggerRandomGlitch()},15e3)}triggerRandomGlitch(){const t=document.querySelectorAll(".section-content h2, .section-content h3, .terminal-prompt, .nav-link");if(t.length>0){const e=t[Math.floor(Math.random()*t.length)];if(e.classList.add("text-corrupt"),setTimeout(()=>{e.classList.remove("text-corrupt")},Math.random()*1e3+300),Math.random()<.3){const i=document.querySelector(".glitch-lines");i&&(i.style.opacity="1",setTimeout(()=>{i.style.opacity="0"},150))}}}delay(t){return new Promise(e=>setTimeout(e,t))}}document.addEventListener("DOMContentLoaded",()=>{let c=!1;const t=async()=>{if(!c){c=!0,document.removeEventListener("click",t),document.removeEventListener("keydown",t),document.removeEventListener("touchstart",t),document.removeEventListener("touchend",t),document.removeEventListener("pointerdown",t),document.removeEventListener("mousedown",t);const i=document.getElementById("interaction-overlay");i&&i.remove(),new O}};(()=>{if(document.getElementById("boot-sequence")){const s=document.createElement("div");s.id="interaction-overlay",s.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        z-index: 2001;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      `;const o=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<768;s.innerHTML=`
        <div style="text-align: center; padding: 2rem; max-width: 90vw;">
          <div style="color: #00FF41; font-family: monospace; font-size: ${o?"1rem":"1.2rem"}; margin-bottom: 2rem; line-height: 1.4;">
            BERRYBOT MK3 READY TO INITIALIZE
          </div>
          <div style="color: #00FF41; font-family: monospace; font-size: ${o?"0.8rem":"0.9rem"}; margin-bottom: 1rem; line-height: 1.4;">
            ${o?"Tap anywhere to begin boot sequence":"Click anywhere or press any key to begin boot sequence"}
          </div>
          <div style="color: #888; font-family: monospace; font-size: ${o?"0.7rem":"0.8rem"}; line-height: 1.4;">
            [Audio will be enabled after interaction]
          </div>
          ${o?'<div style="color: #FFB000; font-family: monospace; font-size: 0.6rem; margin-top: 1rem; line-height: 1.4;">Tap and hold briefly if needed</div>':""}
        </div>
      `,document.body.appendChild(s),s.addEventListener("touchstart",t,{passive:!1}),s.addEventListener("touchend",t,{passive:!1}),s.addEventListener("click",t)}})(),document.addEventListener("click",t),document.addEventListener("keydown",t),document.addEventListener("touchstart",t,{passive:!1}),document.addEventListener("touchend",t,{passive:!1}),document.addEventListener("pointerdown",t),document.addEventListener("mousedown",t)});class T{constructor(){this.container=null,this.columns=[],this.animationId=null}init(){window.innerWidth<768||window.matchMedia("(prefers-reduced-motion: reduce)").matches||(this.container=document.createElement("div"),this.container.className="matrix-rain",document.body.appendChild(this.container),this.createColumns(),this.animate())}createColumns(){const t=Math.floor(window.innerWidth/20),e="01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";for(let i=0;i<t;i++){const s=document.createElement("div");s.className="matrix-column",s.style.left=`${i*20}px`,s.style.animationDuration=`${Math.random()*3+2}s`,s.style.animationDelay=`${Math.random()*2}s`;let o="";for(let n=0;n<Math.floor(Math.random()*20)+10;n++)o+=e[Math.floor(Math.random()*e.length)]+`
`;s.textContent=o,this.container.appendChild(s),this.columns.push(s)}}animate(){setTimeout(()=>{this.container&&(this.container.innerHTML="",this.columns=[],this.createColumns(),this.animate())},1e4)}destroy(){this.container&&(this.container.remove(),this.container=null),this.columns=[]}}window.addEventListener("load",()=>{new T().init()});
