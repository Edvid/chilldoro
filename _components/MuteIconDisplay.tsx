import React from "react";
import Image from 'next/image'

export default function MuteIconDisplay(props: { isMuted: boolean} ) {
  return (
    <div
      className="absolute top-0 right-0 size-[20svw]"
    >
      {
        props.isMuted ? 
          <Image
            className="z-[-50]"
            fill
            objectFit={'contain'}
            src={process.env.NODE_ENV === 'production' ? "/chilldoro/sound_off.png" : "/sound_off.png"}
            alt="sound off"
          />
          :
          <Image
            className="z-[-50]"
            fill
            objectFit={'contain'}
            src={process.env.NODE_ENV === 'production' ? "/chilldoro/sound_on.png" : "/sound_on.png"}
            alt="sound on"
          />
      }
    </div>
  )
}
