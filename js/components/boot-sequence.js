// Boot Sequence Component

export class BootSequence {
  constructor() {
    this.element = document.getElementById('boot-sequence')
    this.textElement = document.getElementById('boot-text')
    this.progressElement = document.getElementById('progress-bar') // This might be null, which is OK
    this.currentStep = 0
    this.audioFiles = {}
    this.isSkipped = false
    this.skipResolver = null
    this.keypressAudioBuffer = null
    this.audioContext = null
    this.lastKeypressTime = 0
    this.keypressThrottle = 20 // Minimum 20ms between keypress sounds
    this.hddStartupTimeout = null
    
    // Debug logging for missing elements
    console.log('BootSequence constructor elements:', {
      element: !!this.element,
      textElement: !!this.textElement,
      progressElement: !!this.progressElement
    })
    
    this.loadAudioFiles()
    this.setupWebAudio()
    this.setupSpacebarSkip()
    this.steps = [
      'BERRYBOT v3.14.159 MAINFRAME SYSTEM',
      'BERRY ANALYTICS CORPORATION',
      '',
      'INITIALIZING CORE SYSTEMS...',
      'TRADING ENGINE CONTROLS...........[OK]',
      'RISK MANAGEMENT SYSTEMS............[OK]',
      'MARKET DATA PROCESSORS.............[OK]',
      'SECURITY PROTOCOLS.................[OK]',
      '',
      'LOADING AI CONSENSUS MATRIX...',
      '> OPENAI NEURAL NETWORK.........[ACTIVE]',
      '> ANTHROPIC SYSTEMS.............[ACTIVE]',
      '> GOOGLE COGNITIVE ENGINE.......[ACTIVE]',
      '> LOCAL PROCESSING UNITS........[ACTIVE]',
      '',
      'CONSENSUS PROTOCOL VERIFICATION...[OK]',
      'MULTI-LLM VOTING SYSTEM ONLINE....[OK]',
      '',
      'SYSTEM DIAGNOSTICS:',
      '> CPU: RASPBERRY PI 5 ARM CORTEX..[OK]',
      '> MEMORY: 8GB NEURAL PROCESSING...[OK]',
      '> NEURAL NET: BERRYBOT MATRIX.....[OK]',
      '',
      'TESTING AI CONSENSUS PATHWAYS...',
      'TESTING MARKET DATA INTEGRITY...',
      'TESTING SECURITY ENCRYPTION...',
      '',
      'ALL SYSTEMS NOMINAL',
      'TRADING PROTOCOL CONFIRMED',
      'PROFIT MAXIMIZATION ENABLED',
      '',
      'BERRYBOT SYSTEM READY',
      'AWAITING USER INSTRUCTIONS...'
    ]
  }
  
  loadAudioFiles() {
    // Define audio files that actually exist in /assets/audio/
    const audioSources = {
      startup: './assets/audio/bootsound.mp3',
      keypress: './assets/audio/keypress.mp3',
      hdd_startup: './assets/audio/hdd_startup.mp3',
      hdd_loop: './assets/audio/hdd_loop.mp3',
      glitch: './assets/audio/glitch.mp3',
      degauss: './assets/audio/degauss.mp3'
      // Removed missing files: beep, success, complete, ambient, fan_noise
    }
    
    // Preload audio files (optional - they'll load when first played)
    Object.keys(audioSources).forEach(key => {
      this.audioFiles[key] = new Audio(audioSources[key])
      
      // Set appropriate volumes
      if (key === 'keypress') {
        this.audioFiles[key].volume = 0.15 // Lower volume for typing
      } else if (key === 'hdd_startup') {
        this.audioFiles[key].volume = 0.25 // Medium volume for HDD startup
        this.audioFiles[key].loop = false // Startup sound plays once
      } else if (key === 'hdd_loop') {
        this.audioFiles[key].volume = 0.2 // Lower volume for background HDD loop
        this.audioFiles[key].loop = true // Loop continuously
      } else if (key === 'glitch') {
        this.audioFiles[key].volume = 0.4 // Higher volume for glitch effects
      } else if (key === 'ambient') {
        this.audioFiles[key].volume = 0.15 // Very low volume for ambient background
        this.audioFiles[key].loop = true // Loop continuously
      } else if (key === 'fan_noise') {
        this.audioFiles[key].volume = 0.1 // Very low volume for fan noise
        this.audioFiles[key].loop = true // Loop continuously
      } else if (key === 'degauss') {
        this.audioFiles[key].volume = 0.35 // Medium-high volume for degauss effect
      } else if (key === 'startup') {
        this.audioFiles[key].volume = 1.0 // HTML5 Audio maximum volume (200% not supported)
      } else {
        this.audioFiles[key].volume = 0.3 // Normal volume for other sounds
      }
      
      this.audioFiles[key].preload = 'auto'
      
      // Handle loading errors gracefully
      this.audioFiles[key].addEventListener('error', () => {
        console.log(`Audio file ${audioSources[key]} not found - skipping sound effects`)
      })
      
      // Handle successful loading
      this.audioFiles[key].addEventListener('canplaythrough', () => {
        console.log(`Audio file ${key} loaded successfully`)
      })
    })
    
    // Set up user interaction handler immediately
    this.setupAudioUnlock()
  }
  
  setupAudioUnlock() {
    const unlockAudio = () => {
      console.log('User interaction detected - attempting to unlock audio')
      
      // Try to play and immediately pause all audio files to unlock them
      Object.values(this.audioFiles).forEach(audio => {
        if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or higher
          audio.play().then(() => {
            audio.pause()
            audio.currentTime = 0
            console.log('Audio unlocked')
          }).catch(e => {
            console.log('Audio unlock failed:', e)
          })
        }
      })
      
      // Remove the listeners after first interaction
      document.removeEventListener('click', unlockAudio)
      document.removeEventListener('keydown', unlockAudio)
      document.removeEventListener('touchstart', unlockAudio)
    }
    
    // Listen for any user interaction
    document.addEventListener('click', unlockAudio)
    document.addEventListener('keydown', unlockAudio)
    document.addEventListener('touchstart', unlockAudio)
  }
  
  async playSound(soundName) {
    if (this.audioFiles[soundName]) {
      try {
        // Only reset currentTime if not already playing (for seamless loops)
        if (this.audioFiles[soundName].paused) {
          this.audioFiles[soundName].currentTime = 0
        }
        
        const playPromise = this.audioFiles[soundName].play()
        
        if (playPromise !== undefined) {
          return await playPromise.catch(e => {
            if (e.name === 'NotAllowedError') {
              console.log('Audio blocked by browser - user interaction required')
              this.waitForUserInteraction(soundName)
              throw e
            } else {
              console.log(`Could not play ${soundName}:`, e)
              throw e
            }
          })
        }
        return Promise.resolve()
      } catch (e) {
        console.log(`Error playing ${soundName}:`, e)
        throw e
      }
    } else {
      console.log(`Audio file ${soundName} not loaded`)
      return Promise.reject(new Error(`Audio file ${soundName} not loaded`))
    }
  }
  
  playKeypressSound() {
    // Ultra-fast, non-blocking keypress sound for typing effect with throttling
    const now = Date.now()
    if (now - this.lastKeypressTime < this.keypressThrottle) {
      return // Skip if too recent
    }
    this.lastKeypressTime = now
    
    if (this.audioFiles.keypress && this.audioFiles.keypress.readyState >= 2) {
      try {
        // Use Web Audio API for better performance if available
        if (this.keypressAudioBuffer) {
          this.playKeypressWithWebAudio()
        } else {
          // Fallback: Use setTimeout to make it completely async
          setTimeout(() => {
            try {
              const keypressClone = this.audioFiles.keypress.cloneNode()
              keypressClone.volume = 0.12
              keypressClone.currentTime = 0
              keypressClone.play().catch(() => {}) // Silent fail
            } catch (e) {
              // Silent fail
            }
          }, 0)
        }
      } catch (e) {
        // Silent fail
      }
    }
  }
  
  // Try to set up Web Audio API for better performance
  setupWebAudio() {
    try {
      if (window.AudioContext || window.webkitAudioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        this.loadKeypressBuffer()
        this.setupGlitchEffects()
      }
    } catch (e) {
      // Web Audio not available, use fallback
    }
  }
  
  setupGlitchEffects() {
    if (!this.audioContext) return
    
    try {
      // Create audio distortion effects for glitches
      this.glitchGain = this.audioContext.createGain()
      this.distortion = this.audioContext.createWaveShaper()
      this.filter = this.audioContext.createBiquadFilter()
      
      // Set up distortion curve for harsh digital glitch effect
      this.distortion.curve = this.createDistortionCurve(50)
      this.distortion.oversample = '4x'
      
      // Set up filter for digital artifacts
      this.filter.type = 'highpass'
      this.filter.frequency.value = 1000
      this.filter.Q.value = 25
      
      // Connect effects chain
      this.glitchGain.connect(this.distortion)
      this.distortion.connect(this.filter)
      this.filter.connect(this.audioContext.destination)
      
      console.log('Audio glitch effects initialized')
    } catch (e) {
      console.log('Could not set up audio distortion effects:', e)
    }
  }
  
  createDistortionCurve(amount) {
    const samples = 44100
    const curve = new Float32Array(samples)
    const deg = Math.PI / 180
    
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x))
    }
    
    return curve
  }
  
  async loadKeypressBuffer() {
    try {
      const response = await fetch('./assets/audio/keypress.mp3')
      const arrayBuffer = await response.arrayBuffer()
      this.keypressAudioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
    } catch (e) {
      // Fallback to regular audio
    }
  }
  
  playKeypressWithWebAudio() {
    try {
      const source = this.audioContext.createBufferSource()
      const gainNode = this.audioContext.createGain()
      
      source.buffer = this.keypressAudioBuffer
      gainNode.gain.value = 0.12
      
      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      source.start()
    } catch (e) {
      // Silent fail
    }
  }
  
  playGlitchSound() {
    console.log('Boot sequence glitch sound - DISABLED (only for main page)')
    // Glitch sound disabled during boot sequence
    // Sound only plays for main page logo glitches
    return
  }
  
  playDegaussSound() {
    console.log('Playing CRT degauss sound effect')
    if (this.audioFiles.degauss) {
      // Play standalone degauss sound
      this.playSound('degauss')
    }
  }
  
  triggerDegaussEffect() {
    console.log('Triggering CRT degauss screen distortion effect')
    
    // Apply degauss effect to the entire screen
    const bootContent = document.querySelector('.boot-content') || document.body
    
    if (bootContent) {
      // Create degauss distortion overlay
      this.createDegaussOverlay(bootContent)
      
      // Apply CSS distortion effects
      this.applyDegaussDistortion(bootContent)
    }
  }
  
  createDegaussOverlay(element) {
    // Create a temporary overlay for degauss wave effect
    const degaussOverlay = document.createElement('div')
    degaussOverlay.className = 'degauss-overlay'
    degaussOverlay.style.cssText = `
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
    `
    
    element.appendChild(degaussOverlay)
    
    // Remove overlay after animation
    setTimeout(() => {
      if (degaussOverlay && degaussOverlay.parentNode) {
        degaussOverlay.parentNode.removeChild(degaussOverlay)
      }
    }, 1800)
  }
  
  applyDegaussDistortion(element) {
    // Apply complex distortion effects that simulate CRT degaussing
    // BUT avoid brightness/filter changes that interfere with warm-up
    const originalTransform = element.style.transform
    
    // Phase 1: Initial magnetic field disruption (0-0.3s) - TRANSFORM ONLY
    element.style.transition = 'transform 0.1s ease-out'
    element.style.transform = 'scaleX(1.02) scaleY(0.98) skewX(0.5deg)'
    
    setTimeout(() => {
      // Phase 2: Magnetic wave sweep (0.3-0.8s) - TRANSFORM ONLY
      element.style.transition = 'transform 0.2s ease-in-out'
      element.style.transform = 'scaleX(0.98) scaleY(1.03) skewX(-1deg) rotate(0.2deg)'
    }, 300)
    
    setTimeout(() => {
      // Phase 3: Secondary wave (0.8-1.2s) - TRANSFORM ONLY
      element.style.transition = 'transform 0.15s ease-in-out'
      element.style.transform = 'scaleX(1.01) scaleY(0.99) skewX(0.3deg) rotate(-0.1deg)'
    }, 800)
    
    setTimeout(() => {
      // Phase 4: Settling oscillation (1.2-1.6s) - TRANSFORM ONLY
      element.style.transition = 'transform 0.1s ease-in-out'
      element.style.transform = 'scaleX(0.999) scaleY(1.001) skewX(-0.1deg)'
    }, 1200)
    
    setTimeout(() => {
      // Phase 5: Final stabilization (1.6-2.0s) - TRANSFORM ONLY
      element.style.transition = 'transform 0.4s ease-out'
      element.style.transform = originalTransform
      
      // Clear transition after restoration
      setTimeout(() => {
        element.style.transition = ''
      }, 400)
    }, 1600)
  }
  
  distortAllCurrentAudio(duration = 400) {
    console.log('Distorting all currently playing audio')
    
    // Get all currently playing audio files
    const activeAudio = []
    Object.keys(this.audioFiles).forEach(key => {
      if (this.audioFiles[key] && !this.audioFiles[key].paused) {
        activeAudio.push({name: key, audio: this.audioFiles[key]})
      }
    })
    
    if (activeAudio.length === 0) {
      console.log('No active audio to distort')
      return
    }
    
    console.log(`Distorting ${activeAudio.length} active audio sources:`, activeAudio.map(a => a.name))
    
    // Store original states
    const originalStates = activeAudio.map(({name, audio}) => ({
      name,
      audio,
      volume: audio.volume,
      playbackRate: audio.playbackRate || 1
    }))
    
    // Apply various distortion effects
    activeAudio.forEach(({audio}) => {
      // Random distortion type for each audio source
      const distortionType = Math.floor(Math.random() * 3)
      
      switch (distortionType) {
        case 0: // Volume glitch - rapid fluctuations
          this.applyVolumeGlitch(audio, duration)
          break
        case 1: // Speed distortion - pitch/tempo changes
          this.applySpeedDistortion(audio, duration)
          break  
        case 2: // Combined effects
          this.applyVolumeGlitch(audio, duration * 0.6)
          setTimeout(() => this.applySpeedDistortion(audio, duration * 0.4), duration * 0.3)
          break
      }
    })
    
    // Restore original states after distortion period
    setTimeout(() => {
      originalStates.forEach(({audio, volume, playbackRate}) => {
        if (audio) {
          audio.volume = volume
          audio.playbackRate = playbackRate
        }
      })
      console.log('Audio distortion effects ended, restored original states')
    }, duration)
  }
  
  applyVolumeGlitch(audio, duration) {
    const originalVolume = audio.volume
    let glitchCount = 0
    const maxGlitches = Math.floor(duration / 30) // Glitch every 30ms
    
    const volumeGlitch = setInterval(() => {
      if (glitchCount >= maxGlitches) {
        clearInterval(volumeGlitch)
        return
      }
      
      // Rapid volume changes for digital corruption effect
      audio.volume = originalVolume * (0.1 + Math.random() * 0.9)
      glitchCount++
    }, 30)
  }
  
  applySpeedDistortion(audio, duration) {
    const originalRate = audio.playbackRate || 1
    
    // Random speed/pitch distortion
    const distortedRate = originalRate * (0.7 + Math.random() * 0.6) // 0.7x to 1.3x speed
    audio.playbackRate = distortedRate
    
    // Gradually return to normal
    setTimeout(() => {
      if (audio) {
        audio.playbackRate = originalRate
      }
    }, duration)
  }
  
  applyAudioGlitch(duration = 200) {
    if (!this.audioContext || !this.glitchGain) return
    
    console.log('Applying audio distortion glitch effect')
    
    try {
      // Create temporary audio source with noise
      const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * (duration / 1000), this.audioContext.sampleRate)
      const data = buffer.getChannelData(0)
      
      // Generate harsh digital noise
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3 // White noise at 30% volume
      }
      
      const source = this.audioContext.createBufferSource()
      source.buffer = buffer
      
      // Apply distortion effects
      this.glitchGain.gain.value = 1
      source.connect(this.glitchGain)
      source.start()
      
      // Fade out the glitch effect
      setTimeout(() => {
        if (this.glitchGain) {
          this.glitchGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1)
        }
      }, duration * 0.7)
      
    } catch (e) {
      console.log('Audio glitch effect failed:', e)
    }
  }
  
  
  async startHDDSequence() {
    console.log('Starting HDD startup sequence')
    
    // Play HDD startup sound first
    if (this.audioFiles.hdd_startup) {
      this.playSound('hdd_startup')
      
      // Set up event listener to start loop when startup finishes
      const startLoopOnEnd = () => {
        console.log('HDD startup sound finished, starting loop')
        this.startHDDLoop()
        this.audioFiles.hdd_startup.removeEventListener('ended', startLoopOnEnd)
      }
      
      this.audioFiles.hdd_startup.addEventListener('ended', startLoopOnEnd)
      
      // Also set up fallback timeout in case 'ended' event doesn't fire
      this.hddStartupTimeout = setTimeout(() => {
        console.log('HDD startup timeout reached, starting loop (fallback)')
        this.startHDDLoop()
        this.audioFiles.hdd_startup.removeEventListener('ended', startLoopOnEnd)
      }, 20000) // 20 seconds fallback for your 19-second file
      
    } else {
      // If no startup sound, go straight to loop
      this.startHDDLoop()
    }
  }
  
  startHDDLoop() {
    console.log('Starting HDD loop sound')
    if (this.audioFiles.hdd_loop) {
      console.log('HDD loop audio file available, attempting to play')
      
      // Ensure seamless looping by setting up proper event handling
      this.audioFiles.hdd_loop.currentTime = 0
      this.audioFiles.hdd_loop.loop = true
      
      // Add event listeners to ensure seamless looping
      this.audioFiles.hdd_loop.addEventListener('ended', () => {
        console.log('HDD loop ended, restarting for seamless playback')
        this.audioFiles.hdd_loop.currentTime = 0
        this.audioFiles.hdd_loop.play().catch(e => console.log('HDD loop restart failed:', e))
      })
      
      // Use a more reliable play method
      this.playSound('hdd_loop').then(() => {
        console.log('HDD loop started successfully')
        
        // Additional seamless loop setup using timeupdate
        this.setupSeamlessLoop(this.audioFiles.hdd_loop)
      }).catch(e => {
        console.log('HDD loop start failed:', e)
      })
      
      // Make HDD loop and audio system globally accessible when it starts
      if (typeof window !== 'undefined') {
        window.berryBotHDD = this.audioFiles.hdd_loop
        window.berryBotStopHDD = () => this.stopAllHDDSounds()
        window.berryBotAudio = this // Make entire boot sequence audio system available
        console.log('HDD loop and audio system made globally available')
      }
      
      // Start additional background sounds after a delay
      this.startBackgroundSounds()
    } else {
      console.log('HDD loop audio file not available')
    }
  }
  
  startBackgroundSounds() {
    console.log('Starting additional background sound effects')
    
    // Start ambient sound after 2 seconds
    setTimeout(() => {
      if (this.audioFiles.ambient && !this.isSkipped) {
        console.log('Starting ambient background sound')
        this.playSound('ambient').catch(e => console.log('Ambient sound failed:', e))
        
        // Set up seamless looping for ambient sound
        if (this.audioFiles.ambient.duration) {
          this.setupSeamlessLoop(this.audioFiles.ambient)
        }
      }
    }, 2000)
    
    // Start fan noise after 5 seconds  
    setTimeout(() => {
      if (this.audioFiles.fan_noise && !this.isSkipped) {
        console.log('Starting fan noise background sound')
        this.playSound('fan_noise').catch(e => console.log('Fan noise failed:', e))
        
        // Set up seamless looping for fan noise
        if (this.audioFiles.fan_noise.duration) {
          this.setupSeamlessLoop(this.audioFiles.fan_noise)
        }
      }
    }, 5000)
  }
  
  setupSeamlessLoop(audio) {
    // Create seamless looping by monitoring playback position
    const checkLoop = () => {
      if (audio && !audio.paused && audio.duration) {
        // For longer files (5+ minutes), restart earlier to ensure smoothness
        const restartBuffer = audio.duration > 60 ? 0.5 : 0.1 // 0.5s buffer for long files
        
        if (audio.currentTime >= audio.duration - restartBuffer) {
          console.log(`Seamless loop: restarting HDD sound (${Math.round(audio.duration)}s duration)`)
          audio.currentTime = 0
        }
      }
    }
    
    // Check less frequently for longer files to reduce CPU usage
    const checkInterval = audio && audio.duration > 60 ? 200 : 50 // 200ms for long files
    this.hddLoopInterval = setInterval(checkLoop, checkInterval)
    
    // Store reference for cleanup
    this.audioFiles.hdd_loop.seamlessLoopInterval = this.hddLoopInterval
    
    console.log(`Set up seamless looping with ${checkInterval}ms intervals for ${Math.round(audio.duration || 0)}s audio`)
  }
  
  transitionHDDToBackground() {
    console.log('Transitioning HDD sounds to background mode')
    
    // Clear any pending timeout
    if (this.hddStartupTimeout) {
      clearTimeout(this.hddStartupTimeout)
      this.hddStartupTimeout = null
    }
    
    // DON'T stop startup sound if still playing - let it finish naturally
    if (this.audioFiles.hdd_startup && !this.audioFiles.hdd_startup.paused) {
      console.log('HDD startup still playing, letting it finish before starting loop')
      
      // Set up listener to start loop when startup naturally ends
      const startLoopWhenReady = () => {
        console.log('HDD startup finished during background transition')
        this.startHDDLoop()
        // Lower volume for background
        if (this.audioFiles.hdd_loop) {
          this.audioFiles.hdd_loop.volume = 0.1
        }
        this.audioFiles.hdd_startup.removeEventListener('ended', startLoopWhenReady)
      }
      
      this.audioFiles.hdd_startup.addEventListener('ended', startLoopWhenReady)
      
      // Also set up the global reference for when loop starts
      if (typeof window !== 'undefined') {
        window.berryBotStopHDD = () => this.stopAllHDDSounds()
      }
      
      return // Exit early, let startup finish
    }
    
    // Keep loop sound running but lower the volume for background ambience
    if (this.audioFiles.hdd_loop) {
      console.log('Keeping HDD loop running as background sound')
      console.log('HDD loop current state:', {
        paused: this.audioFiles.hdd_loop.paused,
        currentTime: this.audioFiles.hdd_loop.currentTime,
        duration: this.audioFiles.hdd_loop.duration,
        volume: this.audioFiles.hdd_loop.volume
      })
      
      // If the loop isn't playing, start it
      if (this.audioFiles.hdd_loop.paused || this.audioFiles.hdd_loop.currentTime === 0) {
        console.log('HDD loop not playing, starting it')
        this.playSound('hdd_loop')
      }
      
      // Lower volume for background ambience
      this.audioFiles.hdd_loop.volume = 0.1
      
      // Make HDD loop globally accessible for main site controls
      if (typeof window !== 'undefined') {
        window.berryBotHDD = this.audioFiles.hdd_loop
        window.berryBotStopHDD = () => this.stopAllHDDSounds()
      }
    } else {
      console.log('HDD loop audio file not available during transition')
    }
  }
  
  stopAllHDDSounds() {
    console.log('Stopping all background sounds completely')
    
    // Clear any pending timeout
    if (this.hddStartupTimeout) {
      clearTimeout(this.hddStartupTimeout)
      this.hddStartupTimeout = null
    }
    
    // Clear seamless loop interval
    if (this.hddLoopInterval) {
      clearInterval(this.hddLoopInterval)
      this.hddLoopInterval = null
    }
    
    // Stop all background sound types
    const backgroundSounds = ['hdd_startup', 'hdd_loop', 'ambient', 'fan_noise']
    
    backgroundSounds.forEach(soundType => {
      if (this.audioFiles[soundType]) {
        // Clear any stored seamless loop interval
        if (this.audioFiles[soundType].seamlessLoopInterval) {
          clearInterval(this.audioFiles[soundType].seamlessLoopInterval)
          this.audioFiles[soundType].seamlessLoopInterval = null
        }
        
        this.audioFiles[soundType].pause()
        this.audioFiles[soundType].currentTime = 0
        console.log(`Stopped ${soundType} background sound`)
      }
    })
    
    // Clean up global references
    if (typeof window !== 'undefined') {
      window.berryBotHDD = null
      window.berryBotStopHDD = null
    }
  }
  
  // Keep the old method for compatibility and skip scenarios
  stopHDDSounds() {
    this.stopAllHDDSounds()
  }
  
  waitForUserInteraction(soundName) {
    const playOnInteraction = () => {
      this.audioFiles[soundName].play().catch(e => {
        console.log(`Still could not play ${soundName}:`, e)
      })
      document.removeEventListener('click', playOnInteraction)
      document.removeEventListener('keydown', playOnInteraction)
    }
    
    document.addEventListener('click', playOnInteraction, { once: true })
    document.addEventListener('keydown', playOnInteraction, { once: true })
    
    console.log('Click or press any key to enable audio')
  }
  
  setupSpacebarSkip() {
    const handleSpacebar = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        console.log('Spacebar pressed - skipping boot sequence')
        this.skipBootSequence()
      }
    }
    
    document.addEventListener('keydown', handleSpacebar)
    
    // Store reference to remove listener later
    this.spacebarHandler = handleSpacebar
  }
  
  skipBootSequence() {
    this.isSkipped = true
    if (this.skipResolver) {
      this.skipResolver()
    }
    
    // When skipping, make sure to start HDD loop if it hasn't started yet
    if (this.audioFiles.hdd_loop && !this.audioFiles.hdd_loop.currentTime) {
      console.log('Boot sequence skipped - starting HDD loop')
      this.startHDDLoop()
    }
    
    this.completeBootSequence()
  }
  
  completeBootSequence() {
    console.log('Boot sequence completed/skipped')
    
    // Stop HDD startup sound but keep loop running
    this.transitionHDDToBackground()
    
    // Hide boot sequence immediately
    if (this.element) {
      this.element.style.display = 'none'
    }
    // Show main content
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.style.display = 'block'
    }
    // Remove spacebar listener
    if (this.spacebarHandler) {
      document.removeEventListener('keydown', this.spacebarHandler)
    }
  }
  
  async start() {
    console.log('🚀 Boot sequence start() called')
    if (!this.element) {
      console.error('❌ Boot sequence element not found - this is the problem!')
      return
    }
    
    if (!this.textElement) {
      console.error('❌ Boot text element not found!')
      return
    }
    
    console.log('✅ Boot sequence elements found, proceeding with animation')
    
    console.log('Elements found:', {
      element: !!this.element,
      textElement: !!this.textElement,
      progressElement: !!this.progressElement
    })
    
    // Reset display
    this.element.style.display = 'flex'
    if (this.textElement) {
      this.textElement.textContent = ''
    }
    if (this.progressElement) {
      this.progressElement.style.width = '0%'
    }
    
    // Add retro terminal power-on effect
    await this.terminalPowerOn()
    
    // Play startup sound and start HDD sequence
    console.log('Attempting to play startup sound')
    await this.playSound('startup')
    
    // Make audio system globally accessible for main website
    if (typeof window !== 'undefined') {
      window.berryBotAudio = this
      console.log('Boot sequence audio system made globally accessible')
    }
    
    // Start HDD startup sequence (startup sound followed by loop)
    this.startHDDSequence()
    
    // Initial system wake-up sequence
    await this.systemWakeUp()
    
    console.log('Starting boot sequence typing...')
    // Type boot messages
    await this.typeBootSequence()
    
    console.log('Waiting for continue...')
    // Wait for user interaction or auto-continue
    await this.waitForContinueShort()
    
    // Note: Don't force HDD loop here - let startup sound finish naturally
    
    // Check if already skipped before doing fadeout
    if (this.isSkipped) {
      return
    }
    
    console.log('Hiding boot sequence')
    // Fade out effect
    await this.terminalPowerOff()
    this.completeBootSequence()
  }
  
  async typeBootSequence() {
    console.log('typeBootSequence started, steps:', this.steps.length)
    
    for (let i = 0; i < this.steps.length; i++) {
      // Check if boot sequence has been skipped
      if (this.isSkipped) {
        console.log('Boot sequence skipped, breaking loop')
        break
      }
      
      const line = this.steps[i]
      console.log(`Typing line ${i}: "${line}"`)
      
      // Add new line
      const lineElement = document.createElement('div')
      lineElement.className = 'boot-line'
      lineElement.style.color = '#FFB000' // Default MOTHER amber
      
      // Occasionally add glitch effects to lines (reduced by half)
      if (Math.random() < 0.075) { // 7.5% chance for glitch (half of 15%)
        lineElement.classList.add('text-corrupt')
        setTimeout(() => {
          lineElement.classList.remove('text-corrupt')
        }, Math.random() * 1000 + 500) // Remove after 0.5-1.5 seconds
      }
      
      // BerryBot-style color coding with retro terminal aesthetic
      if (line.startsWith('>') || line.includes('BERRY ANALYTICS')) {
        lineElement.style.color = '#00FF00' // Green for system info
      } else if (line.includes('[OK]') || line.includes('[ACTIVE]') || line.includes('[LOADED]') || line.includes('[SECURE]') || line.includes('[ENABLED]') || line.includes('NOMINAL')) {
        lineElement.style.color = '#00FF00' // Green for success
      } else if (line.includes('ERROR') || line.includes('FAILED')) {
        lineElement.style.color = '#FF0000' // Red for warnings/errors
      } else if (line.includes('PROTOCOL') || line.includes('BERRYBOT') || line.includes('PROFIT MAXIMIZATION')) {
        lineElement.style.color = '#FFFFFF' // White for important system messages
      } else if (line.includes('TESTING') || line.includes('LOADING') || line.includes('INITIALIZING') || line.includes('RUNNING')) {
        lineElement.style.color = '#FFB000' // Amber for processing
      }
      
      this.textElement.appendChild(lineElement)
      
      // Type each character or add empty line
      if (line.trim()) {
        await this.typeLine(lineElement, line)
      } else {
        lineElement.innerHTML = '&nbsp;'
      }
      
      // Scroll to bottom to keep current content visible
      this.textElement.scrollTop = this.textElement.scrollHeight
      
      // Also ensure the line element itself is visible
      lineElement.scrollIntoView({ behavior: 'smooth', block: 'end' })
      
      // Variable delay between lines - much faster for 20s target
      if (line.includes('BERRYBOT') || line.includes('PROTOCOL') || line.includes('PROFIT MAXIMIZATION')) {
        await this.delay(30) // Dramatically faster for system messages
      } else if (line.includes('BERRY ANALYTICS')) {
        await this.delay(25) // Much faster corporate message timing
      } else if (line.includes('[OK]') || line.includes('[ACTIVE]') || line.includes('[LOADED]')) {
        await this.delay(5) // Very fast for status confirmations
      } else if (line.includes('INITIALIZING') || line.includes('LOADING') || line.includes('RUNNING')) {
        await this.delay(12) // Much faster for processing messages
      } else if (line.startsWith('>')) {
        await this.delay(6) // Very fast for system listings
      } else if (line.includes('READY')) {
        await this.delay(35) // Faster for completion message
      } else {
        await this.delay(8) // Much faster default timing
      }
      
      // Randomly trigger system malfunction effect (reduced by half)
      if (Math.random() < 0.04) { // 4% chance per line (half of 8%)
        this.triggerMalfunction()
      }
      
      // Add periodic screen artifacts
      await this.addScreenArtifacts()
      
      // Add subtle ambient flickering during normal operation
      if (Math.random() < 0.08) { // 8% chance for subtle flicker
        this.addAmbientFlicker()
      }
    }
    console.log('typeBootSequence completed')
  }
  
  async typeLine(element, text) {
    console.log(`Typing text: "${text}"`)
    
    // Play sounds for specific BerryBot events
    if (text.includes('[OK]') || text.includes('[ACTIVE]') || text.includes('NOMINAL')) {
      this.playSound('success')
    } else if (text.includes('TESTING') || text.includes('LOADING') || text.includes('INITIALIZING')) {
      this.playSound('beep')
    } else if (text.includes('BERRYBOT SYSTEM READY') || text.includes('PROFIT MAXIMIZATION')) {
      this.playSound('complete')
    }
    
    // Check if this is a testing line that needs percentage
    const isTestingLine = text.startsWith('TESTING ')
    
    if (isTestingLine) {
      // Type the base text first (25% faster)
      for (let i = 0; i < text.length; i++) {
        element.textContent += text[i]
        
        // Play typing sound for visible characters (not spaces)
        if (text[i] !== ' ') {
          this.playKeypressSound()
        }
        
        await this.delay(0.8) // Much faster character typing
      }
      
      // Add percentage progress
      element.textContent += ' ['
      
      // Animate percentage from 0 to 100 - much faster
      for (let percent = 0; percent <= 100; percent += Math.random() < 0.2 ? 5 : 3) {
        // Clear the percentage part and rewrite it
        const baseText = element.textContent.substring(0, element.textContent.indexOf('[') + 1)
        const percentText = `${percent}%`
        const padding = percent < 100 ? '...' : ''
        element.textContent = baseText + percentText + padding + ']'
        
        // Ensure the current line stays visible
        element.scrollIntoView({ behavior: 'smooth', block: 'end' })
        
        // Ultra fast timing for 20s target
        if (percent < 10 || percent > 95) {
          await this.delay(4) // Ultra fast at start and end
        } else if (percent % 20 === 0) {
          await this.delay(8) // Brief pause at milestones
        } else {
          await this.delay(2) // Ultra fast normal speed
        }
      }
      
      // Final format
      const baseText = element.textContent.substring(0, element.textContent.indexOf('['))
      element.textContent = baseText + '[100%] PASSED'
      
    } else {
      // Normal typing for non-testing lines
      for (let i = 0; i < text.length; i++) {
        element.textContent += text[i]
        
        // Play typing sound for visible characters (not spaces)
        if (text[i] !== ' ') {
          this.playKeypressSound()
        }
        
        // Ultra fast typing speed for 20s target
        if (text.includes('PROFIT MAXIMIZATION')) {
          await this.delay(4) // Much faster for trading message
        } else if (text.includes('[OK]') || text.includes('[ACTIVE]') || text.includes('NOMINAL')) {
          await this.delay(0.5) // Ultra fast for confirmations
        } else if (text.includes('PROTOCOL') || text.includes('BERRYBOT')) {
          await this.delay(2.5) // Faster for important messages
        } else if (text.includes('BERRY ANALYTICS')) {
          await this.delay(2) // Much faster corporate message pacing  
        } else if (text.includes('TESTING') || text.includes('LOADING') || text.includes('INITIALIZING')) {
          await this.delay(1.2) // Ultra fast for processing
        } else if (text.startsWith('>')) {
          await this.delay(0.6) // Ultra fast for system listings
        } else {
          await this.delay(1) // Ultra fast standard typing speed
        }
      }
    }
    
    console.log(`Finished typing: "${text}"`)
  }
  
  async animateProgressBar() {
    // Animate progress bar with Macintosh-style rectangles
    const totalRectangles = 50 // Increased significantly for fuller bar
    this.progressElement.innerHTML = '' // Clear any existing content
    
    // Calculate width for each rectangle to fill 100%
    const rectWidth = `${(100 / totalRectangles)}%`
    
    // Create rectangle containers
    for (let i = 0; i < totalRectangles; i++) {
      const rect = document.createElement('div')
      rect.className = 'progress-rectangle'
      rect.style.width = rectWidth
      rect.style.flex = 'none' // Override flex behavior
      this.progressElement.appendChild(rect)
    }
    
    // Calculate timing to match boot sequence duration
    // Approximate boot sequence time: ~45 steps * average 50ms + character typing time
    const totalBootTime = this.steps.length * 60 + 2000 // Rough estimate
    const rectangleDelay = totalBootTime / totalRectangles
    
    // Fill rectangles with calculated timing to match text
    const rectangles = this.progressElement.querySelectorAll('.progress-rectangle')
    
    // Ensure we fill ALL rectangles over the boot sequence duration
    for (let i = 0; i < totalRectangles; i++) {
      if (rectangles[i]) {
        rectangles[i].classList.add('filled')
      }
      
      // Progressive timing that matches boot sequence phases (adjusted for 50 rectangles)
      if (i < 8) {
        await this.delay(rectangleDelay * 0.8) // Start slower
      } else if (i < 16) {
        await this.delay(rectangleDelay * 1.2) // Match loading phase
      } else if (i < 25) {
        await this.delay(rectangleDelay * 0.6) // Speed up for connections
      } else if (i < 35) {
        await this.delay(rectangleDelay * 0.4) // Fast during ASCII art
      } else if (i < 45) {
        await this.delay(rectangleDelay * 1.0) // Normal for system messages
      } else {
        await this.delay(rectangleDelay * 1.5) // Slow down for completion
      }
    }
    
    // Force complete fill as backup
    rectangles.forEach(rect => {
      if (rect && !rect.classList.contains('filled')) {
        rect.classList.add('filled')
      }
    })
  }
  
  async waitForContinueShort() {
    console.log('Waiting for continue - 0.5 second timeout or user interaction')
    return new Promise((resolve) => {
      // Auto-continue after 0.5 seconds or on any key press/click
      const timeout = setTimeout(() => {
        console.log('Auto-continuing after timeout')
        resolve()
      }, 500) // Very brief pause after boot sequence completes
      
      const handleKeyPress = (e) => {
        console.log('Key pressed, continuing')
        clearTimeout(timeout)
        document.removeEventListener('keydown', handleKeyPress)
        document.removeEventListener('click', handleClick)
        resolve()
      }
      
      const handleClick = (e) => {
        console.log('Click detected, continuing')
        clearTimeout(timeout)
        document.removeEventListener('keydown', handleKeyPress)
        document.removeEventListener('click', handleClick)
        resolve()
      }
      
      document.addEventListener('keydown', handleKeyPress)
      document.addEventListener('click', handleClick)
    })
  }
  
  delay(ms) {
    return new Promise((resolve) => {
      if (this.isSkipped) {
        resolve()
        return
      }
      
      const timeout = setTimeout(() => {
        resolve()
      }, ms)
      
      // Store resolver for skip functionality
      this.skipResolver = () => {
        clearTimeout(timeout)
        resolve()
      }
    })
  }
  
  // Terminal power-on effect with CRT-style warm-up and degauss (25% faster)
  async terminalPowerOn() {
    const bootContent = document.querySelector('.boot-content')
    const bootSequence = document.querySelector('.boot-sequence')
    
    if (bootContent && bootSequence) {
      // Start with complete darkness
      bootSequence.style.background = '#000000'
      bootContent.style.opacity = '0'
      bootContent.style.filter = 'brightness(0)'
      
      // Immediate CRT monitor degauss effect on startup
      console.log('Starting CRT monitor degauss on power-on')
      this.playDegaussSound()
      
      // Start warm-up immediately when user clicks - runs concurrently with degauss
      console.log('Starting fast CRT warm-up sequence immediately on user interaction')
      this.startFastWarmUp(bootContent, bootSequence)
      
      // Wait a moment then trigger the visual degauss effect (runs concurrently with warm-up)
      setTimeout(() => {
        this.triggerDegaussEffect()
      }, 200) // Small delay so degauss happens as screen starts to appear
      
      // Subtle final flicker after warm-up completes
      setTimeout(() => {
        bootContent.style.animation = 'terminalFlicker 0.1s ease-in-out 1'
      }, 600) // Much faster after warm-up
    }
  }
  
  // Fast CRT warm-up that runs in background while intro plays
  startFastWarmUp(bootContent, bootSequence) {
    // Set up smooth transitions (50% slower)
    bootContent.style.transition = 'opacity 0.12s cubic-bezier(0.4, 0, 0.2, 1), filter 0.12s cubic-bezier(0.4, 0, 0.2, 1)'
    bootSequence.style.transition = 'background 0.12s cubic-bezier(0.4, 0, 0.2, 1)'
    
    // Fast progression from 0.1 to 1.0 in 10 equal increments over ~600ms
    const increments = [
      { opacity: 0.1, brightness: 0.1, time: 0 },
      { opacity: 0.2, brightness: 0.2, time: 60 },
      { opacity: 0.3, brightness: 0.3, time: 120 },
      { opacity: 0.4, brightness: 0.4, time: 180 },
      { opacity: 0.5, brightness: 0.5, time: 240 },
      { opacity: 0.6, brightness: 0.6, time: 300 },
      { opacity: 0.7, brightness: 0.7, time: 360 },
      { opacity: 0.8, brightness: 0.8, time: 420 },
      { opacity: 0.9, brightness: 0.9, time: 480 },
      { opacity: 1.0, brightness: 1.0, time: 540 }
    ]
    
    increments.forEach((step, index) => {
      setTimeout(() => {
        // Gradual background glow that matches opacity progression
        const glowIntensity = Math.round(step.opacity * 40).toString(16).padStart(2, '0')
        const glowRadius = Math.round(20 + (step.opacity * 50))
        
        if (step.opacity < 1.0) {
          bootSequence.style.background = `radial-gradient(circle at center, #00${glowIntensity}00 0%, #000000 ${glowRadius}%)`
        } else {
          bootSequence.style.background = '#000000'
        }
        
        bootContent.style.opacity = step.opacity.toString()
        bootContent.style.filter = `brightness(${step.brightness}) contrast(1)`
        
        console.log(`CRT warm-up step ${index + 1}/10: opacity ${step.opacity}, brightness ${step.brightness}`)
      }, step.time)
    })
    
    // Clear transitions after warm-up completes
    setTimeout(() => {
      bootContent.style.transition = ''
      bootSequence.style.transition = ''
      console.log('CRT warm-up completed - smooth progression from 0.1 to 1.0')
    }, 600)
  }
  
  // System wake-up with cursor and initial prompt (25% faster)
  async systemWakeUp() {
    if (this.textElement) {
      // Show blinking cursor first
      const cursorElement = document.createElement('div')
      cursorElement.innerHTML = '<span style="color: #FFB000; animation: blink 1s infinite;">█</span>'
      this.textElement.appendChild(cursorElement)
      await this.delay(200) // Much faster cursor display
      
      // Remove cursor and show initial system message
      cursorElement.remove()
      
      // Add retro terminal startup pattern
      const startupLines = [
        '',
        '████████████████████████████████████████████████████████',
        '██                                                    ██',
        '██          BERRYBOT TERMINAL SYSTEM v3.14            ██',
        '██                                                    ██',
        '████████████████████████████████████████████████████████',
        '',
        'SYSTEM POWER: ON',
        'TERMINAL READY',
        'INITIALIZING BOOT SEQUENCE...',
        ''
      ]
      
      for (const line of startupLines) {
        const lineElement = document.createElement('div')
        lineElement.className = 'boot-line'
        lineElement.style.color = line.includes('█') ? '#FFB000' : '#00FF00'
        lineElement.style.textShadow = '0 0 5px currentColor'
        
        if (line.includes('█')) {
          lineElement.style.letterSpacing = '1px'
        }
        
        this.textElement.appendChild(lineElement)
        
        if (line.trim()) {
          // Ultra fast typing for ASCII art and text
          const typingSpeed = line.includes('█') ? 1.5 : 8 // Much faster for 20s target
          for (let i = 0; i < line.length; i++) {
            lineElement.textContent += line[i]
            
            // Play typing sound for visible characters (not spaces)
            if (line[i] !== ' ') {
              this.playKeypressSound()
            }
            
            await this.delay(typingSpeed)
          }
        } else {
          lineElement.innerHTML = '&nbsp;'
        }
        
        // Scroll to keep current content visible
        this.textElement.scrollTop = this.textElement.scrollHeight
        await this.delay(line.includes('BERRYBOT') ? 80 : 25) // Much faster line delays
      }
      
      await this.delay(125) // Much faster system wake-up completion
    }
  }
  
  // Terminal power-off effect (25% faster)
  async terminalPowerOff() {
    const bootContent = document.querySelector('.boot-content')
    const bootSequence = document.querySelector('.boot-sequence')
    
    if (bootContent && bootSequence) {
      // Add fade-out flicker effect (faster)
      for (let i = 0; i < 1; i++) {
        bootContent.style.opacity = '0.7'
        bootContent.style.filter = 'brightness(0.7)'
        await this.delay(30) // Much faster flicker
        bootContent.style.opacity = '1'
        bootContent.style.filter = 'brightness(1)'
        await this.delay(15) // Much faster flicker
      }
      
      // Final CRT-style collapse to center point (faster)
      bootContent.style.transition = 'all 0.3s ease-in' // Much faster collapse
      bootContent.style.transform = 'scaleY(0.01) scaleX(1)'
      bootContent.style.filter = 'brightness(2) contrast(2)'
      await this.delay(150) // Much faster timing
      
      bootContent.style.transform = 'scaleY(0.001) scaleX(0.1)'
      bootContent.style.filter = 'brightness(0)'
      await this.delay(150) // Much faster timing
      
      // Reset styles
      bootContent.style.transition = ''
      bootContent.style.transform = ''
      bootContent.style.filter = ''
      bootContent.style.opacity = '1'
    }
  }
  
  // Enhanced system malfunction effect with retro terminal glitches
  async triggerMalfunction() {
    const bootContent = document.querySelector('.boot-content')
    const bootLines = document.querySelectorAll('.boot-line')
    
    if (bootContent && bootLines.length > 0) {
      console.log('System malfunction triggered - adding audio glitch effects')
      
      // AUDIO GLITCH EFFECTS - Distort currently playing sounds (degauss moved to startup)
      const glitchType = Math.floor(Math.random() * 2)
      
      switch (glitchType) {
        case 0: // Play glitch sound + distort current audio
          this.playGlitchSound()
          this.distortAllCurrentAudio(300)
          break
        case 1: // Pure audio distortion only
          this.distortAllCurrentAudio(400)
          break
      }
      
      // Terminal interference pattern
      bootContent.style.filter = 'contrast(1.5) brightness(1.2)'
      
      // Random horizontal displacement (classic CRT glitch)
      const glitchIntensity = Math.random() * 20 + 5
      bootContent.style.transform = `translateX(${Math.random() < 0.5 ? '-' : ''}${glitchIntensity}px)`
      
      // Add corruption to random recent lines
      const recentLines = Array.from(bootLines).slice(-8) // Last 8 lines
      const corruptedLines = []
      
      recentLines.forEach(line => {
        if (Math.random() < 0.4) {
          const originalText = line.textContent
          const corruptedText = this.corruptText(originalText)
          line.textContent = corruptedText
          line.style.color = '#FF0000'
          line.style.animation = 'textCorruption 0.1s infinite'
          corruptedLines.push({ element: line, original: originalText })
        }
      })
      
      // Brief screen flash
      bootContent.style.background = 'rgba(255, 0, 0, 0.1)'
      
      await this.delay(113) // was 150
      
      // Quick recovery flicker (25% faster)
      bootContent.style.filter = 'brightness(0.5)'
      await this.delay(38) // was 50
      bootContent.style.filter = 'brightness(1.5)'
      await this.delay(38) // was 50
      
      // Restore normal state
      bootContent.style.filter = ''
      bootContent.style.transform = ''
      bootContent.style.background = ''
      
      // Restore corrupted text after a moment (25% faster)
      setTimeout(() => {
        corruptedLines.forEach(({ element, original }) => {
          element.textContent = original
          element.style.color = ''
          element.style.animation = ''
        })
      }, 225) // was 300
    }
  }
  
  // Create corrupted text effect
  corruptText(text) {
    const corruptChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`'
    const glitchChars = '█▓▒░▄▀■□▪▫'
    let corrupted = ''
    
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        corrupted += ' '
      } else if (Math.random() < 0.3) {
        // Replace with random corruption
        corrupted += Math.random() < 0.7 
          ? corruptChars[Math.floor(Math.random() * corruptChars.length)]
          : glitchChars[Math.floor(Math.random() * glitchChars.length)]
      } else {
        corrupted += text[i]
      }
    }
    
    return corrupted
  }
  
  // Add periodic screen artifacts during boot
  async addScreenArtifacts() {
    const bootContent = document.querySelector('.boot-content')
    if (!bootContent) return
    
    // Random artifacts that appear occasionally
    if (Math.random() < 0.15) { // 15% chance
      const artifactType = Math.floor(Math.random() * 3)
      
      switch (artifactType) {
        case 0: // Horizontal line artifact
          const line = document.createElement('div')
          line.style.cssText = `
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #FFB000, transparent);
            top: ${Math.random() * 80 + 10}%;
            z-index: 10;
            animation: scanlineMove 0.5s ease-out forwards;
          `
          bootContent.appendChild(line)
          setTimeout(() => line.remove(), 375) // was 500 - 25% faster
          break
          
        case 1: // Brief color shift
          bootContent.style.filter = 'hue-rotate(30deg) saturate(1.5)'
          setTimeout(() => {
            bootContent.style.filter = ''
          }, 75) // was 100 - 25% faster
          break
          
        case 2: // Brightness flicker
          bootContent.style.animation = 'brightnessFlicker 0.15s ease-in-out' // was 0.2s
          setTimeout(() => {
            bootContent.style.animation = ''
          }, 150) // was 200 - 25% faster
          break
      }
    }
  }
  
  // Add subtle ambient flickering during normal boot operation
  addAmbientFlicker() {
    const bootContent = document.querySelector('.boot-content')
    if (!bootContent) return
    
    // Very subtle brightness variations that don't interrupt reading
    const flickerType = Math.floor(Math.random() * 3)
    
    switch (flickerType) {
      case 0: // Gentle brightness pulse
        bootContent.style.transition = 'filter 0.1s ease-in-out'
        bootContent.style.filter = 'brightness(0.95) contrast(1.02)'
        setTimeout(() => {
          bootContent.style.filter = 'brightness(1.02) contrast(0.99)'
          setTimeout(() => {
            bootContent.style.filter = ''
            bootContent.style.transition = ''
          }, 80)
        }, 60)
        break
        
      case 1: // Quick contrast flicker
        bootContent.style.filter = 'contrast(1.05) brightness(0.98)'
        setTimeout(() => {
          bootContent.style.filter = 'contrast(0.98) brightness(1.03)'
          setTimeout(() => {
            bootContent.style.filter = ''
          }, 40)
        }, 30)
        break
        
      case 2: // Subtle opacity variation
        bootContent.style.opacity = '0.97'
        setTimeout(() => {
          bootContent.style.opacity = '1.01'
          setTimeout(() => {
            bootContent.style.opacity = '1'
          }, 50)
        }, 40)
        break
    }
  }
}

// Add some CSS for retro terminal boot sequence styling
const bootStyles = `
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
`

// Inject styles
const styleSheet = document.createElement('style')
styleSheet.textContent = bootStyles
document.head.appendChild(styleSheet)