"use client"
import React from 'react'
import { TimeInfo } from '~/_utils/types'

export default function TimeLeft(props: {timeInfo: TimeInfo} ) {
  return (
    <div>
      {
        props.timeInfo.secondsSinceStartTime <= props.timeInfo.pomodoroType.active * 60 ?
          <h1
            className='text-[8em] text-center text-green-700'
          >
            {Math.floor(props.timeInfo.secondsSinceStartTime)}
          </h1>
          :
          <h1
            className='text-[8em] text-center text-cyan-300'
          >
            {Math.floor(props.timeInfo.secondsSinceStartTime - props.timeInfo.pomodoroType.active * 60)}
          </h1>
      }
    </div>
  )
}
