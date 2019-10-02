import React from 'react'
import './Select.scss';
import ReactSelect from 'react-select';
import { Props as ReactSelectProps } from 'react-select/src/Select';
import { Styles } from 'react-select/src/styles';

interface Props extends ReactSelectProps {
  label?: string;
  formGroupClassName?: string;
  labelClassName?: string;
}

const CUSTOM_STYLE: Styles = {
  /*option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: (provided, state) => ({
    ...provided,
    width: 200,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }*/
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--gray-200)',
    padding: '5px;',
    borderRadius: '8px',
    fontSize: '16px',
    color: 'var(--gray-900)',
    border: '1px solid transparent',
    boxShadow: state.isFocused ? '0 0 0 1px var(--purple-800)' : '',
    '&:hover': {
      borderColor: state.isFocused ? '' : 'var(--purple-200)', 
      boxShadow: state.isFocused ? '0 0 0 1px var(--purple-800)' : ''
    }
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: 'var(--purple-900)',
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#fff',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#fff',
  })
} 

const Select = (props: Props) => {
  return (
    <div className={`form-group ${props.formGroupClassName ? props.formGroupClassName : ''}`}>
      {
        props.label ? (<label className={`form-group__label ${props.labelClassName ? props.labelClassName : ''}`}>{props.label}</label>) : ''
      }
      <ReactSelect
        styles={CUSTOM_STYLE}
       {...props}/>
    </div>
  )
}

export default Select
