import React, { useState } from 'react'
import './GovServicesScreen.css'

const quickCards = ['Удостоверение личности', 'Паспорт Гражданина РК', 'Водительские права']

const serviceList = [
  { label: 'Переоформление автомобиля', isIdentity: false },
  { label: 'Удостоверение личности', isIdentity: true },
  { label: 'Паспорт Гражданина РК', isIdentity: false },
  { label: 'Водительские права', isIdentity: false },
  { label: 'Налоги', isIdentity: false },
  { label: 'Здравоохранение', isIdentity: false },
]

function ServiceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M11 3C11 3 12 4 12 5.5V9H10.2C9.2 9 8.4 9.5 8 10.3L4 18.5C3.7 19.2 4.2 20 5 20H19C19.8 20 20.3 19.2 20 18.5L16 10.3C15.6 9.5 14.8 9 13.8 9H12V5.5C12 4 13 3 13 3"
        fill="var(--kaspi-red)"
      />
      <circle cx="12" cy="3" r="1.4" fill="var(--kaspi-red)" />
      <rect x="7" y="16.5" width="10" height="1.7" rx="0.85" fill="#fff" fillOpacity="0.85" />
    </svg>
  )
}

export default function GovServicesScreen({ onBack, onOpenIdentityDoc }) {
  const [tab, setTab] = useState('all')

  return (
    <div className="gov-screen">
      <div className="gov-header">
        <button className="back-btn" onClick={onBack} aria-label="Назад">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 5L8 12L15 19" stroke="#1c1c1e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>Госуслуги</h1>
        <div style={{ width: 22 }} />
      </div>

      <div className="gov-tabs">
        <button className={`gov-tab ${tab === 'all' ? 'gov-tab--active' : ''}`} onClick={() => setTab('all')}>
          Все услуги
        </button>
        <button className={`gov-tab ${tab === 'my' ? 'gov-tab--active' : ''}`} onClick={() => setTab('my')}>
          Мои заявки
        </button>
      </div>

      <div className="gov-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#9a9a9f" strokeWidth="2" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#9a9a9f" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Поиск по Госуслугам</span>
      </div>

      <div className="gov-quick-scroll">
        {quickCards.map((c) => (
          <button
            key={c}
            className="gov-quick-card"
            onClick={c === 'Удостоверение личности' ? onOpenIdentityDoc : undefined}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="gov-list">
        {serviceList.map((item) => (
          <button
            key={item.label}
            className="gov-list-item"
            onClick={item.isIdentity ? onOpenIdentityDoc : undefined}
          >
            <div className="gov-list-icon">
              <ServiceIcon />
            </div>
            <span>{item.label}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
