// Boot Sequence Component

export class BootSequence {
  constructor() {
    this.element = document.getElementById('boot-sequence')
    this.textElement = document.getElementById('boot-text')
    this.progressElement = document.getElementById('progress-bar')
    this.currentStep = 0
    this.audioFiles = {}
    this.isSkipped = false
    this.skipResolver = null
    this.loadAudioFiles()
    this.setupSpacebarSkip()
    this.steps = [
      'BERRYBOT v3.14.159 MAINFRAME SYSTEM',
      'BERRY ANALYTICS CORPORATION',
      '',
      'INITIALIZING CORE SYSTEMS...',
      'TRADING ENGINE CONTROLS...........[OK]',
      'RISK MANAGEMENT SYSTEMS............[OK]',
      'MARKET DATA PROCESSORS.............[OK]',
      'COMMUNICATIONS ARRAY...............[OK]',
      'SECURITY PROTOCOLS.................[OK]',
      '',
      'LOADING AI CONSENSUS MATRIX...',
      'PROTOCOL: MULTI-LLM INTEGRATION',
      '',
      'AI PROVIDER STATUS:',
      '> OPENAI NEURAL NETWORK.........[ACTIVE]',
      '> ANTHROPIC SYSTEMS.............[ACTIVE]',
      '> GOOGLE COGNITIVE ENGINE.......[ACTIVE]',
      '> LOCAL PROCESSING UNITS........[ACTIVE]',
      '> OLLAMA DISTRIBUTED NODES......[ACTIVE]',
      '> CUSTOM API INTERFACES.........[ACTIVE]',
      '',
      'CONSENSUS PROTOCOL VERIFICATION...[OK]',
      'MULTI-LLM VOTING SYSTEM ONLINE....[OK]',
      '',
      'TRADING ENGINE STATUS:',
      '> RISK ASSESSMENT PROTOCOLS....[LOADED]',
      '> MARKET DATA ACQUISITION.......[ACTIVE]',
      '> EXCHANGE API CONNECTIONS......[SECURE]',
      '> PAPER TRADING MODE............[ENABLED]',
      '',
      'SYSTEM DIAGNOSTICS:',
      '> CPU: RASPBERRY PI 5 ARM CORTEX..[OK]',
      '> MEMORY: 8GB NEURAL PROCESSING...[OK]',
      '> STORAGE: 256GB SSD ARCHIVE......[OK]',
      '> NEURAL NET: BERRYBOT MATRIX.....[OK]',
      '> QUANTUM PROCESSORS..............[OK]',
      '> NETWORK COMMUNICATIONS..........[OK]',
      '',
      'RUNNING COMPREHENSIVE DIAGNOSTICS...',
      '',
      'TESTING AI CONSENSUS PATHWAYS...',
      'TESTING INTER-LLM COMMUNICATIONS...',
      'TESTING VOTING ALGORITHM STABILITY...',
      'TESTING RISK ASSESSMENT PROTOCOLS...',
      'TESTING MARKET DATA INTEGRITY...',
      'TESTING SECURITY ENCRYPTION...',
      'TESTING BACKUP SYSTEMS...',
      'TESTING EMERGENCY PROTOCOLS...',
      '',
      'ALL SYSTEMS NOMINAL',
      '',
      'TRADING PROTOCOL CONFIRMED',
      'PROFIT MAXIMIZATION ENABLED',
      '',
      'BERRYBOT SYSTEM READY',
      'AWAITING USER INSTRUCTIONS...'
    ]
  }
  
  loadAudioFiles() {
    // Define audio files that can be added to /src/assets/audio/
    const audioSources = {
      startup: './assets/audio/Bootsound.mp3',
      beep: './assets/audio/beep.mp3',
      success: './assets/audio/success.mp3',
      complete: './assets/audio/complete.mp3'
    }
    
    // Preload audio files (optional - they'll load when first played)
    Object.keys(audioSources).forEach(key => {
      this.audioFiles[key] = new Audio(audioSources[key])
      this.audioFiles[key].volume = 0.3 // Set reasonable volume
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
        this.audioFiles[soundName].currentTime = 0 // Reset to start
        const playPromise = this.audioFiles[soundName].play()
        
        if (playPromise !== undefined) {
          await playPromise.catch(e => {
            if (e.name === 'NotAllowedError') {
              console.log('Audio blocked by browser - user interaction required')
              this.waitForUserInteraction(soundName)
            } else {
              console.log(`Could not play ${soundName}:`, e)
            }
          })
        }
      } catch (e) {
        console.log(`Error playing ${soundName}:`, e)
      }
    } else {
      console.log(`Audio file ${soundName} not loaded`)
    }
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
    this.completeBootSequence()
  }
  
  completeBootSequence() {
    console.log('Boot sequence completed/skipped')
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
    console.log('Boot sequence start() called')
    if (!this.element) {
      console.error('Boot sequence element not found')
      return
    }
    
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
    
    // Play startup sound
    console.log('Attempting to play startup sound')
    await this.playSound('startup')
    
    // Initial system wake-up sequence
    await this.systemWakeUp()
    
    console.log('Starting boot sequence typing...')
    // Type boot messages
    await this.typeBootSequence()
    
    console.log('Waiting for continue...')
    // Wait for user interaction or auto-continue
    await this.waitForContinue()
    
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
      
      // Variable delay between lines - retro terminal timing (25% faster)
      if (line.includes('BERRYBOT') || line.includes('PROTOCOL') || line.includes('PROFIT MAXIMIZATION')) {
        await this.delay(75) // was 100 - Slower for dramatic system messages
      } else if (line.includes('BERRY ANALYTICS')) {
        await this.delay(60) // was 80 - Corporate message timing
      } else if (line.includes('[OK]') || line.includes('[ACTIVE]') || line.includes('[LOADED]')) {
        await this.delay(11) // was 15 - Fast for status confirmations
      } else if (line.includes('INITIALIZING') || line.includes('LOADING') || line.includes('RUNNING')) {
        await this.delay(30) // was 40 - Standard for processing messages
      } else if (line.startsWith('>')) {
        await this.delay(15) // was 20 - Fast for system listings
      } else if (line.includes('READY')) {
        await this.delay(90) // was 120 - Slower for completion message
      } else {
        await this.delay(19) // was 25 - Default timing
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
        await this.delay(1.9) // was 2.5
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
        
        // Much faster timing (25% faster)
        if (percent < 10 || percent > 95) {
          await this.delay(11) // was 15 - Fast at start and end
        } else if (percent % 20 === 0) {
          await this.delay(19) // was 25 - Brief pause at 20%, 40%, 60%, 80%
        } else {
          await this.delay(6) // was 8 - Very fast normal speed
        }
      }
      
      // Final format
      const baseText = element.textContent.substring(0, element.textContent.indexOf('['))
      element.textContent = baseText + '[100%] PASSED'
      
    } else {
      // Normal typing for non-testing lines
      for (let i = 0; i < text.length; i++) {
        element.textContent += text[i]
        
        // Variable typing speed with retro terminal dramatic timing (25% faster)
        if (text.includes('PROFIT MAXIMIZATION')) {
          await this.delay(11) // was 15 - Slower for trading message
        } else if (text.includes('[OK]') || text.includes('[ACTIVE]') || text.includes('NOMINAL')) {
          await this.delay(1.1) // was 1.5 - Fast for confirmations
        } else if (text.includes('PROTOCOL') || text.includes('BERRYBOT')) {
          await this.delay(6) // was 8 - Slower for important messages
        } else if (text.includes('BERRY ANALYTICS')) {
          await this.delay(4.5) // was 6 - Corporate message pacing  
        } else if (text.includes('TESTING') || text.includes('LOADING') || text.includes('INITIALIZING')) {
          await this.delay(3) // was 4 - Standard for processing
        } else if (text.startsWith('>')) {
          await this.delay(1.5) // was 2 - Fast for system listings
        } else {
          await this.delay(2.25) // was 3 - Standard typing speed
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
  
  async waitForContinue() {
    console.log('Waiting for continue - 3 second timeout or user interaction')
    return new Promise((resolve) => {
      // Auto-continue after 0.56 seconds or on any key press/click (25% faster)
      const timeout = setTimeout(() => {
        console.log('Auto-continuing after timeout')
        resolve()
      }, 563) // was 750
      
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
  
  // Terminal power-on effect with CRT-style warm-up (25% faster)
  async terminalPowerOn() {
    const bootContent = document.querySelector('.boot-content')
    const bootSequence = document.querySelector('.boot-sequence')
    
    if (bootContent && bootSequence) {
      // Start with complete darkness
      bootSequence.style.background = '#000000'
      bootContent.style.opacity = '0'
      bootContent.style.filter = 'brightness(0)'
      
      // Simulate CRT phosphor warm-up with expanding light (25% faster)
      bootSequence.style.background = 'radial-gradient(circle at center, #001100 0%, #000000 30%)'
      await this.delay(225) // was 300
      
      bootSequence.style.background = 'radial-gradient(circle at center, #002200 0%, #000000 50%)'
      await this.delay(150) // was 200
      
      bootSequence.style.background = 'radial-gradient(circle at center, #003300 0%, #000000 70%)'
      await this.delay(113) // was 150
      
      // Flicker effect as CRT stabilizes
      for (let i = 0; i < 3; i++) {
        bootContent.style.opacity = '0.3'
        bootContent.style.filter = 'brightness(0.3) contrast(1.5)'
        await this.delay(38) // was 50
        bootContent.style.opacity = '0'
        bootContent.style.filter = 'brightness(0)'
        await this.delay(75) // was 100
      }
      
      // Final warm-up to normal state
      bootSequence.style.background = '#000000'
      bootContent.style.opacity = '1'
      bootContent.style.filter = 'brightness(1) contrast(1)'
      
      // Add subtle screen flicker
      bootContent.style.animation = 'terminalFlicker 0.1s ease-in-out 3'
    }
  }
  
  // System wake-up with cursor and initial prompt (25% faster)
  async systemWakeUp() {
    if (this.textElement) {
      // Show blinking cursor first
      const cursorElement = document.createElement('div')
      cursorElement.innerHTML = '<span style="color: #FFB000; animation: blink 1s infinite;">█</span>'
      this.textElement.appendChild(cursorElement)
      await this.delay(600) // was 800
      
      // Remove cursor and show initial system message
      cursorElement.remove()
      
      // Add retro terminal startup pattern
      const startupLines = [
        '',
        '████████████████████████████████████████████████████████',
        '██                                                    ██',
        '██          BERRYBOT TERMINAL SYSTEM v3.14           ██',
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
          // Fast typing for ASCII art, slower for text (25% faster)
          const typingSpeed = line.includes('█') ? 4 : 23 // was 5 : 30
          for (let i = 0; i < line.length; i++) {
            lineElement.textContent += line[i]
            await this.delay(typingSpeed)
          }
        } else {
          lineElement.innerHTML = '&nbsp;'
        }
        
        // Scroll to keep current content visible
        this.textElement.scrollTop = this.textElement.scrollHeight
        await this.delay(line.includes('BERRYBOT') ? 225 : 75) // was 300 : 100
      }
      
      await this.delay(375) // was 500
    }
  }
  
  // Terminal power-off effect (25% faster)
  async terminalPowerOff() {
    const bootContent = document.querySelector('.boot-content')
    const bootSequence = document.querySelector('.boot-sequence')
    
    if (bootContent && bootSequence) {
      // Add fade-out flicker effect
      for (let i = 0; i < 2; i++) {
        bootContent.style.opacity = '0.7'
        bootContent.style.filter = 'brightness(0.7)'
        await this.delay(75) // was 100
        bootContent.style.opacity = '1'
        bootContent.style.filter = 'brightness(1)'
        await this.delay(38) // was 50
      }
      
      // Final CRT-style collapse to center point
      bootContent.style.transition = 'all 0.6s ease-in' // was 0.8s
      bootContent.style.transform = 'scaleY(0.01) scaleX(1)'
      bootContent.style.filter = 'brightness(2) contrast(2)'
      await this.delay(300) // was 400
      
      bootContent.style.transform = 'scaleY(0.001) scaleX(0.1)'
      bootContent.style.filter = 'brightness(0)'
      await this.delay(300) // was 400
      
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