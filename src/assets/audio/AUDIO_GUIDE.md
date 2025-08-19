# BerryBot Audio Files Guide

## Required Audio Files

Place these audio files in the `/src/assets/audio/` directory:

### 1. `Bootsound.mp3` - Main Startup Sound
- **When it plays**: At the very beginning of the boot sequence
- **Suggested sound**: Deep computer startup sound, like a retro system powering on
- **Duration**: 2-5 seconds
- **Volume**: Will be automatically set to 30% in code
- **Style**: Think classic computer boot sounds, electronic power-on tones

### 2. `beep.mp3` - System Process Sound  
- **When it plays**: During "TESTING...", "LOADING...", "INITIALIZING..." lines
- **Suggested sound**: Short electronic beep or blip
- **Duration**: 0.1-0.5 seconds
- **Style**: Classic terminal beep, computer processing sound, retro beep

### 3. `success.mp3` - Status Confirmation Sound
- **When it plays**: When lines contain "[OK]", "[ACTIVE]", "[LOADED]", "NOMINAL"
- **Suggested sound**: Pleasant confirmation beep or success tone
- **Duration**: 0.3-1 second  
- **Style**: Positive computer confirmation sound, success chirp

### 4. `complete.mp3` - System Ready Sound
- **When it plays**: For "BERRYBOT SYSTEM READY" and "PROFIT MAXIMIZATION ENABLED"
- **Suggested sound**: Triumphant completion tone or startup complete sound
- **Duration**: 1-3 seconds
- **Style**: System fully loaded sound, mission complete tone

### 5. `keypress.mp3` - Typing Sound Effect
- **When it plays**: For every character typed during the boot sequence
- **Suggested sound**: Retro computer keyboard click or terminal keypress
- **Duration**: 0.05-0.2 seconds (very short)
- **Volume**: Automatically set to 15% (lower than other sounds)
- **Style**: Classic computer keyboard click, mechanical switch sound, or retro terminal beep

### 6. `hdd_startup.mp3` - Hard Drive Startup Sound
- **When it plays**: Once at the beginning, right after main startup sound
- **Suggested sound**: Hard drive spinning up from cold start
- **Duration**: 5-20 seconds (plays once only) - longer sounds are more realistic
- **Volume**: Automatically set to 25% (medium level)
- **Style**: Vintage HDD spin-up sound, mechanical drive starting, disk initialization

### 7. `hdd_loop.mp3` - Hard Drive Activity Loop
- **When it plays**: Continuously after startup sound finishes (loops seamlessly)
- **Suggested sound**: Steady hard drive activity, disk reading/writing
- **Duration**: 2-5 minutes (longer files loop less noticeably)
- **Volume**: Automatically set to 20% (background level)  
- **Style**: Continuous HDD activity sound, gentle disk clicking, steady drive operation
- **IMPORTANT**: For seamless looping, ensure the audio file has no silence at start/end and the waveform connects smoothly from end to beginning

### 8. `glitch.mp3` - System Malfunction Sound (Optional)
- **When it plays**: Randomly during visual glitches and system malfunctions
- **Suggested sound**: Digital distortion, electronic interference, system error beep
- **Duration**: 0.2-1 second (short burst)
- **Volume**: Automatically set to 40% (noticeable but not overwhelming)
- **Style**: Harsh digital noise, electronic corruption, retro computer error sounds
- **Note**: When glitches occur, existing audio (HDD, typing, etc.) will also be distorted with volume/speed changes

### 9. `ambient.mp3` - Ambient Computer Room Sound (Optional)
- **When it plays**: Starts 2 seconds after HDD loop begins, continues throughout website
- **Suggested sound**: Computer room ambience, distant electronics, subtle electrical hum
- **Duration**: 1-10 minutes (longer files loop less noticeably)
- **Volume**: Automatically set to 15% (very subtle background)
- **Style**: Subtle computer room atmosphere, electrical ambience, datacenter sounds

### 10. `fan_noise.mp3` - Computer Fan Sound (Optional)
- **When it plays**: Starts 5 seconds after HDD loop begins, continues throughout website
- **Suggested sound**: Computer cooling fans, case ventilation, quiet system fans
- **Duration**: 1-10 minutes (longer files loop less noticeably)
- **Volume**: Automatically set to 10% (very quiet background)
- **Style**: Gentle fan whir, computer cooling sounds, system ventilation noise

### 11. `degauss.mp3` - CRT Monitor Degauss Sound (Optional)
- **When it plays**: At the very beginning of boot sequence (monitor power-on degauss)
- **Suggested sound**: Classic CRT monitor degaussing, magnetic field reset sound  
- **Duration**: 1-3 seconds (classic degauss timing)
- **Volume**: Automatically set to 35% (noticeable but balanced)
- **Style**: Authentic CRT degauss sound, electromagnetic coil noise, monitor reset tone
- **Effect**: Triggers full-screen degauss distortion effect that warps the entire display

## Audio Format Requirements

- **Format**: MP3 files (most compatible)
- **Alternative formats**: WAV, OGG also supported
- **Quality**: 44.1kHz, any bitrate (128kbps+ recommended)
- **File size**: Keep under 500KB each for fast loading

## Where to Find Sounds

### Free Sources:
- **Freesound.org** - Extensive library of computer/tech sounds
- **Zapsplat** - Good for retro computer effects (free with registration)  
- **BBC Sound Effects Library** - Classic electronic sounds
- **Pixabay Audio** - Free sounds including computer/tech category

### Search Terms:
- "computer startup"
- "retro beep" 
- "terminal sound"
- "electronic confirmation"
- "system boot"
- "computer process"
- "success tone"

## Testing Your Audio

1. Add your audio files to this directory
2. Refresh your website at http://localhost:3000/
3. The boot sequence will automatically attempt to load and use the sounds
4. Check browser console for any audio loading messages
5. Click anywhere on the page if audio doesn't play (browser security requirement)

## File Naming (Important!)

Make sure your files are named exactly:
- `Bootsound.mp3` (capital B, capital S)
- `beep.mp3` (all lowercase)
- `success.mp3` (all lowercase) 
- `complete.mp3` (all lowercase)
- `keypress.mp3` (all lowercase)
- `hdd_startup.mp3` (all lowercase with underscore)
- `hdd_loop.mp3` (all lowercase with underscore) - LONGER DURATION RECOMMENDED
- `glitch.mp3` (all lowercase) - OPTIONAL
- `ambient.mp3` (all lowercase) - OPTIONAL
- `fan_noise.mp3` (all lowercase with underscore) - OPTIONAL
- `degauss.mp3` (all lowercase) - OPTIONAL

## Browser Compatibility

The code includes automatic audio unlocking for modern browsers that block autoplay. Audio will work in:
- Chrome 66+
- Firefox 69+
- Safari 11+
- Edge 79+

If no audio files are found, the boot sequence will continue normally without sound.

## Creating Seamless Audio Loops

For the `hdd_loop.mp3` file to loop perfectly without gaps or clicks:

1. **Trim Silence**: Remove any silence at the beginning and end of the audio file
2. **Match Waveforms**: Ensure the end of the audio connects smoothly to the beginning
3. **Use Audio Editing Software**: Tools like Audacity (free) can help create perfect loops:
   - Use "Generate > Silence" to add exact timing
   - Use "Effect > Crossfade Tracks" to smooth transitions
   - Check waveform visually to ensure smooth connection
4. **Test the Loop**: Play the file multiple times to check for clicks or gaps
5. **Export Settings**: Use consistent bitrate and sample rate (44.1kHz recommended)