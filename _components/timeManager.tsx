"use client"
import React, { useEffect, useState } from 'react'
import { TimeInfo, PomodoroTypes } from '~/_utils/types';
import ImageDisplay from '~/_components/ImageDisplay';
import clamp from '~/_utils/clamp';
import Wheel from '~/_components/wheel';
import MuteIconDisplay from '~/_components/MuteIconDisplay';
import HelpText from '~/_components/HelpText';
import { isMuted, mute } from '~/_utils/audio';
import { keyBinds } from '~/_utils/keyBinds';

// return minimum of two numbers, but 0 if negative
function posMin(num: number, max: number) {
  return clamp(0, num, max);
}

export default function TimeManager() {
  const [ pomodoroType, setPomodoroType ] = useState(PomodoroTypes.normal);

  const [ sessionStartTime, setSessionStartTime ] = useState(new Date());
  const [ time, setTime ] = useState(new Date());
  const [ isPaused, setIsPaused ] = useState(false);
  const [ showHelpPage, setShowHelpPage ] = useState(false);
  const [ pausedSeconds, setPausedSeconds ] = useState(0);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keyCode = event.code;
    switch (keyCode as keyof typeof keyBinds) {
      case "KeyH":
        setShowHelpPage(!showHelpPage);
        break;
      case "KeyF":
        setIsPaused(!isPaused);
        break;
      case "KeyM":
        mute();
        break;
      default:
        console.log(event.code + " was not captured");
    }
  }

  const rawSecondsSinceStartTime = (time.getTime() - sessionStartTime.getTime()) / 1000;
  const secondsSinceStartTime = rawSecondsSinceStartTime - pausedSeconds;

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      const diff = (newTime.getTime() - time.getTime()) / 1000;
      setTime(newTime);
      if ( isPaused ) {
        setPausedSeconds(pausedSeconds + diff);
      }
      if ( secondsSinceStartTime >= (pomodoroType.active + pomodoroType.break) * 60 ) setSessionStartTime(new Date());
    }, 100)

    return () => clearInterval(timer);
  }, [time, isPaused, pausedSeconds, secondsSinceStartTime, pomodoroType.active, pomodoroType.break])

  const totalPomodoroSeconds = (pomodoroType.active + pomodoroType.break) * 60
  const activeProgress = posMin(secondsSinceStartTime, pomodoroType.active * 60) / (pomodoroType.active * 60);
  const breakProgress = posMin(secondsSinceStartTime - pomodoroType.active * 60, pomodoroType.break * 60) / (pomodoroType.break * 60);

  const timeInfo: TimeInfo = {
    sessionStartTime: sessionStartTime,
    currentTime: time,
    rawSecondsSinceStartTime: rawSecondsSinceStartTime,
    paused: isPaused,
    secondsSinceStartTime: secondsSinceStartTime,
    pomodoroType: pomodoroType,
    trueRatio: secondsSinceStartTime / totalPomodoroSeconds,
    displayRatio: activeProgress * 0.75 + breakProgress * 0.25
  }

  return (
    <div
      autoFocus={true}
      tabIndex={0}
      className='min-h-screen'
      onKeyDown={keyDownHandler}
    >
      <ImageDisplay
        timeInfo={timeInfo}
      />
      <MuteIconDisplay
        isMuted={isMuted}
      />
      <Wheel
        timeInfo={timeInfo}
      />
      <HelpText
        showPage={showHelpPage}
      />
    </div>
  )
}
