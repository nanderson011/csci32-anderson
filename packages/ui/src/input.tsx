'use client'

import type { HTMLInputTypeAttribute } from 'react'
import { Size, getInputSizeStyles } from './size'
import { getCommonStyles } from './tokens'
import {
  Variant,
  getVariantBorderStyles,
  getVariantInputTextStyles,
  getVariantOutlineStyles,
} from './variant'

interface InputProps {
  placeholder?: string
  className?: string
  size?: Size
  variant?: Variant
  type?: HTMLInputTypeAttribute
  defaultValue?: any
  value?: any
  setValue?: (newValue: string) => void
  name: string
  id: string
}

export function Input({
  placeholder,
  className,
  size = Size.MEDIUM,
  variant = Variant.PRIMARY,
  type = 'text',
  defaultValue,
  value,
  setValue,
  name,
  id,
}: InputProps) {
  const classes = `${getInputSizeStyles(size)} ${getVariantInputTextStyles(variant)} ${getVariantBorderStyles(variant)} ${getVariantOutlineStyles(variant)} ${getCommonStyles()} border ${className ?? ''}`

  return (
    <input
      placeholder={placeholder}
      className={classes}
      type={type}
      defaultValue={defaultValue}
      value={value}
      onChange={(event) => setValue?.(event.target.value)}
      name={name}
      id={id}
    />
  )
}
