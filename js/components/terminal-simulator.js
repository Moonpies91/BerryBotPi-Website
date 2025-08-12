// Terminal Simulator Component

export class TerminalSimulator {
  constructor() {
    this.output = document.getElementById('terminal-output')
    this.input = document.getElementById('terminal-input')
    this.cursor = document.getElementById('cursor')
    this.history = []
    this.historyIndex = -1
    this.currentDirectory = '~'
    this.isProcessing = false
    
    this.commands = {
      help: this.showHelp.bind(this),
      clear: this.clear.bind(this),
      explain: this.explainConcept.bind(this),
      architecture: this.showArchitecture.bind(this),
      consensus: this.explainConsensus.bind(this),
      risk: this.explainRisk.bind(this),
      llm: this.explainLLM.bind(this),
      config: this.showConfig.bind(this),
      ls: this.listDirectory.bind(this),
      cd: this.changeDirectory.bind(this),
      cat: this.displayFile.bind(this),
      berrybot: this.berryBotCommand.bind(this),
      echo: this.echo.bind(this),
      whoami: this.whoami.bind(this),
      uptime: this.uptime.bind(this),
      learn: this.learnMore.bind(this),
      about: this.aboutBot.bind(this),
      matrix: this.matrixEasterEgg.bind(this),
      exit: this.exit.bind(this)
    }
    
    this.files = {
      'overview.md': 'BerryBot MK3 Overview:\n\nRevolutionary AI trading bot using 9-LLM consensus voting.\nCombines multiple AI models for robust decision-making.\nAdvanced risk management and transparent operations.',
      'architecture.txt': 'System Architecture:\n- Data Layer: Market data, news, sentiment\n- AI Engine: 9 LLM providers with consensus voting\n- Execution Engine: Order management and portfolio tracking\n- Web UI: Real-time monitoring and configuration',
      'consensus.py': '# 9-LLM Consensus Algorithm\ndef calculate_consensus(votes):\n    # Weight by confidence and accuracy\n    # Require 67% supermajority\n    # Return aggregated decision',
      'risk.py': '# Risk Management System\nclass RiskManager:\n    def assess_trade(self, trade):\n        # Position sizing\n        # Portfolio correlation\n        # Stop-loss levels\n        return risk_score',
      'config.json': '{\n  "llm_providers": 9,\n  "consensus_threshold": 0.67,\n  "max_position_size": 0.1,\n  "stop_loss": 0.02\n}'
    }
    
    this.directories = ['features', 'technology', 'performance', 'documentation', 'download']
  }
  
  init() {
    if (!this.input) return
    
    this.setupEventListeners()
    this.displayWelcome()
  }
  
  setupEventListeners() {
    this.input.addEventListener('keydown', this.handleKeyDown.bind(this))
    this.input.addEventListener('focus', this.showCursor.bind(this))
    this.input.addEventListener('blur', this.hideCursor.bind(this))
  }
  
  handleKeyDown(e) {
    if (this.isProcessing) {
      e.preventDefault()
      return
    }
    
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        this.executeCommand(this.input.value.trim())
        break
        
      case 'ArrowUp':
        e.preventDefault()
        this.navigateHistory(-1)
        break
        
      case 'ArrowDown':
        e.preventDefault()
        this.navigateHistory(1)
        break
        
      case 'Tab':
        e.preventDefault()
        this.autoComplete()
        break
        
      case 'l':
        if (e.ctrlKey) {
          e.preventDefault()
          this.clear()
        }
        break
    }
  }
  
  async executeCommand(commandLine) {
    if (!commandLine) {
      this.addOutput('')
      this.showPrompt()
      return
    }
    
    // Add command to history
    this.history.unshift(commandLine)
    this.historyIndex = -1
    
    // Display command
    this.addOutput(`user@berrybot:${this.currentDirectory}$ ${commandLine}`, 'command')
    
    // Parse command and arguments
    const [command, ...args] = commandLine.split(' ')
    
    this.isProcessing = true
    this.hideCursor()
    
    // Execute command
    if (this.commands[command.toLowerCase()]) {
      await this.commands[command.toLowerCase()](args)
    } else {
      this.addOutput(`bash: ${command}: command not found`, 'error')
      this.addOutput('Type "help" for available commands')
    }
    
    this.isProcessing = false
    this.showPrompt()
    this.input.value = ''
    this.showCursor()
  }
  
  addOutput(text, className = '') {
    const line = document.createElement('div')
    line.className = `terminal-line ${className}`
    line.textContent = text
    this.output.appendChild(line)
    this.scrollToBottom()
  }
  
  addOutputHTML(html, className = '') {
    const line = document.createElement('div')
    line.className = `terminal-line ${className}`
    line.innerHTML = html
    this.output.appendChild(line)
    this.scrollToBottom()
  }
  
  showPrompt() {
    this.addOutput('')
    this.input.focus()
  }
  
  scrollToBottom() {
    const terminalBody = this.output.closest('.terminal-body')
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight
    }
  }
  
  showCursor() {
    if (this.cursor) {
      this.cursor.style.display = 'inline'
    }
  }
  
  hideCursor() {
    if (this.cursor) {
      this.cursor.style.display = 'none'
    }
  }
  
  navigateHistory(direction) {
    if (this.history.length === 0) return
    
    this.historyIndex += direction
    
    if (this.historyIndex < -1) {
      this.historyIndex = -1
      this.input.value = ''
    } else if (this.historyIndex >= this.history.length) {
      this.historyIndex = this.history.length - 1
    }
    
    if (this.historyIndex >= 0) {
      this.input.value = this.history[this.historyIndex]
    } else {
      this.input.value = ''
    }
  }
  
  autoComplete() {
    const input = this.input.value.toLowerCase()
    const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input))
    
    if (matches.length === 1) {
      this.input.value = matches[0]
    } else if (matches.length > 1) {
      this.addOutput(`Available commands: ${matches.join(', ')}`)
    }
  }
  
  focus() {
    if (this.input) {
      this.input.focus()
    }
  }
  
  // Command implementations
  
  displayWelcome() {
    this.addOutput('BerryBot MK3 Terminal v3.14.159')
    this.addOutput('Type "help" for available commands')
    this.addOutput('')
  }
  
  showHelp() {
    this.addOutput('BerryBot MK3 Educational Terminal')
    this.addOutput('=================================')
    this.addOutput('')
    this.addOutput('Learning Commands:')
    this.addOutput('explain <topic>  - Explain core concepts')
    this.addOutput('architecture     - Show system architecture')
    this.addOutput('consensus        - Learn about 9-LLM voting')
    this.addOutput('risk             - Understand risk management')
    this.addOutput('llm <provider>   - Learn about LLM providers')
    this.addOutput('about            - About BerryBot MK3')
    this.addOutput('learn            - Learning resources')
    this.addOutput('')
    this.addOutput('System Commands:')
    this.addOutput('help             - Show this help message')
    this.addOutput('clear            - Clear terminal screen')
    this.addOutput('ls               - List files')
    this.addOutput('cat <file>       - Display file contents')
    this.addOutput('config           - Show configuration')
    this.addOutput('whoami           - Current user')
    this.addOutput('echo <text>      - Display text')
    this.addOutput('')
    this.addOutput('Try: explain consensus, architecture, or cat overview.md')
  }
  
  clear() {
    this.output.innerHTML = ''
  }
  
  async showStatus() {
    this.addOutput('BerryBot MK3 System Status')
    this.addOutput('==========================')
    await this.typeSlowly('[✓] Trading Engine: ONLINE')
    await this.typeSlowly('[✓] AI Providers: 9/9 CONNECTED')
    await this.typeSlowly('[✓] Risk Manager: ACTIVE')
    await this.typeSlowly('[✓] Market Data: STREAMING')
    await this.typeSlowly('[>] Mode: PAPER TRADING')
  }
  
  async showStats() {
    this.addOutput('Trading Statistics')
    this.addOutput('==================')
    await this.typeSlowly('Portfolio Value:    $20,340.22')
    await this.typeSlowly('Unrealized P&L:     +$10,340.22 (+103.40%)')
    await this.typeSlowly('Total Trades:       88')
    await this.typeSlowly('Win Rate:           67.3%')
    await this.typeSlowly('Avg Trade Duration: 6.9 minutes')
    await this.typeSlowly('LLM Accuracy:       85.2%')
    await this.typeSlowly('Uptime:             99.8%')
  }
  
  async runDemo(args) {
    const mode = args.includes('--mode=live') ? 'live' : 'paper'
    const confirm = args.includes('--confirm')
    
    if (mode === 'live' && !confirm) {
      this.addOutput('WARNING: Live trading mode detected!')
      this.addOutput('Use --confirm flag to proceed with real trading')
      return
    }
    
    this.addOutput(`Starting ${mode} trading demo...`)
    await this.delay(1000)
    
    this.addOutput('Initializing LLM consensus voting...')
    await this.typeSlowly('├─ OpenAI GPT-4:     ANALYZING')
    await this.typeSlowly('├─ Anthropic Claude: ANALYZING')
    await this.typeSlowly('├─ Google Gemini:    ANALYZING')
    await this.typeSlowly('└─ Consensus:        BUY (8/9 votes)')
    
    await this.delay(500)
    this.addOutput('')
    this.addOutput('Demo trade executed successfully!')
    this.addOutput(`Mode: ${mode.toUpperCase()} TRADING`)
  }
  
  showConfig() {
    this.addOutput('BerryBot MK3 Configuration')
    this.addOutput('===========================')
    this.addOutput('LLM Providers:     9 connected')
    this.addOutput('Trading Mode:      Paper Trading')
    this.addOutput('Risk Level:        Conservative')
    this.addOutput('Max Daily Trades:  10')
    this.addOutput('Stop Loss:         2.0%')
    this.addOutput('Portfolio Size:    $10,000')
    this.addOutput('Update Interval:   5 seconds')
  }
  
  listDirectory() {
    this.addOutput('total 8')
    this.addOutput('drwxr-xr-x  2 user user 4096 Jul 26 17:47 features/')
    this.addOutput('drwxr-xr-x  2 user user 4096 Jul 26 17:47 technology/')
    this.addOutput('drwxr-xr-x  2 user user 4096 Jul 26 17:47 performance/')
    this.addOutput('drwxr-xr-x  2 user user 4096 Jul 26 17:47 documentation/')
    this.addOutput('-rw-r--r--  1 user user  256 Jul 26 17:47 features.txt')
    this.addOutput('-rw-r--r--  1 user user  128 Jul 26 17:47 README.md')
    this.addOutput('-rw-r--r--  1 user user   64 Jul 26 17:47 config.json')
  }
  
  changeDirectory(args) {
    const dir = args[0]
    if (!dir) {
      this.addOutput(`cd: missing directory operand`)
      return
    }
    
    if (dir === '..') {
      this.currentDirectory = '~'
      this.addOutput(`Changed to: ${this.currentDirectory}`)
    } else if (this.directories.includes(dir)) {
      this.currentDirectory = `~/${dir}`
      this.addOutput(`Changed to: ${this.currentDirectory}`)
    } else {
      this.addOutput(`cd: ${dir}: No such file or directory`)
    }
  }
  
  downloadFile(args) {
    const filename = args[0]
    if (!filename) {
      this.addOutput('wget: missing URL operand')
      return
    }
    
    this.addOutput(`--2025-07-26 21:12:00--  ${filename}`)
    this.addOutput('Resolving berrybot.ai... 192.168.1.100')
    this.addOutput('Connecting to berrybot.ai... connected.')
    this.addOutput('HTTP request sent, awaiting response... 200 OK')
    this.addOutput(`Length: 2048 (2.0K) [application/octet-stream]`)
    this.addOutput(`Saving to: '${filename}'`)
    this.addOutput('')
    this.addOutput(`${filename}       100%[===================>]   2.00K  --.-KB/s    in 0s`)
    this.addOutput('')
    this.addOutput(`2025-07-26 21:12:00 (15.2 MB/s) - '${filename}' saved [2048/2048]`)
  }
  
  displayFile(args) {
    const filename = args[0]
    if (!filename) {
      this.addOutput('cat: missing file operand')
      return
    }
    
    if (this.files[filename]) {
      this.addOutput(this.files[filename])
    } else {
      this.addOutput(`cat: ${filename}: No such file or directory`)
    }
  }
  
  berryBotCommand(args) {
    const subcommand = args[0]
    
    switch (subcommand) {
      case 'start':
        this.addOutput('🚀 BerryBot MK3 initialized successfully!')
        this.addOutput('📊 Web UI: http://localhost:8501')
        this.addOutput('📈 Trading engine: Active')
        break
      case 'status':
        this.showStatus()
        break
      case 'config':
        this.showConfig()
        break
      default:
        this.addOutput('BerryBot MK3 Commands:')
        this.addOutput('berrybot start   - Start trading engine')
        this.addOutput('berrybot status  - Show system status')
        this.addOutput('berrybot config  - Show configuration')
    }
  }
  
  echo(args) {
    this.addOutput(args.join(' '))
  }
  
  whoami() {
    this.addOutput('user')
  }
  
  uptime() {
    this.addOutput('17:47:38 up 42 days, 13:24, 1 user, load average: 0.15, 0.09, 0.05')
  }
  
  showProcesses() {
    this.addOutput('  PID TTY          TIME CMD')
    this.addOutput(' 1234 pts/0    00:00:01 berrybot-mk3')
    this.addOutput(' 1235 pts/0    00:00:00 consensus-engine')
    this.addOutput(' 1236 pts/0    00:00:00 risk-manager')
    this.addOutput(' 1237 pts/0    00:00:00 bash')
  }
  
  showTopProcesses() {
    this.addOutput('PID  USER     CPU% MEM%    TIME+ COMMAND')
    this.addOutput('1234 user     15.2  8.4   0:42.38 berrybot-mk3')
    this.addOutput('1235 user      5.1  4.2   0:12.15 consensus-engine')
    this.addOutput('1236 user      2.8  2.1   0:05.32 risk-manager')
  }
  
  neofetch() {
    this.addOutput('                    user@berrybot')
    this.addOutput('                    -------------')
    this.addOutput('        .-.         OS: BerryBot OS 3.14.159')
    this.addOutput('       (o o)        Host: BerryBot MK3')
    this.addOutput('        | |         Kernel: 5.15.0-berrybot')
    this.addOutput('       (   )        Uptime: 42 days, 13 hours, 24 mins')
    this.addOutput('      ^^^|^^^       Packages: 2847 (apt)')
    this.addOutput('                    Shell: bash 5.1.16')
    this.addOutput('                    CPU: ARM Cortex-A78 (4) @ 2.4GHz')
    this.addOutput('                    Memory: 2.1GiB / 8.0GiB')
  }
  
  async matrixEasterEgg() {
    this.addOutput('Welcome to the Matrix...')
    const chars = '01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'
    
    for (let i = 0; i < 10; i++) {
      let line = ''
      for (let j = 0; j < 50; j++) {
        line += chars[Math.floor(Math.random() * chars.length)]
      }
      this.addOutput(line, 'matrix')
      await this.delay(100)
    }
    
    this.addOutput('You take the red pill...')
  }
  
  exit() {
    this.addOutput('logout')
    this.addOutput('')
    this.addOutput('Connection closed.')
    this.input.disabled = true
  }
  
  // Educational Commands
  
  explainConcept(args) {
    const topic = args[0]?.toLowerCase()
    
    switch (topic) {
      case 'consensus':
        this.explainConsensus()
        break
      case 'llm':
        this.explainLLM(args.slice(1))
        break
      case 'risk':
        this.explainRisk()
        break
      case 'architecture':
        this.showArchitecture()
        break
      default:
        this.addOutput('Available topics: consensus, llm, risk, architecture')
        this.addOutput('Usage: explain <topic>')
    }
  }
  
  showArchitecture() {
    this.addOutput('BerryBot MK3 System Architecture')
    this.addOutput('================================')
    this.addOutput('')
    this.addOutput('┌─────────────────────────────────────────┐')
    this.addOutput('│              Data Layer                 │')
    this.addOutput('│  • Market Data  • News  • Sentiment    │')
    this.addOutput('└─────────────┬───────────────────────────┘')
    this.addOutput('              │')
    this.addOutput('┌─────────────▼───────────────────────────┐')
    this.addOutput('│             AI Engine                   │')
    this.addOutput('│  • 9 LLM Providers  • Consensus Logic  │')
    this.addOutput('└─────────────┬───────────────────────────┘')
    this.addOutput('              │')
    this.addOutput('┌─────────────▼───────────────────────────┐')
    this.addOutput('│          Execution Engine               │')
    this.addOutput('│  • Risk Manager  • Order Management    │')
    this.addOutput('└─────────────────────────────────────────┘')
    this.addOutput('')
    this.addOutput('Each layer operates independently with clear interfaces.')
  }
  
  explainConsensus() {
    this.addOutput('9-LLM Consensus Voting System')
    this.addOutput('=============================')
    this.addOutput('')
    this.addOutput('How it works:')
    this.addOutput('1. Market data sent to 9 different LLM providers')
    this.addOutput('2. Each LLM analyzes and provides:')
    this.addOutput('   • Trade recommendation (BUY/SELL/HOLD)')
    this.addOutput('   • Confidence score (0-100%)')
    this.addOutput('   • Reasoning explanation')
    this.addOutput('3. Votes weighted by confidence & historical accuracy')
    this.addOutput('4. Requires 67% supermajority for execution')
    this.addOutput('')
    this.addOutput('Benefits:')
    this.addOutput('• Reduces individual AI bias')
    this.addOutput('• Improves decision robustness')
    this.addOutput('• Provides explainable decisions')
    this.addOutput('')
    this.addOutput('Try: cat consensus.py')
  }
  
  explainRisk() {
    this.addOutput('Advanced Risk Management System')
    this.addOutput('===============================')
    this.addOutput('')
    this.addOutput('Three-Layer Protection:')
    this.addOutput('')
    this.addOutput('1. Pre-Trade Analysis:')
    this.addOutput('   • Position sizing based on volatility')
    this.addOutput('   • Portfolio correlation checks')
    this.addOutput('   • Market condition assessment')
    this.addOutput('')
    this.addOutput('2. Real-Time Monitoring:')
    this.addOutput('   • Automatic stop-loss execution')
    this.addOutput('   • Portfolio exposure limits')
    this.addOutput('   • Drawdown protection')
    this.addOutput('')
    this.addOutput('3. Post-Trade Analysis:')
    this.addOutput('   • Performance attribution')
    this.addOutput('   • Risk-adjusted returns')
    this.addOutput('   • Continuous learning feedback')
    this.addOutput('')
    this.addOutput('Key Metrics: VaR, Sharpe Ratio, Max Drawdown')
  }
  
  explainLLM(args) {
    const provider = args[0]?.toLowerCase()
    
    this.addOutput('LLM Provider Ecosystem')
    this.addOutput('======================')
    this.addOutput('')
    
    if (!provider) {
      this.addOutput('Available providers:')
      this.addOutput('• openai    - GPT-4 models')
      this.addOutput('• anthropic - Claude models')
      this.addOutput('• google    - Gemini models')
      this.addOutput('• ollama    - Local models')
      this.addOutput('')
      this.addOutput('Usage: llm <provider>')
      return
    }
    
    switch (provider) {
      case 'openai':
        this.addOutput('OpenAI GPT-4:')
        this.addOutput('• Strength: General reasoning and market analysis')
        this.addOutput('• Use case: Complex pattern recognition')
        this.addOutput('• Integration: API-based, high reliability')
        break
      case 'anthropic':
        this.addOutput('Anthropic Claude:')
        this.addOutput('• Strength: Risk assessment and ethical reasoning')
        this.addOutput('• Use case: Conservative decision making')
        this.addOutput('• Integration: API-based, safety-focused')
        break
      case 'google':
        this.addOutput('Google Gemini:')
        this.addOutput('• Strength: Multi-modal analysis')
        this.addOutput('• Use case: Chart analysis and data integration')
        this.addOutput('• Integration: API-based, fast processing')
        break
      case 'ollama':
        this.addOutput('Local Ollama Models:')
        this.addOutput('• Strength: Privacy and low latency')
        this.addOutput('• Use case: Specialized fine-tuned models')
        this.addOutput('• Integration: Self-hosted, customizable')
        break
      default:
        this.addOutput(`Unknown provider: ${provider}`)
        this.addOutput('Available: openai, anthropic, google, ollama')
    }
  }
  
  aboutBot() {
    this.addOutput('About BerryBot MK3')
    this.addOutput('==================')
    this.addOutput('')
    this.addOutput('BerryBot MK3 represents the next evolution in')
    this.addOutput('AI-powered trading technology. Unlike traditional')
    this.addOutput('algorithmic trading systems that rely on fixed')
    this.addOutput('rules or single AI models, BerryBot leverages')
    this.addOutput('the collective intelligence of 9 different')
    this.addOutput('Large Language Models.')
    this.addOutput('')
    this.addOutput('Key Innovation: Consensus Voting')
    this.addOutput('• Reduces single-model bias')
    this.addOutput('• Improves decision accuracy')
    this.addOutput('• Provides transparent reasoning')
    this.addOutput('')
    this.addOutput('Built for professional traders who need:')
    this.addOutput('• Explainable AI decisions')
    this.addOutput('• Advanced risk management')
    this.addOutput('• Scalable architecture')
  }
  
  learnMore() {
    this.addOutput('Learning Resources')
    this.addOutput('==================')
    this.addOutput('')
    this.addOutput('Navigate the website sections:')
    this.addOutput('• Overview: Core concepts and philosophy')
    this.addOutput('• Architecture: System design and components')
    this.addOutput('• Consensus: 9-LLM voting mechanism')
    this.addOutput('• Risk Management: Multi-layer protection')
    this.addOutput('• Implementation: Technical details and setup')
    this.addOutput('')
    this.addOutput('Terminal Commands to Try:')
    this.addOutput('• cat overview.md')
    this.addOutput('• architecture')
    this.addOutput('• consensus')
    this.addOutput('• risk')
    this.addOutput('• llm openai')
    this.addOutput('')
    this.addOutput('Use the navigation menu above to explore!')
  }
  
  // Utility methods
  
  async typeSlowly(text, delay = 50) {
    const line = document.createElement('div')
    line.className = 'terminal-line'
    this.output.appendChild(line)
    
    for (let i = 0; i < text.length; i++) {
      line.textContent += text[i]
      this.scrollToBottom()
      await this.delay(delay)
    }
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}