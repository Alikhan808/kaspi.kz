import React, { useEffect, useRef, useState } from 'react'
import './IdentityDocScreen.css'

const PHOTO_STORAGE_KEY = 'kaspi_clone_identity_doc_photo'
const REQUISITES_STORAGE_KEY = 'kaspi_clone_identity_doc_requisites'

const INITIAL_REQUISITES = {
  fio: '',
  iin: '',
  birthdate: '',
  docNumber: '',
  issueDate: '',
  expiryDate: ''
}

export default function IdentityDocScreen({ onBack }) {
  const [tab, setTab] = useState('requisites') // По умолчанию открываем Реквизиты, как на скрине
  const [photo, setPhoto] = useState(null)
  const [requisites, setRequisites] = useState(INITIAL_REQUISITES)
  const [copiedField, setCopiedField] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem(PHOTO_STORAGE_KEY)
      if (savedPhoto) setPhoto(savedPhoto)

      const savedReqs = localStorage.getItem(REQUISITES_STORAGE_KEY)
      if (savedReqs) {
        setRequisites(JSON.parse(savedReqs))
      }
    } catch (e) {
      console.error('Ошибка чтения из localStorage', e)
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      setPhoto(dataUrl)
      try {
        localStorage.setItem(PHOTO_STORAGE_KEY, dataUrl)
      } catch (err) {
        console.error('Ошибка сохранения фото в localStorage', err)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRequisiteChange = (field, value) => {
    const updated = { ...requisites, [field]: value }
    setRequisites(updated)
    try {
      localStorage.setItem(REQUISITES_STORAGE_KEY, JSON.stringify(updated))
    } catch (err) {
      console.error('Ошибка сохранения реквизитов в localStorage', err)
    }
  }

  const handleCopy = (key, value) => {
    if (!value) return
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(key)
      setTimeout(() => setCopiedField(null), 1200)
    }).catch(err => console.error('Ошибка копирования:', err))
  }

  const handleShareRequisites = () => {
    const textToShare = `
ФИО: ${requisites.fio}
ИИН: ${requisites.iin}
Дата рождения: ${requisites.birthdate}
Номер документа: ${requisites.docNumber}
Дата выдачи: ${requisites.issueDate}
Срок действия: ${requisites.expiryDate}
    `.trim()

    if (navigator.share) {
      navigator.share({
        title: 'Удостоверение личности',
        text: textToShare
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(textToShare)
      alert('Реквизиты скопированы!')
    }
  }

  return (
    <div className="id-screen">
      {/* Верхняя часть страницы */}
      <div className="id-main-content">
        {/* Шапка */}
        <div className="id-header">
          <button className="back-btn" onClick={onBack} aria-label="Назад">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="#1c1c1e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1>Удостоверение личности</h1>
          <div style={{ width: 22 }} />
        </div>

        {/* Табы */}
        <div className="id-tabs">
          <button 
            className={`id-tab ${tab === 'document' ? 'id-tab--active' : ''}`} 
            onClick={() => setTab('document')}
          >
            Документ
          </button>
          <button 
            className={`id-tab ${tab === 'requisites' ? 'id-tab--active' : ''}`} 
            onClick={() => setTab('requisites')}
          >
            Реквизиты
          </button>
        </div>

        {/* Содержимое вкладок */}
        {tab === 'document' ? (
          photo ? (
            <div className="id-photo-wrap">
              <img src={photo} alt="Удостоверение личности" className="id-photo" />
            </div>
          ) : (
            <div className="id-empty">
              <span>Документ не добавлен</span>
            </div>
          )
        ) : (
          <div className="id-requisites-list">
            
            <div className="req-item">
              <label className="req-label">ФИО</label>
              <div className="req-input-wrap">
                <input
                  type="text"
                  className="req-input"
                  value={requisites.fio}
                  onChange={(e) => handleRequisiteChange('fio', e.target.value)}
                />
                <button className="copy-btn" onClick={() => handleCopy('fio', requisites.fio)}>
                  {copiedField === 'fio' ? <span className="copied-toast">✓</span> : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <rect x="9" y="9" width="12" height="12" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="req-item">
              <label className="req-label">ИИН</label>
              <div className="req-input-wrap">
                <input
                  type="text"
                  className="req-input"
                  value={requisites.iin}
                  onChange={(e) => handleRequisiteChange('iin', e.target.value)}
                />
                <button className="copy-btn" onClick={() => handleCopy('iin', requisites.iin)}>
                  {copiedField === 'iin' ? <span className="copied-toast">✓</span> : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <rect x="9" y="9" width="12" height="12" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="req-item">
              <label className="req-label">Дата рождения</label>
              <div className="req-input-wrap">
                <input
                  type="text"
                  className="req-input"
                  value={requisites.birthdate}
                  onChange={(e) => handleRequisiteChange('birthdate', e.target.value)}
                />
                <button className="copy-btn" onClick={() => handleCopy('birthdate', requisites.birthdate)}>
                  {copiedField === 'birthdate' ? <span className="copied-toast">✓</span> : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <rect x="9" y="9" width="12" height="12" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="req-item">
              <label className="req-label">Номер документа</label>
              <div className="req-input-wrap">
                <input
                  type="text"
                  className="req-input"
                  value={requisites.docNumber}
                  onChange={(e) => handleRequisiteChange('docNumber', e.target.value)}
                />
                <button className="copy-btn" onClick={() => handleCopy('docNumber', requisites.docNumber)}>
                  {copiedField === 'docNumber' ? <span className="copied-toast">✓</span> : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <rect x="9" y="9" width="12" height="12" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="req-item">
              <label className="req-label">Дата выдачи</label>
              <div className="req-input-wrap">
                <input
                  type="text"
                  className="req-input"
                  value={requisites.issueDate}
                  onChange={(e) => handleRequisiteChange('issueDate', e.target.value)}
                />
                <button className="copy-btn" onClick={() => handleCopy('issueDate', requisites.issueDate)}>
                  {copiedField === 'issueDate' ? <span className="copied-toast">✓</span> : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <rect x="9" y="9" width="12" height="12" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="req-item">
              <label className="req-label">Срок действия</label>
              <div className="req-input-wrap">
                <input
                  type="text"
                  className="req-input"
                  value={requisites.expiryDate}
                  onChange={(e) => handleRequisiteChange('expiryDate', e.target.value)}
                />
                <button className="copy-btn" onClick={() => handleCopy('expiryDate', requisites.expiryDate)}>
                  {copiedField === 'expiryDate' ? <span className="copied-toast">✓</span> : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <rect x="9" y="9" width="12" height="12" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Нижние кнопки */}
      <div className="id-actions">
        {tab === 'document' ? (
          <>
            <button className="id-btn id-btn--primary" onClick={() => fileInputRef.current?.click()}>
              <img src="/icons/documentt.png" alt="предъявить" />
            </button>
            <button className="id-btn id-btn--secondary" onClick={() => fileInputRef.current?.click()}>
              <img src="/icons/senddocument.png" alt="отправить" />
              {photo ? 'Отправить документ'}
            </button>
          </>
        ) : (
          <button className="id-btn id-btn--secondary" onClick={handleShareRequisites}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--kaspi-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Отправить реквизиты
          </button>
        )}
      </div>
    </div>
  )
}
