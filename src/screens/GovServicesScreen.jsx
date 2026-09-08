import React, { useState } from 'react'
import './GovServicesScreen.css'

// Горизонтальная лента категорий
const categories = [
  { key: 'popular', label: 'Популярные', icon: '/icons/syren.png' },
  { key: 'certificates', label: 'Справки', icon: '/icons/doc.png' },
  { key: 'auto', label: 'Авто', icon: '/icons/car.png' },
  { key: 'housing', label: 'Жильё', icon: '/icons/house.png' },
  { key: 'family', label: 'Семья', icon: '/icons/house.png' },
]

// Список "Популярные и новые"
const popularServices = [
  {
    label: 'Выплата по беременности',
    icon: '/icons/kid.png',
    badge: 'NEW',
  },
  {
    label: 'Стать самозанятым',
    sub: 'Открыть счет и начать принимать оплату в Kaspi.kz',
    icon: '/icons/pers.png',
  },
  {
    label: 'Переоформление автомобиля',
    icon: '/icons/car.png',
  },
]

export default function GovServicesScreen({ onBack, onOpenIdentityDoc }) {
  const [tab, setTab] = useState('all')
  const [activeCategory, setActiveCategory] = useState('popular')

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

      <div className="gov-id-card-wrap">
        <button className="gov-id-card" onClick={onOpenIdentityDoc}>
          <img src="/icons/udos.png" alt="Удостоверение личности" className="gov-id-card-img" />
          <span>
            Удостоверение
            <br />
            личности
          </span>
        </button>

        <button className="gov-all-docs">
          <span>Все документы</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 5L16 12L9 19" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="gov-categories">
        {categories.map((c) => (
          <button
            key={c.key}
            className={`gov-category ${activeCategory === c.key ? 'gov-category--active' : ''}`}
            onClick={() => setActiveCategory(c.key)}
          >
            <div className="gov-category-icon">
              <img src={c.icon} alt={c.label} />
            </div>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      <div className="gov-popular-section">
        <h2>Популярные и новые</h2>
        <div className="gov-popular-list">
          {popularServices.map((item) => (
            <button key={item.label} className="gov-popular-item">
              <div className="gov-popular-icon">
                <img src={item.icon} alt={item.label} />
              </div>
              <div className="gov-popular-text">
                <div className="gov-popular-title-row">
                  <span className="gov-popular-title">{item.label}</span>
                  {item.badge && <span className="gov-badge">{item.badge}</span>}
                </div>
                {item.sub && <span className="gov-popular-sub">{item.sub}</span>}
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 5L16 12L9 19" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
