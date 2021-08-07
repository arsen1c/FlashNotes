import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Redirect } from 'react-router-dom';
import { Spinner } from '../Animations';

export const Me = () => {
  const { data, error, isPending } = useFetch('/me');

  return (
    <div>
      {error && <Redirect to={{ pathname: '/login' }} />}
      {isPending && <Spinner />}
      {data && (
        <div className="user-info">
          <header>
            <h1>{data.user.username}</h1>
            <p>{data.user.email}</p>
          </header>
          <p className="join-date">
            ⦿ Joined {new Date(data.user.date).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
