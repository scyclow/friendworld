import { UrqlProps } from 'urql'

export type DataProps<Q, M> = UrqlProps<Q, M> & { data: Q };

interface Handlers<Q, M> {
  loading?: (q: UrqlProps<Q, M>) => React.ReactNode,
  data: (q: DataProps<Q, M>) => React.ReactNode,
  error: (q: UrqlProps<Q, M>) => React.ReactNode,
}


export default function match<Q, M = {}>({ loading: loadingHandler, data: dataHandler, error: errorHandler }: Handlers<Q, M>) {

  return (args: UrqlProps<Q, M>) => {
    if (!args) return

    const { fetching, data, error, loaded } = args;

    if (error) {
      return typeof errorHandler === 'function'
        ? errorHandler(args)
        : errorHandler
    }

    if (loadingHandler && (fetching || !loaded)) {
      return typeof loadingHandler === 'function'
        ? loadingHandler(args)
        : loadingHandler
    }

    if (data || !loadingHandler) {
      return typeof dataHandler === 'function'
        ? dataHandler(args as DataProps<Q, M>)
        : dataHandler
    }
  }
}

