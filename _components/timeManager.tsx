"use client"
import React, { useEffect, useState } from 'react'
import { TimeInfo, PomodoroTypes } from '~/_utils/types';
import ImageDisplay from '~/_components/ImageDisplay';
import clamp from '~/_utils/clamp';
import Wheel from '~/_components/wheel';

// return minimum of two numbers, but 0 if negative
function posMin(num: number, max: number) {
  return clamp(0, num, max);
}

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

  const rawSecondsSinceStartTime = (time.getTime() - sessionStartTime.getTime()) / 1000;
  const secondsSinceStartTime = rawSecondsSinceStartTime - pausedSeconds;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      if ( isPaused ) setPausedSeconds(pausedSeconds + 1);
      if ( secondsSinceStartTime >= (pomodoroType.active + pomodoroType.break) * 60 ) setSessionStartTime(new Date());
    }, 1000)

    return () => clearInterval(timer);
  }, [time, isPaused, pausedSeconds, secondsSinceStartTime, pomodoroType.active, pomodoroType.break])

  const totalPomodoroSeconds = (pomodoroType.active + pomodoroType.break) * 60
  const activeProgress = posMin(secondsSinceStartTime, pomodoroType.active * 60) / (pomodoroType.active * 60);
  const breakProgress = posMin(secondsSinceStartTime - pomodoroType.active * 60, pomodoroType.break * 60) / (pomodoroType.break * 60);

  const timeInfo: TimeInfo = {
    sessionStartTime: sessionStartTime,
    currentTime: time,
    rawSecondsSinceStartTime: rawSecondsSinceStartTime,
    paused: pausedSeconds,
    secondsSinceStartTime: secondsSinceStartTime,
    pomodoroType: pomodoroType,
    trueRatio: secondsSinceStartTime / totalPomodoroSeconds,
    displayRatio: activeProgress * 0.75 + breakProgress * 0.25
  }

  return (
    <div
      autoFocus={true}
      tabIndex={0}
      onKeyDown={keyDownHandler}
    >
      <ImageDisplay
        timeInfo={timeInfo}
      />
      <Wheel
        timeInfo={timeInfo}
      />
    </div>
  )
}
