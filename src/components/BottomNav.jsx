import React from 'react'
import './BottomNav.css'

const items = [
  {
    label: 'Главная',
    active: true,
    icon: (color) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M4 10.5L12 3.5L20 10.5V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V10.5Z" fill={color} />
      </svg>
    ),
  },
  {
    label: 'Kaspi QR',
    active: false,
    icon: (color) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" fill={color} />
        <rect x="14" y="3" width="7" height="7" rx="1.5" fill={color} />
        <rect x="3" y="14" width="7" height="7" rx="1.5" fill={color} />
        <rect x="14" y="14" width="3" height="3" rx="0.5" fill={color} />
        <rect x="18" y="14" width="3" height="3" rx="0.5" fill={color} />
        <rect x="14" y="18" width="3" height="3" rx="0.5" fill={color} />
        <rect x="18" y="18" width="3" height="3" rx="0.5" fill={color} />
      </svg>
    ),
  },
  {
    label: 'Сообщения',
    active: false,
    icon: (color) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V15C20 15.5523 19.5523 16 19 16H9L5 19.5V16H5C4.44772 16 4 15.5523 4 15V5Z" fill={color} />
      </svg>
    ),
  },
  {
    label: 'Сервисы',
    active: false,
    icon: (color) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="5.5" width="16" height="2.4" rx="1.2" fill={color} />
        <rect x="4" y="10.8" width="16" height="2.4" rx="1.2" fill={color} />
        <rect x="4" y="16.1" width="16" height="2.4" rx="1.2" fill={color} />
      </svg>
    ),
  },
]

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      {items.map((item) => {
        const color = item.active ? 'var(--kaspi-red)' : '#a9a9ae'
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
