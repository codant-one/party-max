// 👉 IsEmpty
export const isEmpty = (value: string | any[] | null | undefined) => {
    if (value === null || value === undefined || value === '')
      return true
    
    return !!(Array.isArray(value) && value.length === 0)
  }
  
  // 👉 IsNullOrUndefined
  export const isNullOrUndefined = (value: boolean | null | undefined) => {
    return value === null || value === undefined
  }
  
  // 👉 IsEmptyArray
  export const isEmptyArray = (arr: string | boolean | any[]) => {
    return Array.isArray(arr) && arr.length === 0
  }
  
  // 👉 IsObject
  export const isObject = (obj: null) => obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)
  export const isToday = (date: Date) => {
    const today = new Date()
    
    return (
      /* eslint-disable operator-linebreak */
      date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
    /* eslint-enable */
    )
  }
  