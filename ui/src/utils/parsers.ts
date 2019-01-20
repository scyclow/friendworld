const externalLinkTest = /^(http|https):\/\/.+\..+/
const imageTest = /(\.jpg$)|(\.jpeg$)|(\.png$)|(\.gif$)|(\.svg$)/
const userTest = /^@.+/
const hashtagTest = /^#.+/

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

export function getUsernames(str: string) {
  return str
    .split(' ')
    .filter(isUsername)
    .map(f => cleanFragment(f, /^@/))
}

export function getHashtags(str: string) {
  return str
    .split(' ')
    .filter(isHashtag)
    .map(f => cleanFragment(f, /^#/))
}

export function cleanFragment(fragment: string, test?: RegExp) {
  return fragment
    .replace(test ? new RegExp(test, 'g') : '', '')
    .replace(/(\.$)|(\?$)|(!$)|(:$)/, '')
}
