'use client'

import type { MouseEventHandler, ReactNode } from 'react'
import { Size, getSizeStyles } from './size'
import { getCommonStyles } from './tokens'
import {
  Variant,
  getVariantBackgroundStyles,
  getVariantOutlineStyles,
} from './variant'

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  href?: string
  size?: Size
  variant?: Variant
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  children,
  className = '',
  onClick,
  href,
  size = Size.MEDIUM,
  variant = Variant.PRIMARY,
  type = 'button',
}: ButtonProps) => {
  const classes = `${getSizeStyles(size)} ${getVariantBackgroundStyles(variant)} ${getVariantOutlineStyles(variant)} text-white hover:opacity-90 active:opacity-80 ${getCommonStyles()} ${className}`

  return href ? (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
