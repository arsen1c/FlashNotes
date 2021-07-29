import React from 'react';

export default function Header (props) {
	function getHour() {
		return new Date().getHours();
	}
	const currentHour = getHour();

	return (
		<div className="header">
			{ currentHour < 12 && <h2 className="heading"><span aria-label="sun-rise" role="img">🌤</span> Good morning, {props.username}</h2> }
			{  currentHour >= 12 && currentHour <= 16  && <h2 className="heading"><span aria-label="full-sun" role="img">☀️</span> Good afternoon, {props.username}</h2> }
			{ currentHour > 16 && currentHour <= 24 && <h2 className="heading"><span aria-label="evening" role="img">🏙</span> Good evening, {props.username}</h2> }
		</div>
	)
}
