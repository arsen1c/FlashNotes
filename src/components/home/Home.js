import { Link } from 'react-router-dom';
import React from 'react';
export default function Home() {
	return (
		<div className="root Home">
			<h1><span role="img" aria-label="note">📝</span> Keep your notes organized </h1>
			<Link to="/notes">
				<i className="fas fa-chevron-circle-right fa-3x next"></i>
			</Link>
			<footer>
				<div className="footer-content">
					
				</div>
			</footer>
		</div>
	)	
}