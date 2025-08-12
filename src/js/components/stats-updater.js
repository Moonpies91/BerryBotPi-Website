// Stats Updater Component

export class StatsUpdater {
  constructor() {
    this.statsElements = {
      portfolio: document.querySelector('.stats-ticker .stat:nth-child(1) .value'),
      winRate: document.querySelector('.stats-ticker .stat:nth-child(2) .value'),
      uptime: document.querySelector('.stats-ticker .stat:nth-child(3) .value')
    }
    
    this.baseStats = {
      portfolio: 20340.22,
      winRate: 67.3,
      uptime: 99.8,
      trades: 88,
      pnl: 10340.22,
      avgDuration: 6.9,
      llmAccuracy: 85.2
    }
    
    this.isRunning = false
  }
  
  init() {
    this.isRunning = true
    this.updateDisplayStats()
  }
  
  updateStats() {
    if (!this.isRunning) return
    
    // Simulate small fluctuations in trading stats
    const variations = this.generateVariations()
    
    // Update portfolio value
    if (this.statsElements.portfolio) {
      const newPortfolio = this.baseStats.portfolio + variations.portfolio
      this.statsElements.portfolio.textContent = `$${newPortfolio.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
      
      // Add color based on change
      if (variations.portfolio > 0) {
        this.statsElements.portfolio.style.color = 'var(--terminal-green)'
      } else if (variations.portfolio < 0) {
        this.statsElements.portfolio.style.color = 'var(--terminal-red)'
      }
    }
    
    // Update win rate
    if (this.statsElements.winRate) {
      const newWinRate = Math.max(0, Math.min(100, this.baseStats.winRate + variations.winRate))
      this.statsElements.winRate.textContent = `${newWinRate.toFixed(1)}%`
    }
    
    // Update uptime (usually increases slightly)
    if (this.statsElements.uptime) {
      const newUptime = Math.min(100, this.baseStats.uptime + variations.uptime)
      this.statsElements.uptime.textContent = `${newUptime.toFixed(1)}%`
    }
    
    // Update base stats for next iteration
    this.baseStats.portfolio += variations.portfolio * 0.1
    this.baseStats.winRate += variations.winRate * 0.1
    this.baseStats.uptime += variations.uptime * 0.01
  }
  
  generateVariations() {
    return {
      // Portfolio can fluctuate ±500
      portfolio: (Math.random() - 0.5) * 1000,
      // Win rate can fluctuate ±2%
      winRate: (Math.random() - 0.5) * 4,
      // Uptime usually stays stable or increases slightly
      uptime: Math.random() * 0.1
    }
  }
  
  updateDisplayStats() {
    // Create additional live stats for performance dashboard
    this.createLiveStatsDisplay()
  }
  
  createLiveStatsDisplay() {
    const performanceSection = document.getElementById('performance')
    if (!performanceSection) return
    
    const existingStats = performanceSection.querySelector('.live-stats')
    if (existingStats) return // Already created
    
    const liveStatsHTML = `
      <div class="live-stats">
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-label">Total Trades Executed</div>
            <div class="stat-value" id="total-trades">${this.baseStats.trades}</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Portfolio Value</div>
            <div class="stat-value" id="portfolio-value">$${this.baseStats.portfolio.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</div>
          </div>
          
          <div class="stat-box">
            <div class="stat-label">Unrealized P&L</div>
            <div class="stat-value positive" id="unrealized-pnl">+$${this.baseStats.pnl.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</div>
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
            <div class="stat-value" id="last-updated">${new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC</div>
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
    `
    
    const sectionContent = performanceSection.querySelector('.section-content')
    if (sectionContent) {
      sectionContent.innerHTML = liveStatsHTML
    }
  }
  
  updateLiveStats() {
    // Update individual stat elements
    const elements = {
      totalTrades: document.getElementById('total-trades'),
      portfolioValue: document.getElementById('portfolio-value'),
      unrealizedPnl: document.getElementById('unrealized-pnl'),
      winRate: document.getElementById('win-rate'),
      avgDuration: document.getElementById('avg-duration'),
      llmAccuracy: document.getElementById('llm-accuracy'),
      systemUptime: document.getElementById('system-uptime'),
      lastUpdated: document.getElementById('last-updated')
    }
    
    const variations = this.generateVariations()
    
    // Update portfolio value
    if (elements.portfolioValue) {
      const newPortfolio = this.baseStats.portfolio + variations.portfolio
      elements.portfolioValue.textContent = `$${newPortfolio.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
    }
    
    // Update P&L
    if (elements.unrealizedPnl) {
      const newPnl = this.baseStats.pnl + (variations.portfolio * 0.5)
      const pnlPercentage = ((newPnl / (this.baseStats.portfolio - this.baseStats.pnl)) * 100).toFixed(2)
      elements.unrealizedPnl.innerHTML = `+$${newPnl.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} (+${pnlPercentage}%)`
    }
    
    // Update win rate
    if (elements.winRate) {
      const newWinRate = Math.max(0, Math.min(100, this.baseStats.winRate + variations.winRate))
      elements.winRate.textContent = `${newWinRate.toFixed(1)}%`
    }
    
    // Update timestamp
    if (elements.lastUpdated) {
      elements.lastUpdated.textContent = `${new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC`
    }
    
    // Occasionally update total trades
    if (Math.random() < 0.1 && elements.totalTrades) {
      this.baseStats.trades += 1
      elements.totalTrades.textContent = this.baseStats.trades.toString()
      
      // Flash the element to show update
      elements.totalTrades.style.color = 'var(--terminal-green)'
      setTimeout(() => {
        elements.totalTrades.style.color = ''
      }, 1000)
    }
  }
  
  simulateNewVotingCycle() {
    const votingResult = document.getElementById('voting-result')
    if (!votingResult) return
    
    const decisions = ['BUY', 'SELL', 'HOLD']
    const models = [
      'OpenAI GPT-4', 'Anthropic Claude', 'Google Gemini', 'Local Gemma3',
      'Custom LLM #1', 'Custom LLM #2', 'Custom LLM #3', 'Custom LLM #4', 'Ollama Local'
    ]
    
    // Generate random consensus
    const mainDecision = decisions[Math.floor(Math.random() * decisions.length)]
    const votes = models.map(model => {
      const decision = Math.random() < 0.8 ? mainDecision : decisions[Math.floor(Math.random() * decisions.length)]
      const confidence = Math.floor(Math.random() * 30) + 70 // 70-100%
      return { model, decision, confidence }
    })
    
    const consensusCount = votes.filter(v => v.decision === mainDecision).length
    const cycleNumber = Math.floor(Math.random() * 100) + 1
    
    // Update voting display
    const votingHTML = `
      <div class="cycle-header">Cycle #${cycleNumber}: ${mainDecision} Consensus (${consensusCount}/9 votes) - ${consensusCount >= 6 ? 'EXECUTED ✓' : 'REJECTED ✗'}</div>
      <div class="vote-breakdown">
        ${votes.map((vote, index) => {
          const prefix = index === votes.length - 1 ? '└─' : '├─'
          const decisionClass = vote.decision.toLowerCase()
          return `<div class="vote-line">${prefix} ${vote.model.padEnd(18)}: <span class="${decisionClass}">${vote.decision}</span> (${vote.confidence}% confidence)</div>`
        }).join('')}
      </div>
      <div class="final-decision">
        Final Decision: <span class="${mainDecision.toLowerCase()}">${mainDecision}</span> (Confidence: ${Math.floor(votes.reduce((sum, v) => sum + v.confidence, 0) / votes.length)}%)<br>
        ${consensusCount >= 6 ? `Trade Executed: $${(Math.random() * 10 + 1).toFixed(2)} USDT at $${(Math.random() * 10000 + 110000).toFixed(2)}` : 'Trade rejected due to insufficient consensus'}
      </div>
    `
    
    votingResult.innerHTML = votingHTML
  }
  
  stop() {
    this.isRunning = false
  }
  
  // Method to manually trigger updates (for demo purposes)
  forceUpdate() {
    this.updateStats()
    this.updateLiveStats()
    
    // Occasionally simulate new voting cycle
    if (Math.random() < 0.3) {
      this.simulateNewVotingCycle()
    }
  }
}

// Add CSS for live stats display
const statsStyles = `
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
`

// Inject styles
const styleSheet = document.createElement('style')
styleSheet.textContent = statsStyles
document.head.appendChild(styleSheet)