import keywords from './keywords'

const externalLinkTest = /^(http|https):\/\/.+\..+/
const imageTest = /(\.jpg$)|(\.jpeg$)|(\.png$)|(\.gif$)|(\.svg$)/
const userTest = /^@.+/
const hashtagTest = /^#.+/
const postTest = /^\/posts\/.+/
const threadTest = /^\/threads\/.+/

export function isImage(str: string) {
  str = cleanFragment(str)
  return str.match(imageTest) && str.match(externalLinkTest)
}

export function isExternalLink(str: string) {
  str = cleanFragment(str)
  return str.match(externalLinkTest)
}

export function isUsername(str: string) {
  str = cleanFragment(str)
  return str.match(userTest);
}

export function isHashtag(str: string) {
  str = cleanFragment(str)
  return str.match(hashtagTest)
}

export function isPostRef(str: string) {
  str = cleanFragment(str)
  return str.match(postTest)
}

export function isThreadRef(str: string) {
  str = cleanFragment(str)
  return str.match(threadTest)
}

export function isKeyword(str: string) {
  return keywords.has(str.toLowerCase())
}

export function hasNewline(str: string) {
  return str.match('\n')
}

export function getUsernames(str: string) {
  return str
    .split(' ')
    .filter(isUsername)
    .map(f => cleanFragment(f, /^@/))
}

export function getHastags(str: string) {
  return str
    .split(' ')
    .filter(isHashtag)
    .map(f => cleanFragment(f, /^#/).toLowerCase())
}

export function getKeywords(str: string) {
  return str
    .split(' ')
    .filter(isKeyword)
    .map(f => cleanFragment(f).toLowerCase())
}


export function getTags(content: string) {
  return {
    tags: JSON.stringify(getHastags(content).concat(getKeywords(content))),
    usernames: JSON.stringify(getUsernames(content))
  }
}

export function cleanFragment(fragment: string, test?: RegExp) {
  return fragment
    .replace(test ? new RegExp(test, 'g') : '', '')
    .replace(/(\.|\?|!|:|;|,|'|")+$/, '')
}

