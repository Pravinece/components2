import React from 'react'
import { List } from 'react-window'

const ITEM_HEIGHT = 48

const Row = ({ index, style, items, selected, onSelect }) => {
  const opt = items[index]
  return (
    <div
      style={style}
      onMouseDown={() => onSelect(opt.value)}
      className={`flex items-center gap-3 px-4 cursor-pointer transition-colors ${selected === opt.value ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
    >
      <span className='w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-[11px] font-semibold flex items-center justify-center uppercase shrink-0'>
        {opt.label.charAt(0)}
      </span>
      <div className='flex flex-col min-w-0'>
        <span className='text-[12px] font-medium text-gray-700 truncate'>{opt.label}</span>
        <span className='text-[11px] text-gray-400 truncate'>{opt.email}</span>
      </div>
    </div>
  )
}

function FixedUserList({ options, selected, onSelect }) {
  return (
    <div style={{ height: 150, overflow: 'hidden' }}>
      <List
        rowComponent={Row}
        rowProps={{ items: options, selected, onSelect }}
        rowCount={options.length}
        rowHeight={ITEM_HEIGHT}
        defaultHeight={150}
        defaultWidth="100%"
        overscanCount={2}
      />
    </div>
  )
}

export default FixedUserList

{/* <List
  rowComponent={Row}
  rowProps={{ items: options, selected, onSelect }}
  rowCount={options.length}
  rowHeight={ITEM_HEIGHT}
  defaultHeight={150}
  defaultWidth="100%"
  overscanCount={2}
  innerElementType="tbody"
  outerElementType={({ children, ...rest }) => (
    <div {...rest} style={{ ...rest.style, height: 150, overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        {children}
      </table>
    </div>
  )}
/> */}
