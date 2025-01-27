type Storage = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

let localStorage: Storage | undefined

export const setStorage = (storage: Storage) => {
  localStorage = storage
}

export const hasStorage = () => {
  return localStorage != undefined
}

export const getJSONItem = (key: string): object | null => {
  if (!localStorage) { 
    return null
  }
  const plainData = localStorage.getItem(key)
  if (!plainData) {
    return null
  }
  return JSON.parse(plainData)
}

export const setJSONItem = (key: string, json: object): void => {
  if (!localStorage) { 
    return
  }
  const value = JSON.stringify(json)
  localStorage.setItem(key, value)
}

