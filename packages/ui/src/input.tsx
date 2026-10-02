'use client'

import { forwardRef } from 'react'
import type { ChangeEventHandler, InputHTMLAttributes } from 'react'

import { Size, getInputSizeStyles } from './size'
import { getCommonStyles } from './tokens'
import { Variant, getVariantBorderStyles, getVariantInputTextStyles, getVariantOutlineStyles } from './variant'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size
  variant?: Variant
  setValue?: (newValue: string) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size = Size.MEDIUM, variant = Variant.PRIMARY, setValue, onChange, ...props },
  ref,
) {
  const classes = `${getInputSizeStyles(size)} ${getVariantInputTextStyles(variant)} ${getVariantBorderStyles(variant)} ${getVariantOutlineStyles(variant)} ${getCommonStyles()} border ${className ?? ''}`

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue?.(event.target.value)
    onChange?.(event)
  }

  return <input ref={ref} className={classes} onChange={handleChange} {...props} />
})
