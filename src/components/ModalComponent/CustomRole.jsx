import React from 'react'

const ROLES = ['all', 'admin', 'user', 'viewer']

function CustomRole({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className='text-[12px] text-gray-600 border border-gray-200 rounded-2xl px-2 py-1.5 bg-white outline-none cursor-pointer'
    >
      {ROLES.map(r => (
        <option key={r} value={r} className='capitalize'>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
      ))}
    </select>
  )
}

export default CustomRole
