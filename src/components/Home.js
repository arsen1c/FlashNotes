import { Link } from 'react-router-dom';
import React from 'react';
export default function Home() {
	return (
		<div className="root Home">
			<h1>📝 Keep your todos organized </h1>
			<Link to="/todos">
				<i className="fas fa-chevron-circle-right fa-3x next"></i>
			</Link>
			<footer>
				<div className="footer-content">
					
				</div>
			</footer>
		</div>
	)	
}