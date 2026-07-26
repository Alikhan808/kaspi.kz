import React from 'react'
import './PhoneFrame.css'

export default function PhoneFrame({ children }) {
  return (
    <div className="phone-outer">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">{children}</div>
        <div className="phone-home-indicator" />
      </div>
      <p className="phone-caption">Учебный проект · клон интерфейса Kaspi.kz</p>
    </div>
  )
}
