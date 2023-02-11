import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';


export default function Key({ keyVal, bigKey }) {
  const { onSelectLetter, onDeleteLetter, onEnterLetter } = useContext(AppContext)

  const selectLetter = () => {
    if (keyVal === 'ENTER'){
     onEnterLetter()
    } else if (keyVal === 'DELETE') {
      onDeleteLetter()
    } else {
      onSelectLetter(keyVal)
    }
  };
  return (
    <div className="key" id={bigKey && 'big'} onClick={selectLetter}>
      {keyVal}
    </div>
  )
}
