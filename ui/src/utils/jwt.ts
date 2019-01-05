const JWT = '__JWT__'

type JwtMap = {
  __currentUser__: string,
  [username: string]: string
}

const getMapping = (): JwtMap => {
  const stored = localStorage.getItem(JWT)
  return stored ? JSON.parse(stored) : { __currentUser__: '' }
}

const get = (): string| void => {
  const mapping = getMapping()
  return mapping[mapping.__currentUser__]
}

const getCurrentUserList = (): Array<string> => {
  return Object.keys(getMapping()).filter(name => name !== '__currentUser__')
}

const set = (username: string, jwt: string): void => {
  const mapping = getMapping()
  mapping[username] = jwt
  localStorage.setItem(JWT, JSON.stringify(mapping))
}

const setCurrentUser = (username: string) => {
  const mapping = getMapping()
  mapping.__currentUser__ = username
  localStorage.setItem(JWT, JSON.stringify(mapping))
}

const clearCurrentUser = () => {
  const mapping = getMapping()
  mapping.__currentUser__ = ''
  localStorage.setItem(JWT, JSON.stringify(mapping))
}

export default {
  get, getCurrentUserList, set, setCurrentUser, clearCurrentUser
}
