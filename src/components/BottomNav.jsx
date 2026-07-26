import React from 'react'
import './BottomNav.css'

const items = [
  {
    label: 'Главная',
    active: true,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 11L12 4L20 11V20H14V14H10V20H4V11Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Kaspi QR',
    active: false,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: 'Сообщения',
    active: false,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 5H20V16H8L4 19V5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Сервисы',
    active: false,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <line x1="4" y1="7" x2="20" y2="7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="4" y1="17" x2="20" y2="17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      {items.map((item) => {
        const color = item.active ? 'var(--kaspi-red)' : '#8e8e93'
        return (
          <button key={item.label} className={`nav-item ${item.active ? 'nav-item--active' : ''}`}>
            {item.icon(color)}
            <span style={{ color }}>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
