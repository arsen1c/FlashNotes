export default function Header (props) {
	function getHour() {
		return new Date().getHours();
	}
	const currentHour = getHour();

	return (
		<div>
			{ currentHour < 12 && <h2 className="heading">Good Morning 🌤</h2> }
			{  currentHour >= 12 && currentHour <= 16  && <h2 className="heading">Good Afternoon ☀️</h2> }
			{ currentHour > 16 && currentHour <= 24 && <h2 className="heading"> Good Evening 🏙</h2> }
		</div>
	)
}
