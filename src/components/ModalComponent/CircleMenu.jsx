import { BookMarked, ChartBarIcon, DoorOpen, Menu, MessageCircleMore, User, UserCheck, X } from 'lucide-react'
import React, { useRef, useState } from 'react'

function CircleMenu({top, left}) {
    const [open, setOpen] = useState(false)
    let menuRef = useRef(null)
    let dragOffset = useRef(null)
    let isDragging = useRef(false)

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
    const handleDrag = (e) => {
        if(!open) return
        
        isDragging.current = true
        const rect = menuRef.current.getBoundingClientRect()
        let offsetY = e.clientY - rect.top
        console.log('offsetY: ', offsetY);
        dragOffset.current = { y: offsetY }
        console.log('isDragging.current: ', isDragging.current);
    }
    
    const handleMove = (e) => {
        console.log('isDragging.current: ', isDragging.current);
        if(!isDragging.current || !menuRef.current) return
        
        let newY = e.clientY - dragOffset.current.y
        console.log('newY: ', newY);
        
        const menuHeight = menuRef.current.offsetHeight
        const windowHeight = window.innerHeight
        
        newY = Math.max(0, Math.min(newY, windowHeight - menuHeight))
        console.log('newY: ', newY);
        
        menuRef.current.style.transform = `rotate(${newY}deg)`
    }
    
    const handleUndrag = (e) => {
        isDragging.current = false
        dragOffset.current = null
        console.log('isDragging.current: ', isDragging.current);
    }
    
const rotation = useRef(0);
const lastAngle = useRef(0);
const center = useRef({ x: 0, y: 0 });
const [rotations, setRotations] = useState(0);

const handlePointerDown = (e) => {
  if (!open || !menuRef.current) return;

  // Keep normal button clicks working
  if (e.target.closest("button")) return;

  const rect = menuRef.current.getBoundingClientRect();

  center.current = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };

  lastAngle.current = Math.atan2(
    e.clientY - center.current.y,
    e.clientX - center.current.x
  ) * (180 / Math.PI);

  isDragging.current = true;

  // Continue receiving pointer events outside the element
  e.currentTarget.setPointerCapture(e.pointerId);
};

const handlePointerMove = (e) => {
  if (!isDragging.current || !menuRef.current) return;

  const angle = Math.atan2(
    e.clientY - center.current.y,
    e.clientX - center.current.x
  ) * (180 / Math.PI);

  let delta = angle - lastAngle.current;

  // Prevent sudden jumps when crossing -180° / 180°
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;

  rotation.current += delta;
  setRotations(rotation.current);
  lastAngle.current = angle;

  menuRef.current.style.transform =
    `rotate(${rotation.current}deg)`;
};

const handlePointerUp = (e) => {
  isDragging.current = false;

  if (e.currentTarget.hasPointerCapture(e.pointerId)) {
    e.currentTarget.releasePointerCapture(e.pointerId);
  }
};

const handlePointerCancel = () => {
  isDragging.current = false;
};


  return (
        <div ref={menuRef}
        //  onMouseDown={handleDrag} onMouseMove={handleMove} onMouseUp={handleUndrag}
         onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerCancel}
         className={`fixed ${top ? 'top-4' : 'bottom-4'} ${left ? 'left-4' : 'right-4'} w-[150px] h-[150px] flex items-center justify-center gap-2 cursor-grab `}>
            <button style={{transform: `rotate(${-rotations}deg)`}} onClick={handleOpen}  className='bg-gray-300 outline-none shadow-lg border-2 border-white text-gray-600 p-2 rounded-full flex items-center justify-center cursor-pointer active:rotate-90 transition-all'>
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
                            transform: `translate(${x}px, ${y}px) rotate(${-rotations}deg)`,
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