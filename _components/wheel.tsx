import React from "react";
import { TimeInfo } from "~/_utils/types";
import TimeLeft from "~/_components/timeLeft";
import Image from 'next/image'

export default function Wheel(props: {timeInfo: TimeInfo} ) {
  const winterStartInRads = 4.19;
  const handleRot = (props.timeInfo.displayRatio * Math.PI * 2 + winterStartInRads).toString() + "rad";
  return (
    <div>
      <div
        className="mr-auto size-[20svw] relative"
      >
        <Image
          className="z-[-50]"
          fill
          objectFit={'contain'}
          src={process.env.NODE_ENV === 'production' ? "/chilldoro/wheel.png" : "/wheel.png"}
          alt="wheel image"
        />
        <div className="py-[calc(10svw-2em)] px-[calc(10svw-4em)]">
          <TimeLeft
            timeInfo={props.timeInfo}
          />
        </div>
        <Image
          className="z-[-25]"
          fill
          style={{
            rotate: handleRot
          }}
          objectFit={'contain'}
          src={process.env.NODE_ENV === 'production' ? "/chilldoro/handle.png" : "/handle.png"}
          alt="handle image"
        />
      </div>
    </div>
  )
}
