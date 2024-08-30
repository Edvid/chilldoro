"use client"
import React from 'react'
import { Season, TimeInfo } from '~/_utils/types'
import Image from 'next/image'

export default function ImageDisplay(props: {timeInfo: TimeInfo} ) {
  const Seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
  const season: Season = Seasons[Math.min(Math.floor(props.timeInfo.displayRatio * 4), 3)]
  return (
    <div className='absolute w-full h-full z-[-100]'>
      <Image
        fill
        objectFit={'contain'}
        src={(process.env.NODE_ENV === 'production' ? "/chilldoro/" : "/") + season + ".png"}
        alt={season + " image"}
      />
    </div>
  )
}
