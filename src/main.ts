import { Utils } from './utils.js';

class TimerApp {
  private timeDisplay: HTMLDivElement;
  private timerStatus: HTMLDivElement;
  private minutesInput: HTMLInputElement;
  private secondsInput: HTMLInputElement;
  private startBtn: HTMLButtonElement;
  private pauseBtn: HTMLButtonElement;
  private resetBtn: HTMLButtonElement;
  private pomodoroBtn: HTMLButtonElement;
  private shortBreakBtn: HTMLButtonElement;
  private longBreakBtn: HTMLButtonElement;
  private themeToggleBtn: HTMLButtonElement;
  
  private totalSeconds: number = 25 * 60;
  private remainingSeconds: number = 25 * 60;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private intervalId: number | null = null;
  private audio!: HTMLAudioElement;

  constructor() {
    this.timeDisplay = Utils.getElementById<HTMLDivElement>('time-display')!;
    this.timerStatus = Utils.getElementById<HTMLDivElement>('timer-status')!;
    this.minutesInput = Utils.getElementById<HTMLInputElement>('minutes-input')!;
    this.secondsInput = Utils.getElementById<HTMLInputElement>('seconds-input')!;
    this.startBtn = Utils.getElementById<HTMLButtonElement>('start-btn')!;
    this.pauseBtn = Utils.getElementById<HTMLButtonElement>('pause-btn')!;
    this.resetBtn = Utils.getElementById<HTMLButtonElement>('reset-btn')!;
    this.pomodoroBtn = Utils.getElementById<HTMLButtonElement>('pomodoro-btn')!;
    this.shortBreakBtn = Utils.getElementById<HTMLButtonElement>('short-break-btn')!;
    this.longBreakBtn = Utils.getElementById<HTMLButtonElement>('long-break-btn')!;
    this.themeToggleBtn = Utils.getElementById<HTMLButtonElement>('theme-toggle-btn')!;

    this.setupAudio();
    this.bindEvents();
    this.loadThemeFromStorage();
    this.bindThemeToggle();
    this.updateDisplay();
  }

  private setupAudio(): void {
    this.audio = new Audio();
    this.audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAxPpuPwtmMcBjiR1/LGdSgELIHO8tiJOQgZaLvt555NEAx';

  }

  private bindEvents(): void {
    this.startBtn.addEventListener('click', () => this.startTimer());
    this.pauseBtn.addEventListener('click', () => this.pauseTimer());
    this.resetBtn.addEventListener('click', () => this.resetTimer());
    
    this.pomodoroBtn.addEventListener('click', () => this.setPreset(25, 0));
    this.shortBreakBtn.addEventListener('click', () => this.setPreset(5, 0));
    this.longBreakBtn.addEventListener('click', () => this.setPreset(15, 0));
    
    this.minutesInput.addEventListener('input', () => this.updateTimerFromInputs());
    this.secondsInput.addEventListener('input', () => this.updateTimerFromInputs());
  }

  private setPreset(minutes: number, seconds: number): void {
    if (this.isRunning) {
      this.stopTimer();
    }
    
    this.minutesInput.value = minutes.toString();
    this.secondsInput.value = seconds.toString();
    this.updateTimerFromInputs();
    this.resetTimer();
  }

  private updateTimerFromInputs(): void {
    const minutes = Math.max(0, parseInt(this.minutesInput.value) || 0);
    const seconds = Math.max(0, Math.min(59, parseInt(this.secondsInput.value) || 0));
    
    this.totalSeconds = minutes * 60 + seconds;
    if (!this.isRunning) {
      this.remainingSeconds = this.totalSeconds;
      this.updateDisplay();
    }
  }

  private startTimer(): void {
    if (this.remainingSeconds <= 0) {
      this.remainingSeconds = this.totalSeconds;
    }
    
    this.isRunning = true;
    this.isPaused = false;
    this.startBtn.disabled = true;
    this.pauseBtn.disabled = false;
    this.timerStatus.textContent = 'Running';
    document.body.classList.add('timer-running');
    document.body.classList.remove('timer-paused');
    
    this.intervalId = window.setInterval(() => {
      this.remainingSeconds--;
      this.updateDisplay();
      
      if (this.remainingSeconds <= 0) {
        this.timerComplete();
      }
    }, 1000);
  }

  private pauseTimer(): void {
    this.isRunning = false;
    this.isPaused = true;
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.timerStatus.textContent = 'Paused';
    document.body.classList.remove('timer-running');
    document.body.classList.add('timer-paused');
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetTimer(): void {
    this.stopTimer();
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
    this.timerStatus.textContent = 'Ready';
    document.body.classList.remove('timer-running', 'timer-paused');
  }

  private stopTimer(): void {
    this.isRunning = false;
    this.isPaused = false;
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private timerComplete(): void {
    this.stopTimer();
    this.timerStatus.textContent = 'Time\'s up!';
    this.playSound();
    document.body.classList.remove('timer-running', 'timer-paused');
  }

  private playSound(): void {
    this.audio.play().catch(() => {
      console.log('Audio playback failed - user interaction may be required');
    });
  }

  private updateDisplay(): void {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    this.timeDisplay.textContent = timeString;
  }

  private loadThemeFromStorage(): void {
    const stored = localStorage.getItem('theme');
    const dark = stored === 'dark';
    document.body.classList.toggle('dark', dark);
    this.updateThemeIcon(dark);
  }

  private bindThemeToggle(): void {
    this.themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      this.updateThemeIcon(isDark);
    });
  }

  private updateThemeIcon(isDark: boolean): void {
    this.themeToggleBtn.textContent = isDark ? '🌙' : '☀️';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TimerApp();
});