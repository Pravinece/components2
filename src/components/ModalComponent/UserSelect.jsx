import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './Select.module.css'
import CustomSearch from './CustomSearch'
import CustomRole from './CustomRole'
import Button from './Button'
import FixedUserList from './FixedUserList'
import { ChevronDown, X } from 'lucide-react'

function CustomSelect({ options = [], loading = false, onSubmit, placeholder = 'Select users', className = '' }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({})
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('all')
  const [selected, setSelected] = useState(null)

  const btnRef = useRef(null)
  const ulRef = useRef(null)
  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const dragPos = useRef({})

  const handleMouseDown = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const portalHeight = 300
      const spaceBelow = window.innerHeight - rect.top
      const top = spaceBelow < portalHeight ? window.innerHeight - portalHeight : rect.top
      const p = { top, left: rect.left }
      setPos(p)
      dragPos.current = p
    }
  }
  
  const handleOpen = () => setOpen(o => !o)

  const handleClear = () => { setSearch(''); setRole('all');}

  const handleSubmit = () => { onSubmit?.(selected); setOpen(false) }

  useEffect(() => {
    const handleClick = (e) => {
      if (!btnRef.current?.contains(e.target) && !ulRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = options.filter(opt => {
    const matchSearch = opt.label.toLowerCase().includes(search.toLowerCase()) ||
      opt.email?.toLowerCase().includes(search.toLowerCase())
    const matchRole = role === 'all' || opt.role === role
    return matchSearch && matchRole
  })

  return (
    <>
      {<button
        ref={btnRef}
        onMouseDown={handleMouseDown}
        onClick={handleOpen}
        className={`h-9 px-4 min-w-[250px] flex justify-between items-center border border-gray-200 rounded-2xl text-[12px] text-gray-500 bg-white hover:bg-gray-50 active:scale-95 transition-all ${className}`}
      >
        <span className='truncate text-[14px] pointer-events-none'>{selected ? options.find(o => o.value === selected)?.label : placeholder}</span>
        <span><ChevronDown /></span>
      </button>}

      {createPortal(
        <div
          ref={ulRef}
          style={{ top: pos.top, left: pos.left, width: 250 }}
          {...(!open ? { 'data-closed': '' } : {})}
          className={`${styles.dropdown} fixed bg-white border border-gray-200 rounded-2xl shadow-lg z-[9999] select-none`}
        >
          {/* Header */}
          <div className='flex items-center justify-between p-2 border-b border-gray-100'>
            <span className='text-[13px] font-semibold bg-gray-200 rounded-2xl text-gray-700 h-6 px-2'>Filter Users</span>
            <button onClick={() => setOpen(false)} className='text-gray-800 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-2xl  hover:text-gray-600 cursor-pointer'>
              <X size={13} />
            </button>
          </div>

          {/* Search + Role */}
          <div className='p-2 flex items-center gap-2 border-b border-gray-100'>
            <CustomSearch value={search} onChange={setSearch} />
            <CustomRole value={role} onChange={setRole} />
          </div>

          {/* User List */}
          {loading ? (
            <div className='px-4 py-6 text-center text-[12px] text-gray-400'>Loading...</div>
          ) : filtered.length === 0 ? (
            <div className='px-4 py-6 text-center text-[12px] text-gray-400'>No users found</div>
          ) : (
            <FixedUserList options={filtered} selected={selected} onSelect={setSelected} />
          )}

          {/* Footer */}
          <div className='flex items-center justify-end gap-2 p-2 border-t border-gray-100 bg-gray-50'>
            <Button onClick={handleClear} variant='ghost' disabled={!search && role === 'all'}>Clear Filter</Button>
            <Button onClick={handleSubmit} variant='primary' disabled={!selected}>Submit</Button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default CustomSelect
