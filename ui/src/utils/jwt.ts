const JWT = '__JWT__'

type JwtMap = {
  __currentUser__: string,
  [username: string]: string
}

type JwtUser = {
  username: string,
  jwt: string
}

const getMapping = (): JwtMap => {
  const stored = localStorage.getItem(JWT)
  return stored ? JSON.parse(stored) : { __currentUser__: '' }
}

const get = (): string| void => {
  const mapping = getMapping()
  return mapping[mapping.__currentUser__]
}

const getInnactiveUserList = (): Array<JwtUser> => {
  const mapping = getMapping()
  return Object.keys(mapping)
    .filter(username => (username !== '__currentUser__' && username !== mapping.__currentUser__))
    .map(username => ({
      username, jwt: mapping[username]
    }))
}

const getCurrentUser = (): JwtUser => {
  const mapping = getMapping()
  return {
    username: mapping.__currentUser__,
    jwt: mapping[mapping.__currentUser__]
  }
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

const TRACKING_TOKEN = '__TRACKING_TOKEN__'
const setTrackingToken = () => {
  try {
    const existingToken = getTrackingToken()
    if (!existingToken) {
      const token = `${Date.now()}-${Math.random()}`
      localStorage.setItem(TRACKING_TOKEN, token)
      return token
    } else {
      return existingToken
    }

  } catch(e) {
    console.log('could not set trakcing token: ', e)
  }
}

const getTrackingToken = (): string => localStorage.getItem(TRACKING_TOKEN) || ''

export default {
  get,
  getMapping,
  getCurrentUser,
  getInnactiveUserList,
  getTrackingToken,
  setTrackingToken,
  set,
  setCurrentUser,
  clearCurrentUser
}
