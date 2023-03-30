import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AsyncLoaderState = {
  isLoading: false,
  data: null,
  error: null,
};

export default function useAsyncLoader(load, ...args) {
  const [state, setState] = useState(AsyncLoaderState);

  useEffect(() => {
    let isCurrent = true;

    async function execute() {
      try {
        setState((oldState) => ({
          isLoading: true,
          data: oldState.data,
          error: null,
        }));
        const data = await load(...args);

        if (isCurrent) {
          setState({ isLoading: false, data, error: null });
        }
      } catch (error) {
        toast.error(error.response.data.error.Message || error.message);

        if (isCurrent) {
          setState({ isLoading: false, data: null, error });
        }
      }
    }

    execute();

    return () => {
      isCurrent = false;
    };
  }, [...args, load]); // eslint-disable-line

  return state;
}
