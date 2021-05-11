import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';

export default function TodoDetails() {
	const todos = JSON.parse(window.localStorage.getItem("todos"));
	const { id } = useParams();
	const history = useHistory();

	let todo = todos.filter((item, index) => {
		return item.id === parseInt(id);
	})

	const handleBackButton = () => {
		history.push("/todos");
	}

	return(
		<div className="details">

			{ todo.length > 0 && 
				<div className="details-content">
					<i className="fas fa-arrow-left fa-2x" onClick={handleBackButton}></i>			
					<h1 className="details-heading">{todo[0].title}</h1>
					<div className="details-date tasks-date">{todo[0].date}</div>	
					<div className="details-description">
						<ReactMarkdown  children={todo[0].description} />
					</div>
				</div> 
			}
		</div>
	)
}