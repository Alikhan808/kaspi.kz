import React from 'react'
import './HomeScreen.css'

// Иконки выполнены в заполненном (filled) стиле — максимально близко к оригинальному приложению Kaspi.kz
const gridItems = [
  {
    label: 'Магазин',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M7 2L5 6H19L17 2H7Z" fill="var(--kaspi-red)" />
        <path
          d="M4.5 7C4.5 6.72386 4.72386 6.5 5 6.5H19C19.2761 6.5 19.5 6.72386 19.5 7V19.5C19.5 20.0523 19.0523 20.5 18.5 20.5H5.5C4.94772 20.5 4.5 20.0523 4.5 19.5V7Z"
          stroke="var(--kaspi-red)"
          strokeWidth="1.6"
        />
        <path
          d="M9 10.5C9 12.1569 10.3431 13.5 12 13.5C13.6569 13.5 15 12.1569 15 10.5"
          stroke="var(--kaspi-red)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Мой Банк',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4.5" width="11" height="15" rx="2" fill="var(--kaspi-red)" />
        <rect x="13.5" y="8" width="7.5" height="11.5" rx="2" fill="var(--kaspi-red)" fillOpacity="0.55" />
        <rect x="6" y="8" width="5" height="1.6" rx="0.8" fill="#fff" />
        <rect x="6" y="11.2" width="5" height="1.6" rx="0.8" fill="#fff" />
        <rect x="6" y="14.4" width="3.2" height="1.6" rx="0.8" fill="#fff" />
      </svg>
    ),
  },
  {
    label: 'Платежи',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M5 2.5H16L19.5 6V21H7.5C6.11929 21 5 19.8807 5 18.5V2.5Z" fill="var(--kaspi-red)" />
        <path d="M16 2.5V6H19.5L16 2.5Z" fill="#fff" fillOpacity="0.35" />
        <rect x="8" y="9.5" width="8" height="1.6" rx="0.8" fill="#fff" />
        <rect x="8" y="13" width="8" height="1.6" rx="0.8" fill="#fff" />
        <rect x="8" y="16.5" width="4.5" height="1.6" rx="0.8" fill="#fff" />
      </svg>
    ),
  },
  {
    label: 'Переводы',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M3.5 8.5H16.5L13 5" stroke="var(--kaspi-red)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.5 8.5L7 12" stroke="var(--kaspi-red)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.5 15.5H7.5L11 12" stroke="var(--kaspi-red)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.5 15.5L17 19" stroke="var(--kaspi-red)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Magnum',
    icon: <MagnumIcon />,
  },
  {
    label: 'Travel',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="8" width="14" height="12.5" rx="2.5" fill="var(--kaspi-red)" />
        <path d="M9 8V6C9 4.89543 9.89543 4 11 4H13C14.1046 4 15 4.89543 15 6V8" stroke="var(--kaspi-red)" strokeWidth="1.8" />
        <rect x="7.5" y="11" width="2.4" height="6.5" rx="1.2" fill="#fff" fillOpacity="0.9" />
        <rect x="14.1" y="11" width="2.4" height="6.5" rx="1.2" fill="#fff" fillOpacity="0.9" />
      </svg>
    ),
  },
  {
    label: 'Госуслуги',
    isGov: true,
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path
          d="M11 3C11 3 12 4 12 5.5V9H10.2C9.2 9 8.4 9.5 8 10.3L4 18.5C3.7 19.2 4.2 20 5 20H19C19.8 20 20.3 19.2 20 18.5L16 10.3C15.6 9.5 14.8 9 13.8 9H12V5.5C12 4 13 3 13 3"
          fill="var(--kaspi-red)"
        />
        <circle cx="12" cy="3" r="1.4" fill="var(--kaspi-red)" />
        <rect x="7" y="16.5" width="10" height="1.7" rx="0.85" fill="#fff" fillOpacity="0.85" />
      </svg>
    ),
  },
  {
    label: 'Объявления',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <rect x="4.5" y="3.5" width="15" height="17" rx="2" fill="var(--kaspi-red)" />
        <rect x="7.3" y="7.2" width="9.4" height="1.7" rx="0.85" fill="#fff" />
        <rect x="7.3" y="11" width="9.4" height="1.7" rx="0.85" fill="#fff" />
        <rect x="7.3" y="14.8" width="5.5" height="1.7" rx="0.85" fill="#fff" />
      </svg>
    ),
  },
]

function MagnumIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="6" fill="var(--kaspi-magnum)" />
      <path d="M6.5 16.5V8L12 12.5L17.5 8V16.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Иллюстрация кресла для промо-баннера "Мебель"
function ArmchairIllustration() {
  return (
    <svg viewBox="0 0 160 130" className="promo-illustration">
      <ellipse cx="80" cy="118" rx="70" ry="8" fill="#d8c9ab" opacity="0.5" />
      <rect x="10" y="60" width="14" height="55" rx="4" fill="#8a6a45" />
      <ellipse cx="17" cy="58" rx="10" ry="9" fill="#c9915f" />
      <path d="M25 45C25 38 32 33 42 33H108C118 33 125 38 125 45V75C125 82 119 88 111 88H39C31 88 25 82 25 75V45Z" fill="#3d5a80" />
      <path d="M25 45C25 38 32 33 42 33H50V88H39C31 88 25 82 25 75V45Z" fill="#33506f" />
      <rect x="30" y="70" width="100" height="30" rx="8" fill="#2b4560" />
      <rect x="34" y="74" width="92" height="22" rx="6" fill="#3d5a80" />
      <circle cx="95" cy="60" r="9" fill="#e8ddc7" />
      <rect x="128" y="55" width="18" height="45" rx="3" fill="#a5764a" />
      <ellipse cx="137" cy="53" rx="11" ry="4" fill="#c9915f" />
    </svg>
  )
}

// Иллюстрация телефона + часов для промо-баннера "Всё в рассрочку"
function PhoneWatchIllustration() {
  return (
    <svg viewBox="0 0 160 130" className="promo-illustration">
      <rect x="18" y="10" width="52" height="100" rx="10" fill="#1c1c1e" />
      <rect x="22" y="16" width="44" height="88" rx="4" fill="url(#phoneGrad)" />
      <defs>
        <linearGradient id="phoneGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff5f6d" />
          <stop offset="100%" stopColor="#a8195e" />
        </linearGradient>
      </defs>
      <circle cx="44" cy="10" r="2" fill="#3a3a3c" />
      <circle cx="108" cy="55" r="26" fill="#2b2b2f" />
      <circle cx="108" cy="55" r="20" fill="#3a3a3c" />
      <circle cx="108" cy="55" r="17" fill="#f4ede0" />
      <line x1="108" y1="55" x2="108" y2="43" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round" />
      <line x1="108" y1="55" x2="116" y2="58" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round" />
      <rect x="98" y="79" width="20" height="34" rx="6" fill="#6b4a2f" />
      <rect x="83" y="95" width="50" height="10" rx="5" fill="#2b2b2f" />
    </svg>
  )
}

// Иллюстрация руки со смартфоном для нижнего красного баннера
function HandPhoneIllustration() {
  return (
    <svg viewBox="0 0 200 170" className="banner-illustration">
      <rect x="60" y="10" width="90" height="150" rx="18" fill="#111114" />
      <rect x="68" y="26" width="74" height="118" rx="4" fill="#fff" />
      <rect x="74" y="34" width="62" height="14" rx="3" fill="#f1f1f3" />
      <rect x="74" y="52" width="30" height="30" rx="4" fill="#ffe1dc" />
      <rect x="108" y="52" width="28" height="30" rx="4" fill="#ffe1dc" />
      <rect x="74" y="86" width="30" height="30" rx="4" fill="#e4f5e7" />
      <rect x="108" y="86" width="28" height="30" rx="4" fill="#e4f5e7" />
      <rect x="74" y="120" width="62" height="16" rx="4" fill="#fdeceb" />
      <path
        d="M20 150C25 120 45 105 60 108L70 150C70 160 60 168 45 168C30 168 17 162 20 150Z"
        fill="#e6a678"
      />
      <path d="M55 108C60 98 72 92 82 96C77 105 66 112 55 108Z" fill="#e6a678" />
    </svg>
  )
}

const services = [
  { label: 'Рассрочка 0-0-12', bg: 'var(--kaspi-red)', content: '0·0·12', textColor: '#fff', fontSize: 11.5 },
  { label: 'Kaspi Депозит', bg: 'var(--kaspi-yellow)', content: '₸', textColor: '#1c1c1e', fontSize: 20 },
  { label: 'Кредит Наличными', bg: 'var(--kaspi-green)', content: '💳', textColor: '#fff', fontSize: 18 },
  { label: 'Kaspi Red+', bg: 'var(--kaspi-red)', content: 'Red+', textColor: '#fff', fontSize: 12 },
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
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 4H5.2L6.8 15.2C6.95 16.3 7.9 17.1 9 17.1H17.5C18.5 17.1 19.4 16.4 19.6 15.4L21 7.6H6"
            stroke="#1c1c1e"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="20" r="1.4" fill="#1c1c1e" />
          <circle cx="17" cy="20" r="1.4" fill="#1c1c1e" />
        </svg>
      </div>

      <div className="promo-row">
        <div className="promo-card promo-card--furniture">
          <div className="promo-text">
            <span className="promo-title">Мебель</span>
            <span className="promo-badge">0·0·12</span>
            <span className="promo-sub">
              с 23 по 29 мая
              <br />
              на Kaspi.kz
              <br />и с Kaspi QR
            </span>
          </div>
          <ArmchairIllustration />
        </div>
        <div className="promo-card promo-card--dark">
          <div className="promo-text">
            <span className="promo-title">
              ВСЕ
              <br />В РАССРОЧКУ
            </span>
            <span className="promo-badge">0·0·12</span>
            <span className="promo-sub promo-sub--light">
              с 30 мая по 12 июня
              <br />
              на Kaspi.kz и с Kaspi QR
            </span>
          </div>
          <PhoneWatchIllustration />
        </div>
      </div>

      <div className="grid-menu">
        {gridItems.map((item) => (
          <button key={item.label} className="grid-item" onClick={item.isGov ? onOpenGovServices : undefined}>
            <div className="grid-icon">{item.icon}</div>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="section-divider" />

      <div className="service-list">
        {services.map((s) => (
          <button key={s.label} className="service-item">
            <div className="service-badge" style={{ background: s.bg, color: s.textColor, fontSize: s.fontSize }}>
              {s.content}
            </div>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div className="banner-red">
        <div className="banner-text">
          <div className="banner-logo-row">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="#fff" />
              <path d="M4 20C4 15.5817 7.58172 12 12 12C16.4183 12 20 15.5817 20 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="banner-brand">
              KASPI
              <br />
              РАССРОЧКА
            </span>
          </div>
          <p className="banner-number">0·0·24</p>
          <p className="banner-date">1-3 августа</p>
          <div className="banner-dots">
            <span className="dot dot--active" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
        <HandPhoneIllustration />
      </div>

      <div className="suggestions-section">
        <h3>Вас могут заинтересовать</h3>
      </div>
    </div>
  )
}
