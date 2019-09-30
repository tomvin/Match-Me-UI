import React from 'react'
import './Input.scss'

interface InputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  formGroupClassName?: string;
  labelClassName?: string;
  tabIndex?: number;
  type?: string;
  value?: string | number;
  required?: boolean;
  name?: string;
  onChange?: any;
}

const Input = (props: InputProps) => {
  return (
    <div className={`form-group ${props.formGroupClassName ? props.formGroupClassName : ''}`}>
      {
        props.label ? (<label className={`form-group__label ${props.labelClassName ? props.labelClassName : ''}`}>{props.label}</label>) : ''
      }
      <input 
        onChange={props.onChange}
        name={props.name}
        required={props.required}
        id={props.id}
        type={props.type} 
        value={props.value}
        placeholder={props.placeholder}
        tabIndex={props.tabIndex}
        className={`form-group__input ${props.inputClassName ? props.inputClassName : ''}`}/>
    </div>
  )
}

export default Input;