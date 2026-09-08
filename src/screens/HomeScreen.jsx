import React from 'react'
import './HomeScreen.css'

// Иконки выполнены в заполненном (filled) стиле
const gridItems = [
  {
    label: 'Магазин',
    icon: <img src="/icons/shop.png" alt="Магазин" />,
  },
  {
    label: 'Мой Банк',
    icon: <img src="/icons/bank.png" alt="Мой банк" />,
  },
  {
    label: 'Платежи',
    icon: <img src="/icons/payments.png" alt="Платежи" />,
  },
  {
    label: 'Переводы',
    icon: <img src="/icons/transfer.png" alt="Переводы" />,
  },
  {
    label: 'Magnum',
    icon: <img src="/icons/magnum.png" alt="Магнум" />,
  },
  {
    label: 'Travel',
    icon: <img src="/icons/travel.png" alt="Путешествия" />,
  },
  {
    label: 'Госуслуги',
    isGov: true,
    icon: <img src="/icons/gov.png" alt="Госуслуги" />,
  },
  {
    label: 'Объявления',
    icon: <img src="/icons/job.png" alt="Объявления" />,
  },
]

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
  { label: 'Рассрочка 0-0-12', icon: <img src="/icons/rasrochka.png" alt="рассрочка" /> },
  { label: 'Kaspi Депозит', icon: <img src="/icons/depozit.png" alt="депозит" /> },
  { label: 'Кредит Наличными', icon: <img src="/icons/kredit.png" alt="кредит" /> },
  { label: 'Kaspi Red+', icon: <img src="/icons/kaspired.png" alt="каспиред" /> },
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
          <img src="/icons/showitem.jpg" alt="Мебель" className="promo-photo" />
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

      
      <div className="service-list">
        {services.map((s) => (
          <button key={s.label} className="service-item">
            <div className="service-badge">
              {s.icon} {/* <-- ИСПРАВЛЕНО: выводим s.icon вместо несуществующих s.content */}
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
