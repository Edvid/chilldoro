import React from 'react'
import { keyBinds } from '~/_utils/keyBinds'

export default function HelpText(props: {showPage: boolean}) {
  if (props.showPage) {
    return (
      <div
        className='absolute top-0 left-0 w-screen '
      >
        <div className='m-auto my-[20svh] w-min px-4 bg-black/60 rounded-lg text-white font-semibold text-center min-h-[60svh]'>
          <table>
            <thead>
              <tr className='border-b-2 font-extrabold'>
                <th className='py-6'>Key</th>
                <th className='py-6'>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(keyBinds).map((key) => (
                  <tr
                    className='border-b'
                    key={key}
                  >
                    <td
                      className='min-w-[6em] py-4'
                    >
                      {key.replace("Key", "")}
                    </td>
                    <td
                      className='min-w-[20em] py-4'
                    >
                      {keyBinds[key as keyof typeof keyBinds].description}
                    </td>
                  </tr>

                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  } else {
    return (
      <p
        className='absolute bottom-5 left-5 font-semibold text-lg text-white'

      >{keyBinds.KeyH.description}</p>
    )
  }
}

