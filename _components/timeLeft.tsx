"use client"
import React from 'react'
import { TimeInfo } from '~/_utils/types'

function fitToTwo(str: string | number){
  return ("0" + str).slice(-2);
}

export default function TimeLeft(props: {timeInfo: TimeInfo} ) {
  const isActive = props.timeInfo.secondsSinceStartTime <= props.timeInfo.pomodoroType.active * 60;
  const seconds = isActive ?  Math.ceil(props.timeInfo.pomodoroType.active * 60 - props.timeInfo.secondsSinceStartTime) : Math.ceil(props.timeInfo.pomodoroType.break * 60 - (props.timeInfo.secondsSinceStartTime - props.timeInfo.pomodoroType.active * 60));
  const sec = seconds % 60;
  const min = Math.floor(seconds / 60);
  const time = `${fitToTwo(min)}:${fitToTwo(sec)}`;
  return (
    <div>
      <h1
        className={`text-[8em] text-center ${ isActive ? "text-green-700" : "text-cyan-300"}`}
      >
        {time}
      </h1>
    </div>
  )
}
