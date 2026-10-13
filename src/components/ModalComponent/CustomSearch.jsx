import React from 'react'
import { Search } from 'lucide-react'

function CustomSearch({ value, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-2xl ${className}`}>
      <Search size={13} className='text-gray-400 shrink-0' />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder='Search users...'
        className='bg-transparent text-[12px] text-gray-700 placeholder-gray-400 outline-none w-full'
      />
    </div>
  )
}

export default CustomSearch
