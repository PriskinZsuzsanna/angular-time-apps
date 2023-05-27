import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-counter';
  //elements
  counterElement: boolean = false
  stopwatchElement: boolean = false
  clockElement: boolean = false
  alarmElement: boolean = false
  timerElement: boolean = false

  //counter
  counter = 0;

  //stopwatch
  minutes = 0;
  seconds = 0;
  mSeconds = 0;
  paused: boolean = true;
  interval: any;

  //clock
  clockSeconds = new Date().getSeconds();
  clockMinutes = new Date().getMinutes();
  clockHours = new Date().getHours();

  //alarm
  audio = new Audio();
  alarmSeconds = 0
  alarmMinutes = 0
  alarmHours = 7
  ringing: boolean = false
  alarmInterval: any
  sneezeInterval: any

  //timer
  timerMinutes = 10;
  timerSeconds = 0;
  timerInterval: any;
  sneezing: boolean = false;
  timerRinging: boolean = false;
  timerPaused: boolean = true;
  countdownInterval: any;
  sneezeTimerInterval: any;


  //-------------------

  //elements
  showClicked(event: Event) {
    let clicked = (event.target as Element).id
    this.counterElement = false
    this.stopwatchElement = false
    this.clockElement = false
    this.alarmElement = false
    this.timerElement = false

    if (clicked == "counter-btn") {
      this.counterElement = true
    } else if (clicked == "stopwatch-btn") {
      this.stopwatchElement = true
    } else if (clicked == "clock-btn") {
      this.clockElement = true
    } else if (clicked == "alarm-btn") {
      this.alarmElement = true
    } else if (clicked == "timer-btn") {
      this.timerElement = true
    }
  }

  //close elements
  close() {
    this.counterElement = false
    this.stopwatchElement = false
    this.clockElement = false
    this.alarmElement = false
    this.timerElement = false
  }


  //counter
  count(value: string) {
    switch (value) {
      case '+':
        this.counter++;
        break;
      case '-':
        this.counter--;
        break;
      default:
        this.counter = 0;
        break;
    }
  }

  //stopwatch
  start() {
    if (this.paused) {
      this.paused = false
      this.interval =
        setInterval(() => {
          this.mSeconds =+ this.mSeconds + 10
          if(this.mSeconds == 100){
            this.mSeconds = 0
            this.seconds++
          }
          if (this.seconds == 60) {
            this.seconds = 0;
            this.minutes++
          }
        }, 100)
    } else if (!this.paused) {
      clearInterval(this.interval)
      this.paused = true
    }
  }


  reset() {
    this.minutes = 0;
    this.seconds = 0;
    this.mSeconds = 0
    clearInterval(this.interval)
    this.paused = true
  }


  //clock
  ngOnInit(): void {
    //timer, alarm
    this.audio.src = "assets/alarm.mp3";
    this.audio.load();
    //clock
    setInterval(() => {
      this.getTime()
      this.ringAlarm()
    }, 1000)

  }

  getTime() {
    let date = new Date();
    this.clockHours = date.getHours()
    this.clockMinutes = date.getMinutes()
    this.clockSeconds = date.getSeconds()
  }

  //alarm

  playAudio() {
    this.audio.play();
  }


  ringAlarm() {
    if (this.clockHours == this.alarmHours && this.clockMinutes == this.alarmMinutes && this.clockSeconds == this.alarmSeconds) {
      this.ringing = true
      this.playAudio()
      this.alarmInterval = setInterval(() => {
        this.playAudio();
      }, 10000)
    }
  }

  clearAlarmInterval() {
    clearInterval(this.alarmInterval)
  }
  clearSneezeInterval() {
    clearInterval(this.sneezeInterval)
  }

  stopAlarm() {
    this.audio.pause()
    this.audio.currentTime = 0
    this.clearAlarmInterval()
    this.clearSneezeInterval()
    this.alarmHours = 7;
    this.alarmMinutes = 0
    this.ringing = false
  }

  sneezeAlarm() {
    this.audio.pause()
    this.clearAlarmInterval()
    this.audio.currentTime = 0
    this.sneezeInterval = setInterval(() => {
      this.playAudio();
    }, 20000)

  }

  //timer
  startPauseTimer() { //countdown
    if (this.timerPaused) {
      this.timerPaused = false
      this.countdownInterval =
        setInterval(() => {
          if (this.timerMinutes == 0 && this.timerSeconds == 0 && !this.sneezing) { //start ringing
            this.clearTimerInterval()
            this.timerRinging = true
            this.playAudio()
            this.timerInterval = setInterval(() => {
              this.playAudio();
            }, 10000)
            return
          } else if (this.timerSeconds == 0) {
            this.timerSeconds = 60;
            this.timerMinutes--
          }
          this.timerSeconds--
        }, 1000)
    } else if (!this.timerPaused) {
      clearInterval(this.countdownInterval)
      this.timerPaused = true

    }

  }

  clearCountdownInterval() {
    clearInterval(this.countdownInterval)
  }
  clearTimerInterval() {
    clearInterval(this.timerInterval)
  }
  clearSneezeTimerInterval() {
    clearInterval(this.sneezeTimerInterval)
  }

  resetTimer() { //countdown, ringing
    this.audio.pause()
    this.audio.currentTime = 0
    this.clearTimerInterval()
    this.clearCountdownInterval()
    this.clearSneezeTimerInterval()
    this.timerMinutes = 10;
    this.timerSeconds = 0
    this.timerRinging = false
    this.timerPaused = true
    this.sneezing = false
  }

  sneezeTimer() {
    this.audio.pause()
    this.sneezing = true
    this.clearTimerInterval()
    this.clearCountdownInterval()
    this.audio.currentTime = 0
    this.sneezeTimerInterval = setInterval(() => {
      this.playAudio();
    }, 20000)

  }



}

