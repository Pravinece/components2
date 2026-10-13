import { BookMarked, ChartBarIcon, DoorOpen, Menu, MessageCircleMore, User, UserCheck, X } from 'lucide-react'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { label } from 'three/tsl'

function CircleMenu({top, left}) {
    const [open, setOpen] = useState(false)

    const elements = [
        {id: 0, label: 'chat', icon: MessageCircleMore , onClick: () => console.log('chat clicked')},
        {id: 1, label: 'Users', icon: User , onClick: () => console.log('Users clicked')},
        {id: 2, label: 'Course', icon: BookMarked , onClick: () => console.log('Course clicked')},
        {id: 3, label: 'Analytics', icon: ChartBarIcon , onClick: () => console.log('Analytics clicked')},
        {id: 4, label: 'Profile', icon: UserCheck , onClick: () => console.log('Settings clicked')},
        {id: 5, label: 'Logout', icon: DoorOpen , onClick: () => console.log('Logout clicked')},
    ]

    const handleOpen = () => {
        setOpen(o => !o)
    }
  return (
        <div className={`fixed ${top ? 'top-4' : 'bottom-4'} ${left ? 'left-4' : 'right-4'} w-[150px] h-[150px] flex items-center justify-center gap-2 `}>
            <button onClick={handleOpen} className='bg-gray-300 outline-none shadow-lg border-2 border-white text-gray-600 p-2 rounded-full flex items-center justify-center cursor-pointer active:rotate-90 transition-all'>
                {!open ? <Menu size={16}  /> : <X size={16} />}
            </button>

            {elements.map((el, index) => {
                const angle = (index / elements.length) * 2 * Math.PI
                const x = 60 * Math.cos(angle)
                const y = 60 * Math.sin(angle)

                return (
                    <button
                        key={el.id}
                        onClick={el.onClick}
                        className={`absolute w-10 h-10 bg-gray-300 border-2 border-white text-gray-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110  transition-all ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'} `}
                        style={{
                            transform: `translate(${x}px, ${y}px)`,
                            // transform: open ? `translate(${x}px, ${y}px)` : `translate(0px, 0px)`,
                            transitionDelay: `${index * 0.05}s`,
                        }}
                    >
                        <el.icon size={16} />
                    </button>
                )
            })}
        </div>
  )
}

export default CircleMenu