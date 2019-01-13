import { UrqlProps } from 'urql'

export type DataProps<Q, M> = UrqlProps<Q, M> & { data: Q };


interface Handlers<Q, M> {
  loading?: (props: UrqlProps<Q, M>) => React.ReactNode,
  data: (props: DataProps<Q, M>) => React.ReactNode,
  error: (props: UrqlProps<Q, M>) => React.ReactNode,
}



export default function match<Q, M = {}>({
  loading: loadingHandler,
  data: dataHandler,
  error: errorHandler
}: Handlers<Q, M>): (props: UrqlProps<Q, M>) => React.ReactNode {

  return (props: UrqlProps<Q, M>) => {
    if (!props) return

    const { fetching, data, error, loaded } = props;

    if (error) {
      return typeof errorHandler === 'function'
        ? errorHandler(props)
        : errorHandler
    }

    if (loadingHandler && (fetching || !loaded)) {
      return typeof loadingHandler === 'function'
        ? loadingHandler(props)
        : loadingHandler
    }

    if (data || !loadingHandler) {
      return typeof dataHandler === 'function'
        ? dataHandler(props as DataProps<Q, M>)
        : dataHandler
    }
  }
}
