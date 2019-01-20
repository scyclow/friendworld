
import each from 'lodash/each'

export default function profanityFilter (input: string): string {
  const swap: any = {
    motherfucker: 'm0therf_cker',
    fuck: 'f_ck',


    shit: 'sh!t',

    cunt: 'c%nt',
    cocksuck: 'c*cks^ck',
    cock: 'c*ck',

    nigger: 'african-american',
    ' god ': 'g-d'
  }

  each(swap, (replaceTo, replaceFrom) => {
    input = input.replace(replaceFrom, replaceTo)
  })


  return input
}
