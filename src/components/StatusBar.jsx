import React, { useEffect, useState } from 'react'
import './StatusBar.css'

export default function StatusBar() {
  const [time, setTime] = useState(getTime())

  function getTime() {
    const d = new Date()
    return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="status-bar">
      <span className="status-time">{time}</span>
      <div className="status-icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#000" />
          <rect x="5" y="6" width="3" height="6" rx="0.5" fill="#000" />
          <rect x="10" y="3" width="3" height="9" rx="0.5" fill="#000" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="#000" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5C8.6 10.5 9.1 10 9.1 9.4C9.1 8.8 8.6 8.3 8 8.3C7.4 8.3 6.9 8.8 6.9 9.4C6.9 10 7.4 10.5 8 10.5Z" fill="#000" />
          <path d="M8 2C5.5 2 3.2 3 1.5 4.7L2.6 5.8C4 4.4 5.9 3.6 8 3.6C10.1 3.6 12 4.4 13.4 5.8L14.5 4.7C12.8 3 10.5 2 8 2Z" fill="#000" />
          <path d="M8 5.4C6.4 5.4 5 6 3.9 7.1L5 8.2C5.8 7.4 6.9 6.9 8 6.9C9.1 6.9 10.2 7.4 11 8.2L12.1 7.1C11 6 9.6 5.4 8 5.4Z" fill="#000" />
        </svg>
        <div className="status-battery">
          <span className="battery-pct">72</span>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
            <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="#000" opacity="0.4" />
            <rect x="2" y="2" width="15" height="8" rx="1.5" fill="#34c759" />
            <rect x="21.5" y="4" width="1.5" height="4" rx="0.8" fill="#000" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  )
}
