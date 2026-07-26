import React from 'react'
import './HomeScreen.css'

const gridItems = [
  {
    label: 'Магазин',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M4 8L5.5 4H18.5L20 8" stroke="var(--kaspi-red)" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 8H20V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V8Z" stroke="var(--kaspi-red)" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 11V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V11" stroke="var(--kaspi-red)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Мой Банк',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="6" width="9" height="13" rx="1.5" stroke="var(--kaspi-red)" strokeWidth="1.8" />
        <rect x="13" y="9" width="7" height="10" rx="1.5" stroke="var(--kaspi-red)" strokeWidth="1.8" />
        <line x1="6.5" y1="9" x2="10.5" y2="9" stroke="var(--kaspi-red)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6.5" y1="12" x2="10.5" y2="12" stroke="var(--kaspi-red)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Платежи',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M5 3H16L19 6V21H5V3Z" stroke="var(--kaspi-red)" strokeWidth="1.8" strokeLinejoin="round" />
        <line x1="8" y1="9" x2="15" y2="9" stroke="var(--kaspi-red)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="12.5" x2="15" y2="12.5" stroke="var(--kaspi-red)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="16" x2="12" y2="16" stroke="var(--kaspi-red)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Переводы',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M4 8H18M18 8L14 4M18 8L14 12" stroke="var(--kaspi-red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 16H6M6 16L10 12M6 16L10 20" stroke="var(--kaspi-red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Magnum',
    icon: <div className="magnum-icon">7</div>,
  },
  {
    label: 'Travel',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="8" width="12" height="11" rx="2" stroke="var(--kaspi-red)" strokeWidth="1.8" />
        <path d="M9 8V6C9 4.89543 9.89543 4 11 4H13C14.1046 4 15 4.89543 15 6V8" stroke="var(--kaspi-red)" strokeWidth="1.8" />
        <circle cx="12" cy="13" r="1.3" fill="var(--kaspi-red)" />
      </svg>
    ),
  },
  {
    label: 'Госуслуги',
    isGov: true,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="var(--kaspi-red)" strokeWidth="1.8" />
        <path d="M8 9C8 9 9 8 12 8C15 8 16 9 16 9" stroke="var(--kaspi-red)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 12.5C8 12.5 9 11.5 12 11.5C15 11.5 16 12.5 16 12.5" stroke="var(--kaspi-red)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 16C8 16 9 15 12 15C15 15 16 16 16 16" stroke="var(--kaspi-red)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Объявления',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="4" width="14" height="17" rx="1.5" stroke="var(--kaspi-red)" strokeWidth="1.8" />
        <line x1="8.5" y1="9" x2="15.5" y2="9" stroke="var(--kaspi-red)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8.5" y1="12.5" x2="15.5" y2="12.5" stroke="var(--kaspi-red)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

const services = [
  { label: 'Рассрочка 0-0-12', bg: 'var(--kaspi-red)', content: '0·0·12', textColor: '#fff' },
  { label: 'Kaspi Депозит', bg: 'var(--kaspi-yellow)', content: 'T', textColor: '#1c1c1e' },
  { label: 'Кредит Наличными', bg: 'var(--kaspi-green)', content: 'card', textColor: '#fff' },
  { label: 'Kaspi Red+', bg: 'var(--kaspi-red)', content: 'Red+', textColor: '#fff' },
]

export default function HomeScreen({ onOpenGovServices }) {
  return (
    <div className="home-screen">
      <div className="search-row">
        <div className="search-input">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#9a9a9f" strokeWidth="2" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#9a9a9f" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Поиск по Kaspi.kz</span>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 4H5L6.5 15H18L20 7H6" stroke="#1c1c1e" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="8" cy="19" r="1.3" fill="#1c1c1e" />
          <circle cx="16" cy="19" r="1.3" fill="#1c1c1e" />
        </svg>
      </div>

      <div className="promo-row">
        <div className="promo-card promo-card--furniture">
          <span className="promo-title">Мебель</span>
          <span className="promo-badge">0·0·12</span>
        </div>
        <div className="promo-card promo-card--dark">
          <span className="promo-title">ВСЕ<br />В РАССРОЧКУ</span>
          <span className="promo-badge">0·0·12</span>
        </div>
      </div>

      <div className="grid-menu">
        {gridItems.map((item) => (
          <button
            key={item.label}
            className="grid-item"
            onClick={item.isGov ? onOpenGovServices : undefined}
          >
            <div className="grid-icon">{item.icon}</div>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="service-list">
        {services.map((s) => (
          <button key={s.label} className="service-item">
            <div className="service-badge" style={{ background: s.bg, color: s.textColor }}>
              {s.content}
            </div>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div className="banner-red">
        <div>
          <p className="banner-brand">KASPI РАССРОЧКА</p>
          <p className="banner-number">0·0·24</p>
        </div>
      </div>

      <div className="suggestions-section">
        <h3>Вас могут заинтересовать</h3>
      </div>
    </div>
  )
}
