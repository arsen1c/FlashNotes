import React from 'react';

export default function Header (props) {
	function getHour() {
		return new Date().getHours();
	}
	const currentHour = getHour();

	return (
		<div>
			{ currentHour < 12 && <h2 className="heading">Good Morning <span aria-label={"sun-rise"} role="img">🌤</span> </h2> }
			{  currentHour >= 12 && currentHour <= 16  && <h2 className="heading">Good Afternoon <span role="img">☀️</span></h2> }
			{ currentHour > 16 && currentHour <= 24 && <h2 className="heading"> Good Evening <span role="img">🏙</span></h2> }
		</div>
	)
}
