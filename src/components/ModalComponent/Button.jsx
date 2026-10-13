import React from 'react'

function Button({ children, onClick, variant = 'ghost', className = '', disabled, title }) {
  const base = 'px-3 py-1.5 text-[12px] rounded-lg font-medium transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100'
  const variants = {
    ghost: 'text-gray-500 hover:bg-gray-100',
    primary: 'bg-gray-800 text-white hover:bg-gray-700',
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export default Button
