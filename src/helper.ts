export const cn = (...classNames: Array<string | boolean>) => classNames.filter(Boolean).join(' ')
