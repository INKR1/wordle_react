import React from 'react'

export default function Key({ keyVal, bigKey }) {
  return (
    <div className="key" id={bigKey && 'big'}>
      {keyVal}
    </div>
  )
}
