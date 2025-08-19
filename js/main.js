// BerryBot MK3 Website - Main JavaScript

// Import modules
import { BootSequence } from './components/boot-sequence.js'
import { TerminalSimulator } from './components/terminal-simulator.js'
import { ASCIIArt } from './components/ascii-art.js'
import { StatsUpdater } from './components/stats-updater.js'

class BerryBotWebsite {
  constructor() {
    this.bootSequence = new BootSequence()
    this.terminal = new TerminalSimulator()
    this.asciiArt = new ASCIIArt()
    this.statsUpdater = new StatsUpdater()
    
    this.init()
  }
  
  async init() {
    try {
      console.log('Starting boot sequence...')
      // Start boot sequence with timeout
      await Promise.race([
        this.bootSequence.start(),
        new Promise(resolve => setTimeout(resolve, 10000)) // 10 second timeout
      ])
      console.log('Boot sequence completed')
    } catch (error) {
      console.error('Boot sequence error:', error)
      // Force show main content if boot fails
      this.forceShowMainContent()
    }
    
    // Initialize main components after boot
    this.initializeComponents()
    
    // Setup event listeners
    this.setupEventListeners()
    
    // Start periodic updates
    this.startPeriodicUpdates()
  }
  
  forceShowMainContent() {
    const bootElement = document.getElementById('boot-sequence')
    const mainContent = document.getElementById('main-content')
    if (bootElement) bootElement.style.display = 'none'
    if (mainContent) mainContent.style.display = 'block'
  }
  
  initializeComponents() {
    // Show main content
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.style.display = 'block'
    }
    
    // Initialize ASCII art
    this.asciiArt.renderLogo()
    
    // Initialize terminal simulator
    this.terminal.init()
    
    // Type the tagline
    this.typeTagline()
    
    // Initialize stats updater
    this.statsUpdater.init()
  }
  
  setupEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleSmoothScroll.bind(this))
    })
    
    // CTA button handlers
    const initButton = document.querySelector('.cta-primary')
    const demoButton = document.querySelector('.cta-secondary')
    
    if (initButton) {
      initButton.addEventListener('click', this.handleInitializeTrading.bind(this))
    }
    
    if (demoButton) {
      demoButton.addEventListener('click', this.handlePaperTradingDemo.bind(this))
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this))
    
    // Window resize handler
    window.addEventListener('resize', this.handleResize.bind(this))
  }
  
  handleSmoothScroll(e) {
    e.preventDefault()
    const targetId = e.currentTarget.getAttribute('href')
    const targetSection = document.querySelector(targetId)
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
  
  handleInitializeTrading() {
    // Scroll to architecture section
    document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  handlePaperTradingDemo() {
    // Scroll to implementation section
    document.getElementById('implementation')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  handleKeyboardShortcuts(e) {
    // Alt + T = Focus terminal
    if (e.altKey && e.key.toLowerCase() === 't') {
      e.preventDefault()
      this.terminal.focus()
    }
    
    // Alt + H = Go to hero section
    if (e.altKey && e.key.toLowerCase() === 'h') {
      e.preventDefault()
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
    }
    
    // Escape = Clear terminal (if focused)
    if (e.key === 'Escape' && document.activeElement === this.terminal.input) {
      this.terminal.clear()
    }
  }
  
  handleResize() {
    // Adjust ASCII art size on mobile
    if (window.innerWidth < 768) {
      this.asciiArt.setMobileMode(true)
    } else {
      this.asciiArt.setMobileMode(false)
    }
  }
  
  async typeTagline() {
    const taglineElement = document.getElementById('tagline')
    if (!taglineElement) return
    
    const text = 'Teaching a circuit board to experience greed'
    taglineElement.innerHTML = ''
    
    // Add cursor
    const cursor = document.createElement('span')
    cursor.className = 'cursor'
    cursor.textContent = '█'
    taglineElement.appendChild(cursor)
    
    // Type each character
    for (let i = 0; i < text.length; i++) {
      await this.delay(25)
      taglineElement.insertBefore(
        document.createTextNode(text[i]),
        cursor
      )
    }
    
    // Remove cursor after typing
    await this.delay(500)
    cursor.remove()
  }
  
  startPeriodicUpdates() {
    // Update stats every 5 seconds
    setInterval(() => {
      this.statsUpdater.updateStats()
    }, 5000)
    
    // Glitch effect on logo occasionally - WITH SOUND
    setInterval(() => {
      if (Math.random() < 1.0) { // 100% chance every 5 seconds (TESTING)
        console.log('🎯 Triggering periodic logo glitch effect WITH SOUND')
        this.asciiArt.glitchEffect(true) // Pass true to enable sound
      }
    }, 5000) // Every 5 seconds for testing
    
    // Add manual trigger for testing (remove after testing) - WITH SOUND
    setTimeout(() => {
      console.log('🎯 Manual test glitch trigger in 5 seconds WITH SOUND...')
      this.asciiArt.glitchEffect(true) // Pass true to enable sound
    }, 5000)
    
    // Random system glitches
    setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance every 15 seconds
        this.triggerRandomGlitch()
      }
    }, 15000)
  }
  
  // Add random glitch effects to main content
  triggerRandomGlitch() {
    const elements = document.querySelectorAll('.section-content h2, .section-content h3, .terminal-prompt, .nav-link')
    if (elements.length > 0) {
      const randomElement = elements[Math.floor(Math.random() * elements.length)]
      
      // Add glitch effect
      randomElement.classList.add('text-corrupt')
      
      // Remove after random duration
      setTimeout(() => {
        randomElement.classList.remove('text-corrupt')
      }, Math.random() * 1000 + 300) // 0.3-1.3 seconds
      
      // Occasionally trigger additional glitch lines
      if (Math.random() < 0.3) {
        const lines = document.querySelector('.glitch-lines')
        if (lines) {
          lines.style.opacity = '1'
          setTimeout(() => {
            lines.style.opacity = '0'
          }, 150)
        }
      }
    }
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  let website = null
  let hasStarted = false
  
  const startWebsite = async () => {
    if (!hasStarted) {
      hasStarted = true
      
      // Remove the interaction listeners after starting
      document.removeEventListener('click', startWebsite)
      document.removeEventListener('keydown', startWebsite)
      document.removeEventListener('touchstart', startWebsite)
      
      // Remove the interaction overlay
      const overlay = document.getElementById('interaction-overlay')
      if (overlay) {
        overlay.remove()
      }
      
      // Start the boot sequence properly (this will run the full boot animation)
      website = new BerryBotWebsite()
    }
  }
  
  // Show a message prompting user interaction
  const showInteractionPrompt = () => {
    const bootElement = document.getElementById('boot-sequence')
    if (bootElement) {
      // Add a temporary overlay instead of replacing the boot content
      const overlay = document.createElement('div')
      overlay.id = 'interaction-overlay'
      overlay.style.cssText = `
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
      `
      overlay.innerHTML = `
        <div style="text-align: center;">
          <div style="color: #00FF41; font-family: monospace; font-size: 1.2rem; margin-bottom: 2rem;">
            BERRYBOT MK3 READY TO INITIALIZE
          </div>
          <div style="color: #00FF41; font-family: monospace; font-size: 0.9rem; margin-bottom: 1rem;">
            Click anywhere or press any key to begin boot sequence
          </div>
          <div style="color: #888; font-family: monospace; font-size: 0.8rem;">
            [Audio will be enabled after interaction]
          </div>
        </div>
      `
      document.body.appendChild(overlay)
    }
  }
  
  // Show the prompt immediately
  showInteractionPrompt()
  
  // Start the website when user interacts
  document.addEventListener('click', startWebsite)
  document.addEventListener('keydown', startWebsite)
  document.addEventListener('touchstart', startWebsite)
})

// Add matrix rain effect (optional)
class MatrixRain {
  constructor() {
    this.container = null
    this.columns = []
    this.animationId = null
  }
  
  init() {
    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return // Skip on mobile or reduced motion
    }
    
    this.container = document.createElement('div')
    this.container.className = 'matrix-rain'
    document.body.appendChild(this.container)
    
    this.createColumns()
    this.animate()
  }
  
  createColumns() {
    const columnCount = Math.floor(window.innerWidth / 20)
    const characters = '01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'
    
    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div')
      column.className = 'matrix-column'
      column.style.left = `${i * 20}px`
      column.style.animationDuration = `${Math.random() * 3 + 2}s`
      column.style.animationDelay = `${Math.random() * 2}s`
      
      // Generate random characters
      let text = ''
      for (let j = 0; j < Math.floor(Math.random() * 20) + 10; j++) {
        text += characters[Math.floor(Math.random() * characters.length)] + '\n'
      }
      column.textContent = text
      
      this.container.appendChild(column)
      this.columns.push(column)
    }
  }
  
  animate() {
    // Regenerate columns periodically
    setTimeout(() => {
      if (this.container) {
        this.container.innerHTML = ''
        this.columns = []
        this.createColumns()
        this.animate()
      }
    }, 10000)
  }
  
  destroy() {
    if (this.container) {
      this.container.remove()
      this.container = null
    }
    this.columns = []
  }
}

// Initialize matrix rain effect after page load
window.addEventListener('load', () => {
  const matrixRain = new MatrixRain()
  matrixRain.init()
})