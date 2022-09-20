import React, {useState} from 'react'
import {CellInterface} from '../interfaces/cell.interface'

interface CellProps {
  cell: CellInterface
  tag: CellInterface
  setTag: Function
  cells: CellInterface[]
  setCells: Function
  setLock: Function
}
const Cell: React.FC<CellProps> = ({
  cell,
  tag,
  setTag,
  cells,
  setCells,
  setLock,
}) => {
  const [color, setColor] = useState<string>('')

  const isMatch = () => {
    setLock('events-none')
    if (tag.key === cell.key) {
      setColor('cell-success')

      setTimeout(() => {
        manageCells()
        setColor('')
        setLock('')
        setTag({})
      }, 500)
    } else {
      setColor('cell-error')
      setTimeout(() => {
        setColor('')
        setLock('')
        setTag({})
      }, 500)
    }
  }

  const manageTags = () => {
    if (Object.keys(tag).length === 0) {
      setTag(cell)
    } else {
      isMatch()
    }
  }

  const manageCells = () => {
    const newList = cells.filter((c) => c.key !== cell.key)
    setCells([...newList, {...tag, status: true}, {...cell, status: true}])
  }

  return (
    <div
      onClick={() => {
        if (tag.shuffleKey !== cell.shuffleKey) {
          manageTags()
        }
      }}
      className={`cell ${
        tag.shuffleKey === cell?.shuffleKey ? 'cell-open' : ''
      } ${color} ${cell.status ? 'cell-closed' : ''} `}
    >
      <img src={cell.img} alt="cell icon" />
    </div>
  )
}

export default Cell
