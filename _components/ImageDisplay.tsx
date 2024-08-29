"use client"
import React from 'react'
import { Season, TimeInfo } from '~/_utils/types'
import Image from 'next/image'

export default function ImageDisplay(props: {timeInfo: TimeInfo} ) {
  const ActiveSeasons: Season[] = ['spring', 'summer', 'autumn'];
  const season: Season = props.timeInfo.secondsSinceStartTime >= props.timeInfo.pomodoroType.active * 60 ?
  'winter' :
    ActiveSeasons[Math.min(Math.floor(props.timeInfo.secondsSinceStartTime / 60 / props.timeInfo.pomodoroType.active * 3), 2)]
  return (
    <div className='absolute w-full h-full z-[-100]'>
      <Image
        fill
        objectFit={'contain'}
        src={"/" + season + ".png"}
        alt={season + " image"}
      />
    </div>
  )
}
