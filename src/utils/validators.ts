import { isEmpty, isEmptyArray, isNullOrUndefined } from './index'

// 👉 Required Validator
export const requiredValidator = (value: boolean) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return 'requerido *'
  
  return !!String(value).trim().length || 'requerido *'
}

// 👉 Email Validator
export const emailValidator = (value: any[]) => {
  if (isEmpty(value))
    return true
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (Array.isArray(value))
    return value.every(val => re.test(String(val))) || 'El campo debe ser un correo electrónico válido'
  
  return re.test(String(value)) || 'El campo debe ser un correo electrónico válido'
}

// 👉 Password Validator
export const passwordValidator = (password: string) => {
  // const regExp = /(?=.*\d){0,1}(?=.*[a-z|A-Z]){8,}/
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.,#^(_\-+=)`~{}/;'"|:<>\\\[\\\]])[A-Za-z\d$@$!%*?&.,#^(_\-+=)`~{}/;'"|:<>\\\[\\\]]{8,}$/
  const validPassword = regExp.test(password) && (password.length >= 8)
  
  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
      'El campo debe contener mayúsculas, minúsculas y dígitos; con un mínimo de 8 caracteres')
}

// 👉 Confirm Password Validator
export const confirmedValidator = (value: any, target: any) => value === target || 'Las contraseñas no coinciden.'

// 👉 Between Validator
export const betweenValidator = (value: any, min: any, max: any) => {
  const valueAsNumber = Number(value)
  
  return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || `Ingrese el número entre ${min} y ${max}`
}

// 👉 Integer Validator
export const integerValidator = (value: any[]) => {
  if (isEmpty(value))
    return true
  if (Array.isArray(value))
    return value.every(val => /^-?[0-9]+$/.test(String(val))) || 'Este campo debe ser un número entero'
  
  return /^-?[0-9]+$/.test(String(value)) || 'Este campo debe ser un número entero'
}

// 👉 Alpha Validator
export const alphaValidator = (value: any) => {
  if (isEmpty(value))
    return true
  
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(String(value)) || 'El campo solo puede contener caracteres alfabéticos'
}

// 👉 URL Validator
export const urlValidator = (value: any) => {
  if (isEmpty(value))
    return true
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  
  return re.test(String(value)) || 'URL no es válida'
}

// 👉 Length Validator
export const lengthValidator = (value: any, length: number) => {
  if (isEmpty(value))
    return true
  
  return String(value).length === length || `El campo Min Character debe tener al menos ${length} caracteres`
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value: any) => {
  if (isEmpty(value))
    return true
  const valueAsString = String(value)
  
  return /^[0-9A-Z_-]*$/i.test(valueAsString) || 'Todos los caracteres no son válidos'
}

// 👉 phone Validator
export const phoneValidator = (value: any[]) => {
  if (isEmpty(value))
    return true
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
  if (Array.isArray(value))
    return value.every(val => re.test(String(val))) || 'El campo debe ser un número de teléfono valido'
  
  return re.test(String(value)) || 'El campo debe ser un número de teléfono valido'
}

// 👉 file Validator
export const fileSizeValidator = (value: string | any[]) => {
  if (isEmpty(value))
    return true
  for (let i = 0; i < value.length; i++) {
    if (value[i].size > 1048576) {
      return 'El tamaño del archivo "' + value[i].name + '" no puede ser mayor a 1MB' // Mensaje de error
    }
  }
  
  return true
}

// 👉 connection Validator
export const connectionValidator = (value: any[]) => {
  if (isEmpty(value))
    return true
  const re = /^[\w-]+:[\w-]+@[\w.-]+:\d+\/[\w-]+$/
  if (Array.isArray(value))
    return value.every(val => re.test(String(val))) || 'El campo debe ajustarse a este patron USER_DATABASE:PASSWORD_DATABASE@HOST_DATABASE:PORT/NAME_DATABASE'
  
  return re.test(String(value)) || 'El campo debe ajustarse a este patron USER_DATABASE:PASSWORD_DATABASE@HOST_DATABASE:PORT/NAME_DATABASE'
  
}
