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
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="var(--kaspi-red)" strokeWidth="1.8" />
      <path d="M8 9C8 9 9 8 12 8C15 8 16 9 16 9" stroke="var(--kaspi-red)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 12.5C8 12.5 9 11.5 12 11.5C15 11.5 16 12.5 16 12.5" stroke="var(--kaspi-red)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 16C8 16 9 15 12 15C15 15 16 16 16 16" stroke="var(--kaspi-red)" strokeWidth="1.6" strokeLinecap="round" />
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
