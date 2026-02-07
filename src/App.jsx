import React, { useState, useMemo } from 'react'
import './App.css'
import RussiaMap from './components/RussiaMap'
import WindRose from './components/WindRose'
import { PRODUCTION_STAGES, OBJECTS_BY_STAGE, DEFAULT_OBJECTS } from './data/rosesData'
import Hypercube3D from './components/Hypercube3D'
import LifecycleChart from './components/LifecycleChart'
import CashFlowChart from './components/CashFlowChart'
import CDPage from './components/CDPage'
import BPMBoard from './components/BPMBoard'

function App() {
  const [selectedLeftStageIndex, setSelectedLeftStageIndex] = useState(null)
  const [selectedRightObjectIndex, setSelectedRightObjectIndex] = useState(null)
  const [cdPageNode, setCdPageNode] = useState(null)
  const [showBpm, setShowBpm] = useState(false)
  const [bpmHighlight, setBpmHighlight] = useState(null)

  const rightRoseData = useMemo(() => {
    if (selectedLeftStageIndex != null) {
      const stageName = PRODUCTION_STAGES[selectedLeftStageIndex].name
      return OBJECTS_BY_STAGE[stageName] || DEFAULT_OBJECTS
    }
    return DEFAULT_OBJECTS
  }, [selectedLeftStageIndex])

  const handleLeftSegmentClick = (index) => {
    setSelectedLeftStageIndex((prev) => (prev === index ? null : index))
    setSelectedRightObjectIndex(null)
  }

  const handleRightSegmentClick = (index) => {
    setSelectedRightObjectIndex((prev) => (prev === index ? null : index))
  }

  if (cdPageNode) {
    return (
      <div className="app">
        <CDPage nodeName={cdPageNode} onBack={() => setCdPageNode(null)} />
      </div>
    )
  }

  if (showBpm) {
    return (
      <div className="app">
        <BPMBoard
          highlightCardName={bpmHighlight}
          onClose={() => { setShowBpm(false); setBpmHighlight(null) }}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={`${import.meta.env.BASE_URL}emblem.png`} alt="ЦДА" className="app-header-emblem" />
        <div className="app-header-text">
          <h1>ЛИЦО ЦДА</h1>
          <p>(Цифровой Двойник Актива)</p>
        </div>
      </header>

      <div className="app-content">
        {/* Карта объектов ЦДА */}
        <section className="section map-section">
          <h2>Карта объектов ЦДА</h2>
          <RussiaMap onCdNodeClick={setCdPageNode} />
        </section>

        {/* Карта здоровья цифровых двойников */}
        <section className="section wind-rose-section">
          <h2 className="wind-rose-section-title">Карта здоровья цифровых двойников</h2>
          <div className="wind-rose-container">
            <div className="wind-rose-item">
              <h3>ЦД производственных этапов</h3>
              <WindRose
                type="left"
                data={PRODUCTION_STAGES}
                centerTitle="ЦД этапов"
                selectedIndex={selectedLeftStageIndex}
                onSegmentClick={handleLeftSegmentClick}
              />
            </div>
            <div className="wind-rose-item">
              <h3>ЦД объектов</h3>
              <WindRose
                type="right"
                data={rightRoseData}
                centerTitle={selectedLeftStageIndex != null ? PRODUCTION_STAGES[selectedLeftStageIndex].name : 'ЦД объектов'}
                selectedIndex={selectedRightObjectIndex}
                onSegmentClick={handleRightSegmentClick}
              />
            </div>
          </div>
        </section>

        {/* NPV, запасы, добыча — гиперкуб */}
        <section className="section hypercube-section">
          <h2>NPV, Запасы, Добыча</h2>
          <Hypercube3D onOpenBpm={(highlight) => { setBpmHighlight(highlight); setShowBpm(true) }} />
        </section>

        {/* Cash Flow и график добычи */}
        <section className="section cashflow-section">
          <h2>Cash Flow и график добычи</h2>
          <CashFlowChart />
        </section>

        {/* Жизненный цикл актива */}
        <section className="section lifecycle-section">
          <h2>Этап выбранного жизненного цикла актива</h2>
          <LifecycleChart />
        </section>
      </div>
    </div>
  )
}

export default App
