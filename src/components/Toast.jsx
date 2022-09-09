import React from 'react'
import {FcCheckmark} from 'react-icons/fc'

function Toast() {
  return (
    <div className="flex border p-2 gap-2 border-none bg-black">
      <FcCheckmark size={25}/>
      <h1 className="text-white text-[20px]">
        Registration successful
      </h1>
    </div>
  )
}

export default Toast