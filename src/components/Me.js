import React from 'react';
import useFetch from '../hooks/useFetch';
import { Redirect } from 'react-router-dom';
const Me = (props) => {
	const isAuthenticated = localStorage.getItem('jwt');
	const { data, error, isPending } = useFetch('http://localhost:4000/api/me', JSON.parse(localStorage.getItem('jwt')));

	return isAuthenticated ? (
		<div>
			<h1>User Details</h1>
			{ error && <div>{ error }</div> }
			{isPending && <p>Loading...</p>}	
			{ data && (
				<div>
					<h1>Username: {data.user.username}</h1>
				<p>Email: {data.user.email}</p>
				<p>ID: {data.user._id}</p>
				</div>
			) 
			}
		</div>
	) : (
		<Redirect to={{ pathname: '/login' }} />
	)
}

export default Me;