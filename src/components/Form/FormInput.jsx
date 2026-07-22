import React from 'react'
import styles from './Form.module.css'
import { CheckCircle2Icon, Info } from 'lucide-react'

function FormInput({ name, placeholder, isValid, error, onChange, type = 'text' }) {
  const stateClass = error ? styles.error : isValid ? styles.valid : ''
  return (
    <div className={`${styles.formBar} ${stateClass}`}>
        <label htmlFor={name}>{name}</label>
        <input type={type} id={name} name={name} placeholder={placeholder} onChange={onChange} />
        {isValid && <CheckCircle2Icon />}
        {error && <Info />}
    </div>
  )
}

export default FormInput