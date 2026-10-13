import React, { useEffect, useState } from 'react'
import CustomSelect from './UserSelect'
import CircleMenu from './CircleMenu'

function ModalComponent() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // simulate API
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Leanne Graham', email: 'sincere@april.biz', role: 'admin' },
        { id: 2, name: 'Ervin Howell', email: 'shanna@melissa.tv', role: 'user' },
        { id: 3, name: 'Billie Graham', email: 'billie@april.biz', role: 'admin' },
        { id: 4, name: 'Grok Howell', email: 'grok@melissa.tv', role: 'user' },
        { id: 5, name: 'Jr Graham', email: 'jr@april.biz', role: 'admin' },
        { id: 6, name: 'Jr Howell', email: 'jrh@melissa.tv', role: 'viewer' },
      ])
      setLoading(false)
    }, 3000)
  }, [])

  const options = users.map(u => ({ label: u.name, email: u.email, value: u.id, role: u.role }))

  return (
    <div className='w-full h-screen bg-gray-100 flex items-center justify-center'>
      <CustomSelect
        options={options}
        loading={loading}
        onSubmit={(val) => console.log('selected:', val)}
      />

      {/* <CircleMenu top={false} left={true} /> */}

    </div>
  )
}

export default ModalComponent