import { isToday } from './index'

export const avatarText = (value: string) => {
  if (!value)
    return ''
  const nameArray = value.split(' ')
  
  return nameArray.map((word: string) => word.charAt(0).toUpperCase()).join('')
}

// TODO: Try to implement this: https://twitter.com/fireship_dev/status/1565424801216311297
export const kFormatter = (num: number) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g
  
  return Math.abs(num) > 9999 ? `${Math.sign(num) * +((Math.abs(num) / 1000).toFixed(1))}k` : Math.abs(num).toFixed(0).replace(regex, ',')
}

export const prefixWithPlus = (value: number) => value > 0 ? `+${value}` : value

export const formatNumber = (value: number) => {
  if (!value) return value;

  const numberString = value.toString();
  const [integer, decimal] = numberString.split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedInteger}${decimal ? `.${decimal}` : ''}`;
}
