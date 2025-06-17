# Timer App

A simple, effective timer application with pomodoro preset functionality and visual feedback. Built with TypeScript and featuring a brutalist design aesthetic.

## Features

- **⏰ Customizable Timer**: Set any duration in minutes and seconds
- **🍅 Pomodoro Presets**: Quick access to 25-minute pomodoro, 5-minute short break, and 15-minute long break
- **🎨 Visual Feedback**: Green background when running, red when paused
- **🔊 Audio Alert**: Sound notification when timer expires
- **🌓 Dark/Light Themes**: Toggle with localStorage persistence
- **📱 Responsive Design**: Works on desktop and mobile devices
- **♿ Fully Accessible**: ARIA support and keyboard navigation
- **🚀 Zero Dependencies**: Pure client-side, no server required

## Live Demo

Visit [timer.bedecarroll.com](https://timer.bedecarroll.com) to try it out.

## Quick Start

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Serve locally
npm run serve:python
# or
npm run serve
```

## How to Use

1. **Set Timer**: Enter minutes and seconds, or use one of the preset buttons
2. **Start**: Click the green "Start" button to begin countdown
3. **Pause**: Click the orange "Pause" button to pause (background turns red)
4. **Reset**: Click the red "Reset" button to restore original time
5. **Presets**: Use "Pomodoro (25:00)", "Short Break (5:00)", or "Long Break (15:00)" for quick setup

## Visual States

- **Ready**: Normal background color
- **Running**: Light green background
- **Paused**: Light red background
- **Complete**: Audio notification plays and timer shows "Time's up!"

## Technical Details

- **Frontend**: TypeScript, HTML5, CSS3
- **Audio**: Base64-encoded beep sound for compatibility
- **Storage**: Theme preference saved to localStorage
- **Build**: TypeScript compilation with modern ES modules
- **Styling**: Brutalist design with high contrast and bold borders

## Project Structure

```
timer/
├── index.html              # Main HTML with timer interface
├── styles.css              # Complete styling with timer-specific CSS
├── src/                    # TypeScript source files
│   ├── main.ts            # Timer logic and UI controls
│   ├── autocomplete.ts    # Reusable dropdown component (unused)
│   └── utils.ts           # Generic utility functions
├── package.json           # Build scripts and metadata
├── tsconfig.json          # TypeScript configuration
└── public/                # Built files (generated)
```

## Build Commands

```bash
npm run build         # Compile TS → JS, create public/ folder
npm run dev          # Watch TypeScript files for changes
npm run serve        # Serve with Node.js (requires 'serve' package)
npm run serve:python # Serve with Python HTTP server
```

## Browser Compatibility

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with ES2020 support

## Accessibility Features

- Keyboard navigation support
- Screen reader compatible
- High contrast colors
- Clear visual state indicators
- Descriptive ARIA labels

## Perfect For

- **Pomodoro Technique**: 25-minute focused work sessions
- **Break Reminders**: Short 5-minute or longer 15-minute breaks  
- **Cooking**: Kitchen timer for recipes
- **Exercise**: Workout intervals and rest periods
- **Meditation**: Timed mindfulness sessions
- **Study Sessions**: Focused learning periods

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

*A clean, functional timer that gets out of your way and helps you stay focused. The brutalist design ensures maximum readability and the audio alert makes sure you never miss when time's up.*