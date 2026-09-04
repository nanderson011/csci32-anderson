export enum Size {
  SMALL,
  MEDIUM,
  LARGE,
}

export function getSizeStyles(size: Size) {
  switch (size) {
    case Size.SMALL:
      return 'px-3 py-1 text-sm'
    case Size.LARGE:
      return 'px-6 py-3 text-lg'
    case Size.MEDIUM:
    default:
      return 'px-4 py-2 text-base'
  }
}
export function getInputSizeStyles(size: Size) {
  switch (size) {
    case Size.SMALL:
      return 'px-3 py-1 text-sm'
    case Size.LARGE:
      return 'px-6 py-3 text-lg'
    case Size.MEDIUM:
    default:
      return 'px-4 py-2 text-base'
  }
}
