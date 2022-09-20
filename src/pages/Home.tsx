import React, {useEffect, useState} from 'react'
import Cell from '../components/Cell'
import {difficulties} from '../constants/difficulty'
import {CellInterface} from '../interfaces/cell.interface'

const Home: React.FC = () => {
  const [difficulty, setDifficulty] = useState<number>(1)
  const [cellCount, setCellCount] = useState<number>(16)
  const [lock, setLock] = useState<string>('')

  const [tag, setTag] = useState<CellInterface>({} as CellInterface)
  const [cells, setCells] = useState<CellInterface[]>([])

  useEffect(() => {
    const squares: CellInterface[] = []
    for (let i = 1; i <= cellCount / 2; i++) {
      const key = Math.random()

      for (let k = 1; k <= 2; k++) {
        const cell = {} as CellInterface
        cell.img = `/images/icon_${i}.png`
        cell.key = key
        cell.shuffleKey = Math.random()

        squares.push(cell)
      }
    }
    setCells(squares)
  }, [difficulty]) // eslint-disable-line

  return (
    <main className="main">
      <nav className="difficulty">
        {difficulties.map((d) => (
          <button
            key={d.diff}
            onClick={() => {
              setDifficulty(d.diff)
              setCellCount(d.cells)
              setTag({} as CellInterface)
            }}
            className="difficulty-selected"
          >
            {d.title}
          </button>
        ))}
      </nav>

      <section
        className={`board ${lock}`}
        style={{
          gridTemplateColumns: `repeat(${Math.sqrt(cellCount)}, 1fr)`,
        }}
      >
        {cells
          .sort((a, b) => (a.shuffleKey > b.shuffleKey ? 1 : -1))
          .map((c: CellInterface) => (
            <Cell
              key={c.shuffleKey}
              cell={c}
              tag={tag}
              setTag={setTag}
              cells={cells}
              setCells={setCells}
              setLock={setLock}
            />
          ))}
      </section>
    </main>
  )
}

export default Home
