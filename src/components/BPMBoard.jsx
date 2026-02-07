import React, { useState, useCallback } from 'react'
import { BPM_STAGES, BPM_CARDS_BY_STAGE, cardMatchesHighlight } from '../data/bpmData'
import './BPMBoard.css'

function BPMBoard({ highlightCardName, onClose }) {
  const [stages, setStages] = useState(BPM_STAGES)
  const [cardsByStage, setCardsByStage] = useState(BPM_CARDS_BY_STAGE)
  const [dragged, setDragged] = useState(null)

  const handleDragStart = useCallback((e, stageName, cardId) => {
    setDragged({ stageName, cardId })
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', JSON.stringify({ stageName, cardId }))
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDrop = useCallback((e, targetStageName) => {
    e.preventDefault()
    if (!dragged) return
    const { stageName: fromStage, cardId } = dragged
    if (fromStage === targetStageName) {
      setDragged(null)
      return
    }
    const card = cardsByStage[fromStage]?.find((c) => c.id === cardId)
    if (!card) {
      setDragged(null)
      return
    }
    setCardsByStage((prev) => {
      const next = { ...prev }
      next[fromStage] = (next[fromStage] || []).filter((c) => c.id !== cardId)
      next[targetStageName] = [...(next[targetStageName] || []), card]
      return next
    })
    setDragged(null)
  }, [dragged, cardsByStage])

  return (
    <div className="bpm-board-wrap">
      <div className="bpm-board-header">
        <h2>BPM-платформа</h2>
        <button type="button" className="bpm-board-close" onClick={onClose}>
          Закрыть
        </button>
      </div>
      <div className="bpm-board">
        {stages.map((stageName) => (
          <div
            key={stageName}
            className="bpm-stage-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stageName)}
          >
            <div className="bpm-stage-title">{stageName}</div>
            <div className="bpm-stage-cards">
              {(cardsByStage[stageName] || []).map((card) => {
                const isHighlight = cardMatchesHighlight(card.name, highlightCardName)
                return (
                  <div
                    key={card.id}
                    className={`bpm-card ${isHighlight ? 'bpm-card-highlight' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, stageName, card.id)}
                  >
                    <span className="bpm-card-id">{card.id}</span>
                    <span className="bpm-card-name">{card.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BPMBoard
