# BerryBot MK3 Website

Official marketing website for BerryBot MK3 - Advanced AI-Powered Trading Bot with 9-LLM Consensus Technology.

## Features

- Retro terminal/CRT aesthetic design
- Interactive terminal simulator
- Real-time trading statistics
- Responsive design
- Performance optimized

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── index.html          # Main HTML file
├── styles/            # SCSS stylesheets
│   ├── main.scss      # Main stylesheet
│   ├── variables.scss # CSS variables
│   └── components/    # Component styles
├── js/               # JavaScript modules
│   ├── main.js       # Main entry point
│   └── components/   # JS components
└── assets/           # Static assets
    ├── images/       # Images and icons
    └── fonts/        # Custom fonts
```

## Technologies

- **Build Tool**: Vite
- **Styling**: SCSS/CSS3
- **JavaScript**: ES6+ modules
- **Fonts**: Courier Prime (Google Fonts)
- **Animation**: CSS animations + Typed.js

## Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+