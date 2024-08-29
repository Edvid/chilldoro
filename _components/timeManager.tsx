"use client"
import React, { useEffect, useState } from 'react'
import TimeLeft from './timeLeft';
import { TimeInfo, PomodoroTypes } from '~/_utils/types';

export default function TimeManager() {
  const [ pomodoroType, setPomodoroType ] = useState(PomodoroTypes.normal);

  const [ sessionStartTime, setSessionStartTime ] = useState(new Date());
  const [ time, setTime ] = useState(new Date());
  const [ isPaused, setIsPaused ] = useState(false);
  const [ pausedSeconds, setPausedSeconds ] = useState(0);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "KeyF":
        setIsPaused(!isPaused);
        break;
      default:
        console.log(event.code + " was not captured");
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      if ( isPaused ) setPausedSeconds(pausedSeconds + 1);
    }, 1000)

    return () => clearInterval(timer);
  }, [ time, isPaused, pausedSeconds ])

  const rawSecondsSinceStartTime = (time.getTime() - sessionStartTime.getTime()) / 1000;
  const secondsSinceStartTime = (time.getTime() - sessionStartTime.getTime()) / 1000 - pausedSeconds;

  const timeInfo: TimeInfo = {
    sessionStartTime: sessionStartTime,
    currentTime: time,
    rawSecondsSinceStartTime: rawSecondsSinceStartTime,
    paused: pausedSeconds,
    secondsSinceStartTime: secondsSinceStartTime,
    totalRatio: secondsSinceStartTime / ((pomodoroType.active + pomodoroType.break) * 60)
  }

  return (
    <div
      autoFocus={true}
      tabIndex={0}
      onKeyDown={keyDownHandler}
    >
      <TimeLeft
        timeInfo={timeInfo}
      />
    </div>
  )
}
