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
  expiryDate: '',
}

const FIELDS = [
  ['fio', 'ФИО'],
  ['iin', 'ИИН'],
  ['birthdate', 'Дата рождения'],
  ['docNumber', 'Номер документа'],
  ['issueDate', 'Дата выдачи'],
  ['expiryDate', 'Срок действия'],
]

function ShareIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M12 16V2M7 7l5-5 5 5" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

// Декоративный рисунок: не содержит данных документа.
function DemoQrCode() {
  const size = 37
  const cells = []
  const origins = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ]

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const finder = origins.find(
        ([ox, oy]) =>
          x >= ox - 1 &&
          x <= ox + 7 &&
          y >= oy - 1 &&
          y <= oy + 7,
      )

      let filled

      if (finder) {
        const dx = x - finder[0]
        const dy = y - finder[1]

        filled =
          dx >= 0 &&
          dx < 7 &&
          dy >= 0 &&
          dy < 7 &&
          (dx === 0 ||
            dx === 6 ||
            dy === 0 ||
            dy === 6 ||
            (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4))
      } else {
        filled = (x * 17 + y * 31 + x * y * 7) % 19 < 9
      }

      if (filled) {
        cells.push(
          <rect
            key={`${x}-${y}`}
            x={x + 2}
            y={y + 2}
            width="1"
            height="1"
          />,
        )
      }
    }
  }

  return (
    <svg
      className="id-demo-qr"
      viewBox="0 0 41 41"
      role="img"
      aria-label="Демонстрационный QR-код"
      shapeRendering="crispEdges"
    >
      {cells}
    </svg>
  )
}


function PhotoOverlay({ title, onClose, children, className = '' }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const trigger = document.activeElement
    const scroller = panelRef.current?.closest('.phone-screen')?.querySelector('.screen-container')
    const previousOverflow = scroller?.style.overflowY
    if (scroller) scroller.style.overflowY = 'hidden'
    panelRef.current?.querySelector('button')?.focus()
    return () => {
      if (scroller) scroller.style.overflowY = previousOverflow
      trigger?.focus()
    }
  }, [])

  return (
    <div className="id-photo-overlay" onClick={onClose}>
      <section
        ref={panelRef}
        className={`id-photo-dialog ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') onClose()
          if (event.key !== 'Tab') return
          const buttons = [...panelRef.current.querySelectorAll('button:not(:disabled)')]
          const first = buttons[0]
          const last = buttons[buttons.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }}
      >
        <header className="id-photo-dialog-header">
          <h2>{title}</h2>
          <button className="id-photo-close" aria-label="Закрыть" onClick={onClose}>×</button>
        </header>
        {children}
      </section>
    </div>
  )
}

function ZoomablePhoto({ photo }) {
  const stageRef = useRef(null)
  const viewRef = useRef({ scale: 1, x: 0, y: 0 })
  const gestureRef = useRef({ points: new Map(), start: null, lastTap: 0, lastTouch: 0, moved: false })
  const [view, setView] = useState(viewRef.current)

  const applyView = (next) => {
    const stage = stageRef.current
    const scale = Math.min(4, Math.max(1, next.scale))
    const maxX = (stage?.clientWidth || 0) * (scale - 1) / 2
    const maxY = (stage?.clientHeight || 0) * (scale - 1) / 2
    const bounded = {
      scale,
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    }
    viewRef.current = bounded
    setView(bounded)
  }

  const position = (point) => {
    const rect = stageRef.current.getBoundingClientRect()
    return { x: point.x - rect.left - rect.width / 2, y: point.y - rect.top - rect.height / 2 }
  }

  const zoomAt = (scale, point = { x: 0, y: 0 }) => {
    const current = viewRef.current
    const nextScale = Math.min(4, Math.max(1, scale))
    const ratio = nextScale / current.scale
    applyView({
      scale: nextScale,
      x: point.x - (point.x - current.x) * ratio,
      y: point.y - (point.y - current.y) * ratio,
    })
  }

  const beginGesture = () => {
    const points = [...gestureRef.current.points.values()]
    if (!points.length) {
      gestureRef.current.start = null
      return
    }
    const center = points.length === 2
      ? { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 }
      : points[0]
    gestureRef.current.start = {
      ...viewRef.current,
      center: position(center),
      distance: points.length === 2
        ? Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
        : 0,
    }
  }

  useEffect(() => {
    const stage = stageRef.current
    const handleWheel = (event) => {
      event.preventDefault()
      zoomAt(viewRef.current.scale * Math.exp(-event.deltaY * 0.002), position({ x: event.clientX, y: event.clientY }))
    }
    const resize = new ResizeObserver(() => applyView(viewRef.current))
    resize.observe(stage)
    stage.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      resize.disconnect()
      stage.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className="id-photo-wrap id-photo-zoom"
      tabIndex={0}
      role="group"
      aria-label="Фотография документа. Увеличение: жест двумя пальцами, колесо мыши или клавиши плюс и минус. Сброс: двойное нажатие или клавиша 0."
      onDoubleClick={(event) => {
        if (performance.now() - gestureRef.current.lastTouch < 600) return
        zoomAt(viewRef.current.scale === 1 ? 2 : 1, position({ x: event.clientX, y: event.clientY }))
      }}
      onKeyDown={(event) => {
        const current = viewRef.current
        if (['+', '=', '-', '0', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) event.preventDefault()
        if (event.key === '+' || event.key === '=') zoomAt(current.scale + 0.5)
        if (event.key === '-') zoomAt(current.scale - 0.5)
        if (event.key === '0') applyView({ scale: 1, x: 0, y: 0 })
        if (event.key === 'ArrowLeft') applyView({ ...current, x: current.x + 30 })
        if (event.key === 'ArrowRight') applyView({ ...current, x: current.x - 30 })
        if (event.key === 'ArrowUp') applyView({ ...current, y: current.y + 30 })
        if (event.key === 'ArrowDown') applyView({ ...current, y: current.y - 30 })
      }}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return
        const gesture = gestureRef.current
        if (event.pointerType === 'touch') gesture.lastTouch = performance.now()
        if (gesture.points.size >= 2) return
        event.currentTarget.setPointerCapture(event.pointerId)
        gesture.points.set(event.pointerId, { x: event.clientX, y: event.clientY })
        if (gesture.points.size === 1) gesture.moved = false
        else {
          gesture.moved = true
          gesture.lastTap = 0
        }
        beginGesture()
      }}
      onPointerMove={(event) => {
        const gesture = gestureRef.current
        if (!gesture.points.has(event.pointerId) || !gesture.start) return
        gesture.points.set(event.pointerId, { x: event.clientX, y: event.clientY })
        const points = [...gesture.points.values()]
        const center = position(points.length === 2
          ? { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 }
          : points[0])
        const start = gesture.start
        if (Math.hypot(center.x - start.center.x, center.y - start.center.y) > 5) gesture.moved = true
        const distance = points.length === 2
          ? Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
          : 0
        const scale = start.distance > 0
          ? Math.min(4, Math.max(1, start.scale * distance / start.distance))
          : start.scale
        const ratio = scale / start.scale
        applyView({
          scale,
          x: center.x - (start.center.x - start.x) * ratio,
          y: center.y - (start.center.y - start.y) * ratio,
        })
      }}
      onPointerUp={(event) => {
        const gesture = gestureRef.current
        if (!gesture.points.has(event.pointerId)) return
        if (event.pointerType === 'touch' && gesture.points.size === 1 && !gesture.moved) {
          const now = performance.now()
          if (gesture.lastTap && now - gesture.lastTap < 300) {
            zoomAt(viewRef.current.scale === 1 ? 2 : 1, position({ x: event.clientX, y: event.clientY }))
            gesture.lastTap = 0
          } else gesture.lastTap = now
        }
        gesture.points.delete(event.pointerId)
        beginGesture()
      }}
      onPointerCancel={(event) => {
        gestureRef.current.points.delete(event.pointerId)
        gestureRef.current.lastTap = 0
        beginGesture()
      }}
    >
      <img
        src={photo}
        alt="Удостоверение личности"
        className="id-photo"
        draggable={false}
        style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
      />
    </div>
  )
}

export default function IdentityDocScreen({ onBack }) {
  const [tab, setTab] = useState('document')
  const [photo, setPhoto] = useState(null)
  const [requisites, setRequisites] = useState(INITIAL_REQUISITES)
  const [copiedField, setCopiedField] = useState(null)
  const [presenting, setPresenting] = useState(false)
  const [presentationCode, setPresentationCode] = useState('')
  const [photoDialog, setPhotoDialog] = useState(null)
  const modalOpen = presenting || photoDialog !== null

  const fileInputRef = useRef(null)
  const closeButtonRef = useRef(null)
  const presentButtonRef = useRef(null)
  const copyTimerRef = useRef(null)

  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem(PHOTO_STORAGE_KEY)
      if (savedPhoto) setPhoto(savedPhoto)

      const saved = JSON.parse(
        localStorage.getItem(REQUISITES_STORAGE_KEY) || 'null',
      )

      if (saved && typeof saved === 'object') {
        const restored = { ...INITIAL_REQUISITES }

        for (const [key] of FIELDS) {
          if (typeof saved[key] === 'string') {
            restored[key] = saved[key]
          }
        }

        setRequisites(restored)
      }
    } catch (error) {
      console.error('Ошибка чтения сохранённых данных:', error)
    }

    return () => clearTimeout(copyTimerRef.current)
  }, [])

  useEffect(() => {
    if (!presenting) return

    const trigger = presentButtonRef.current
    const scroller = trigger?.closest('.screen-container')
    const previousOverflow = scroller?.style.overflowY

    if (scroller) scroller.style.overflowY = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      if (scroller) scroller.style.overflowY = previousOverflow
      trigger?.focus()
    }
  }, [presenting])

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Выберите изображение.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const dataUrl = reader.result
      if (typeof dataUrl !== 'string') return

      setPhoto(dataUrl)

      try {
        localStorage.setItem(PHOTO_STORAGE_KEY, dataUrl)
      } catch {
        alert(
          'Фото открыто, но сохранить его не удалось. Попробуйте изображение меньшего размера.',
        )
      }
    }

    reader.onerror = () => alert('Не удалось прочитать изображение.')
    reader.readAsDataURL(file)
  }

  const handleRequisiteChange = (field, value) => {
    const updated = { ...requisites, [field]: value }
    setRequisites(updated)

    try {
      localStorage.setItem(
        REQUISITES_STORAGE_KEY,
        JSON.stringify(updated),
      )
    } catch (error) {
      console.error('Ошибка сохранения реквизитов:', error)
    }
  }

  const handleCopy = async (key, value) => {
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(key)
      clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(
        () => setCopiedField(null),
        1200,
      )
    } catch {
      alert('Не удалось скопировать. Выделите и скопируйте текст вручную.')
    }
  }

  const handleShareRequisites = async () => {
    const text = FIELDS.map(
      ([key, label]) => `${label}: ${requisites[key]}`,
    ).join('\n')

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Удостоверение личности',
          text,
        })
      } else {
        await navigator.clipboard.writeText(text)
        alert('Реквизиты скопированы!')
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        alert('Не удалось отправить или скопировать реквизиты.')
      }
    }
  }

  const presentDocument = () => {
    setPresentationCode(
      String(Math.floor(100000 + Math.random() * 900000)),
    )
    setPresenting(true)
  }

  return (
    <div className="id-screen">
      <div
        className="id-main-content"
        inert={modalOpen ? '' : undefined}
      >
        <div className="id-header">
          <button
            className="back-btn"
            onClick={onBack}
            aria-label="Назад"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 5L8 12L15 19"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <h1>Удостоверение личности</h1>
          <div className="id-header-spacer" />
        </div>

        <div className="id-tabs">
          <button
            className={`id-tab ${
              tab === 'document' ? 'id-tab--active' : ''
            }`}
            onClick={() => setTab('document')}
            aria-pressed={tab === 'document'}
          >
            Документ
          </button>

          <button
            className={`id-tab ${
              tab === 'requisites' ? 'id-tab--active' : ''
            }`}
            onClick={() => setTab('requisites')}
            aria-pressed={tab === 'requisites'}
          >
            Реквизиты
          </button>
        </div>

        {tab === 'document' ? (
          photo ? (
            <ZoomablePhoto key={photo} photo={photo} />
          ) : (
            <div className="id-empty">
              <span>Документ не добавлен</span>
              <p className="id-empty-hint">Добавьте фото через «Отправить документ»</p>
            </div>
          )
        ) : (
          <div className="id-requisites-list">
            {FIELDS.map(([key, label]) => (
              <div className="req-item" key={key}>
                <label className="req-label" htmlFor={`req-${key}`}>
                  {label}
                </label>

                <div className="req-input-wrap">
                  <input
                    id={`req-${key}`}
                    type="text"
                    className="req-input"
                    value={requisites[key]}
                    onChange={(event) =>
                      handleRequisiteChange(key, event.target.value)
                    }
                  />

                  <button
                    className="copy-btn"
                    aria-label={`Скопировать: ${label}`}
                    onClick={() => handleCopy(key, requisites[key])}
                  >
                    {copiedField === key ? (
                      <span className="copied-toast">✓</span>
                    ) : (
                      <CopyIcon />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

      <div className="id-actions" inert={modalOpen ? '' : undefined}>
        {tab === 'document' ? (
          <>
            <button
              ref={presentButtonRef}
              className="id-btn id-btn--primary"
              onClick={presentDocument}
              style={{ padding: 0, height: 'auto', overflow: 'hidden', background: 'transparent' }}
            >
              <img
                src="/icons/documentt.jpg"
                alt="Предъявить документ"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </button>

            <button
              className="id-btn id-btn--secondary"
              onClick={() => setPhotoDialog('manage')}
            >
              <ShareIcon />
              Отправить документ
            </button>
          </>
        ) : (
          <button
            className="id-btn id-btn--secondary"
            onClick={handleShareRequisites}
          >
            <ShareIcon />
            Отправить реквизиты
          </button>
        )}
      </div>

      {photoDialog === 'manage' && (
        <PhotoOverlay title="Фотография документа" onClose={() => setPhotoDialog(null)} className="id-photo-manage">
          <button
            className="id-photo-menu-item"
            onClick={() => {
              fileInputRef.current?.click()
              setPhotoDialog(null)
            }}
          >
            {photo ? 'Заменить фотографию' : 'Добавить фотографию'}
          </button>
          {photo && (
            <button className="id-photo-menu-item id-photo-delete" onClick={() => {
              try {
                localStorage.removeItem(PHOTO_STORAGE_KEY)
                setPhoto(null)
                setPhotoDialog(null)
              } catch {
                alert('Не удалось удалить сохранённую фотографию.')
              }
            }}>
              Удалить фотографию
            </button>
          )}
        </PhotoOverlay>
      )}

      {presenting && (
        <div
          className="id-present-overlay"
          onClick={() => setPresenting(false)}
        >
          <section
            className="id-present-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="id-present-title"
            aria-describedby="id-present-instruction"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setPresenting(false)
              }

              if (event.key === 'Tab') {
                event.preventDefault()
                closeButtonRef.current?.focus()
              }
            }}
          >
            <div className="id-sheet-handle" aria-hidden="true" />

            <div className="id-sheet-header">
              <h2 id="id-present-title">Удостоверение личности</h2>

              <button
                ref={closeButtonRef}
                className="id-sheet-close"
                aria-label="Закрыть"
                onClick={() => setPresenting(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m5 5 14 14M19 5 5 19" />
                </svg>
              </button>
            </div>

            <p id="id-present-instruction">
              Покажите QR-код сотруднику
            </p>

            <DemoQrCode />

            <p className="id-code-caption">или скажите код</p>
            <p className="id-presentation-code">
              {presentationCode}
            </p>
          </section>
        </div>
      )}
    </div>
  )
}
