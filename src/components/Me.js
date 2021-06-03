import React from 'react';
import useFetch from '../hooks/useFetch';
import { Redirect } from 'react-router-dom';
import { Spinner } from './Animations';

const Me = (props) => {
	const isAuthenticated = localStorage.getItem('jwt');
	const { data, error, isPending } = useFetch('https://react-notes-api.vector2912.repl.co/api/me', props.token);
	
	return isAuthenticated ? (
		<div>
			{ error && <div>{ error }</div> }
			{isPending && <Spinner />}	
			{ data && (
					<div className="user-info">
						<header>
							<h1>{data.user.username}</h1>
							<p>{data.user.email}</p>
						</header>
						<p className="join-date">⦿ Joined {new Date(data.user.date).toLocaleString()}</p>	
					</div>
				) 
			}
		</div>
	) : (
		<Redirect to={{ pathname: '/login' }} />
	)
}

export default Me;