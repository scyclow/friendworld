import { UrqlProps } from 'urql'

interface Handlers {
  loading: (q?: any) => React.ReactNode,
  data: (q?: any) => React.ReactNode,
  error: (q?: any) => React.ReactNode,
}

export default function match({ loading: loadingHandler, data: dataHandler, error: errorHandler }: Handlers) {
  return (args: UrqlProps<unknown>) => {
    const { fetching, data, error, loaded } = args;

    if (error) {
      return typeof errorHandler === 'function'
        ? errorHandler(args)
        : errorHandler
    }

    if (fetching || !loaded) {
      return typeof loadingHandler === 'function'
        ? loadingHandler(args)
        : loadingHandler
    }

    if (data) {
      return typeof dataHandler === 'function'
        ? dataHandler(args)
        : dataHandler
    }
  }
}

export type DataProps<Q> = UrqlProps<Q> & { data: Q };
