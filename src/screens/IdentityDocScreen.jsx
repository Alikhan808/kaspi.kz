import React, { useEffect, useRef, useState } from 'react'
import './IdentityDocScreen.css'

const STORAGE_KEY = 'kaspi_clone_identity_doc_photo'

export default function IdentityDocScreen({ onBack }) {
  const [tab, setTab] = useState('document')
  const [photo, setPhoto] = useState(null)
  const [justSaved, setJustSaved] = useState(false)
  const fileInputRef = useRef(null)

  // При открытии экрана подгружаем ранее сохранённое фото из localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setPhoto(saved)
    } catch (e) {
      console.error('Не удалось прочитать localStorage', e)
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
        localStorage.setItem(STORAGE_KEY, dataUrl)
        setJustSaved(true)
        setTimeout(() => setJustSaved(false), 2000)
      } catch (err) {
        console.error('Не удалось сохранить в localStorage', err)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPhoto(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error(e)
    }
  }
   <script>
    // Идентификаторы всех полей
    const fields = ['fio', 'iin', 'birthdate', 'doc_number', 'issue_date', 'expiry_date'];

    // Загрузка сохраненных данных при старте
    document.addEventListener('DOMContentLoaded', () => {
      fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const savedValue = localStorage.getItem('user_doc_' + fieldId);
        
        if (savedValue !== null) {
          input.value = savedValue;
        }

        // Сохранение при вводе любого символа
        input.addEventListener('input', (e) => {
          localStorage.setItem('user_doc_' + fieldId, e.target.value);
        });
      });
    });

    // Функция для копирования текста при нажатии на иконку
    function copyToClipboard(fieldId) {
      const input = document.getElementById(fieldId);
      if (input.value) {
        navigator.clipboard.writeText(input.value).then(() => {
          alert('Скопировано: ' + input.value);
        }).catch(err => {
          console.error('Ошибка копирования:', err);
        });
      }
    }
  </script>

  return (
    <div className="id-screen">
      <div className="id-header">
        <button className="back-btn" onClick={onBack} aria-label="Назад">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 5L8 12L15 19" stroke="#1c1c1e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>Удостоверение личности</h1>
        <div style={{ width: 22 }} />
      </div>

      <div className="id-tabs">
        <button className={`id-tab ${tab === 'document' ? 'id-tab--active' : ''}`} onClick={() => setTab('document')}>
          Документ
        </button>
        <button className={`id-tab ${tab === 'requisites' ? 'id-tab--active' : ''}`} onClick={() => setTab('requisites')}>
          Реквизиты
        </button>
      </div>

      <div className="id-content">
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
          <div className="id-empty">
           

   
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

      <div className="id-actions">
        <button className="id-btn id-btn--primary" onClick={() => fileInputRef.current?.click()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#fff" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#fff" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#fff" />
          </svg>
          Предъявить документ
        </button>
        <button className="id-btn id-btn--secondary" onClick={() => fileInputRef.current?.click()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 16V4M12 4L7 9M12 4L17 9" stroke="var(--kaspi-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16" stroke="var(--kaspi-blue)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {photo ? 'Заменить документ' : 'Отправить документ'}
        </button>
      </div>
    </div>
  )
}
