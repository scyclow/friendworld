
import each from 'lodash/each'

export default function profanityFilter (input: string): string {
  const swap: any = {
    motherfucker: 'm0therf_cker',
    fuck: 'f_ck',

    shit: 'poo',
    ' dick ': 'penis',
    bitch: 'b!tch',

    cunt: 'c%nt',
    cocksuck: 'c*cks^ck',
    cock: 'c*ck',

    nigger: 'african-american',
    nigga: 'pal',

    ' fag ': 'homosexual',
    faggot: 'homosexual',

    tranny: 'transexual',
    ' god ': 'g-d',
    goddamn: 'goshdarn',

    pussy: 'p#ssy'
  }

  each(swap, (replaceTo, replaceFrom) => {
    input = input.replace(replaceFrom, replaceTo)
  })


  return input
}
