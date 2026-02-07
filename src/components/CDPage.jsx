import React, { useState } from 'react'
import { getCdPageInfo } from '../data/cdEmblems'
import './CDPage.css'

const DEFAULT_EMBLEM = (import.meta.env.BASE_URL || '/') + 'emblem.png'

function CDPage({ nodeName, onBack }) {
  const info = getCdPageInfo(nodeName)
  const [emblemSrc, setEmblemSrc] = useState(info.emblemUrl)

  const handleEmblemError = () => setEmblemSrc(DEFAULT_EMBLEM)

  return (
    <div className="cd-page">
      <button type="button" className="cd-page-back" onClick={onBack}>
        ← Закрыть
      </button>
      <div className="cd-page-header">
        <img
          src={emblemSrc}
          alt=""
          className="cd-page-emblem"
          onError={handleEmblemError}
        />
        <div className="cd-page-text">
          <h1 className="cd-page-title">{info.title}</h1>
          <p className="cd-page-subtitle">{info.subtitle}</p>
        </div>
      </div>
      <div className="cd-page-content">
        <p className="cd-page-description">
          Страница цифрового двойника «{info.subtitle}». Здесь могут отображаться детальные данные и сценарии по выбранному ЦД.
        </p>
      </div>
    </div>
  )
}

export default CDPage
