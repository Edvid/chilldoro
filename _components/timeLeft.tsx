"use client"
import React from 'react'
import { TimeInfo } from '~/_utils/types'
import { play } from '~/_utils/audio';

function fitToTwo(str: string | number){
  return ("0" + str).slice(-2);
}

let previousIsActive: boolean = true;

export default function TimeLeft(props: {timeInfo: TimeInfo} ) {
  const isActive = props.timeInfo.secondsSinceStartTime <= props.timeInfo.pomodoroType.active * 60;
  const seconds = isActive ?  Math.ceil(props.timeInfo.pomodoroType.active * 60 - props.timeInfo.secondsSinceStartTime) : Math.ceil(props.timeInfo.pomodoroType.break * 60 - (props.timeInfo.secondsSinceStartTime - props.timeInfo.pomodoroType.active * 60));

  const sec = seconds % 60;
  const min = Math.floor(seconds / 60);
  const time = `${fitToTwo(min)}:${fitToTwo(sec)}`;

  const color = (() => {
    if (!props.timeInfo.paused) {
      if (isActive) {
        return "text-green-700 bg-white";
      } else {
        return "text-cyan-300 bg-white";
      }
    } else {
      return "text-black bg-cyan-200"
    }
  })();

  if (!previousIsActive && isActive) {
    play('spring_upon_us.mp3');
  } else if (previousIsActive && !isActive) {
    play('winter_upon_us.mp3')
  }

  previousIsActive = isActive;
  return (
    <h1
      className={`rounded-lg p-2 text-2xl font-extrabold text-center ${color}`}
    >
      {time}
    </h1>
  )
}
