export enum Variant {
  PRIMARY,
  SECONDARY,
  TERTIARY,
}

export function getVariantBackgroundStyles(variant: Variant) {
  switch (variant) {
    case Variant.SECONDARY:
      return 'bg-purple-1000'
    case Variant.TERTIARY:
      return 'bg-red-1000'
    case Variant.PRIMARY:
    default:
      return 'bg-blue-1000'
  }
}

export function getVariantOutlineStyles(variant: Variant) {
  switch (variant) {
    case Variant.SECONDARY:
      return 'focus:outline-purple-1000'
    case Variant.TERTIARY:
      return 'focus:outline-red-1000'
    case Variant.PRIMARY:
    default:
      return 'focus:outline-blue-1000'
  }
}

export function getVariantBorderStyles(variant: Variant) {
  switch (variant) {
    case Variant.SECONDARY:
      return 'border-purple-1000'
    case Variant.TERTIARY:
      return 'border-red-1000'
    case Variant.PRIMARY:
    default:
      return 'border-blue-1000'
  }
}

export function getVariantInputTextStyles(variant: Variant) {
  switch (variant) {
    case Variant.SECONDARY:
      return 'text-purple-1000'
    case Variant.TERTIARY:
      return 'text-red-1000'
    case Variant.PRIMARY:
    default:
      return 'text-blue-1000'
  }
}
