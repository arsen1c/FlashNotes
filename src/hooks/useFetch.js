import { useState, useEffect } from 'react';
import { server } from '../config';

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(server.concat(endpoint), {
      credentials: 'include',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, DELETE, PUT',
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setisPending(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setisPending(false);
      });
  }, [endpoint]);

  return { data, isPending, error };
};

export default useFetch;
