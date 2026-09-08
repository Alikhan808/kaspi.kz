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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#757575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  <line x1="8" y1="10" x2="8.01" y2="10" stroke-width="3"></line>
  <line x1="12" y1="10" x2="12.01" y2="10" stroke-width="3"></line>
  <line x1="16" y1="10" x2="16.01" y2="10" stroke-width="3"></line>
</svg>

    ),
  },
  {
    label: 'Сервисы',
    active: false,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#757575" stroke-width="2" stroke-linecap="round">
  <line x1="3" y1="6" x2="21" y2="6"></line>
  <line x1="3" y1="12" x2="21" y2="12"></line>
  <line x1="3" y1="18" x2="21" y2="18"></line>
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
