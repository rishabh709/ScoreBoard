import React from 'react'
import Backdrop from './Backdrop'
import ModalFormLayout from '../layout/componentLayout/ModalFormLayout'

function Toss() {
  return (
    <>
      <ModalFormLayout title="Toss">
        <input type="text" name="name" id="name" placeholder='user-name'/>
        <input type="password" name="pass" id="pass" placeholder='password'/>
        <input type="range" name="range" id="range"/>
        <p>hellow</p>
      </ModalFormLayout>

    </>
  )
}

export default Toss