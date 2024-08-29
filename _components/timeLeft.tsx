"use client"
import React from 'react'
import { TimeInfo } from '~/_utils/types'

export default function TimeLeft(props: {timeInfo: TimeInfo} ) {
  return (
    <div>
      <h1
        className='text-4xl'
      >
        passed seconds: {Math.floor(props.timeInfo.secondsSinceStartTime)}
      </h1>
      <h1
        className='text-4xl'
      >
        progress: {(props.timeInfo.totalRatio* 100).toFixed(2)}%
      </h1>
    </div>
  )
}
