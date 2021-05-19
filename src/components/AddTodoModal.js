import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function AddTodoModal(props) {

	const [title, setTitle] = useState(null);
	const [description, setDescription] = useState(null);
	const history = useHistory();

	const handleSubmit = (e) => {
		setbuttonText("Adding...")
		try {
			e.preventDefault();
			e.target.querySelector('button').disabled = true;
			let todos = JSON.parse(localStorage.getItem("todos") || "[]");
			todos.push({ id: !todos.length > 0 ? 1 : todos[todos.length - 1].id + 1 , title, description, important,date: new Date().toLocaleDateString() })
			localStorage.setItem("todos", JSON.stringify(todos));
			history.go('/collection');
		} catch (e) {
			console.log(e);
		}
	}

	const handleImportant = (value) => {
		setImportant(!value);
	}

	if (!props.show) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<h2>📑 Add new todo</h2>
					<span onClick={props.onClose} className="close-modal-btn"> Close</span>
				</div>
				<div className="modal-body">
					<form onSubmit={handleSubmit}>
						<label><h3>Todo title</h3></label>
						<input name="title" type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Your cool title..." required />
						<label><h3>Todo description</h3></label>
						<textarea name="description" className="textarea" onChange={(e) => setDescription(e.target.value)} placeholder="Your cool description..." />
						<button className="submit">{buttonText}</button>
					</form>
				</div>
			</div>
		</div>
	)
}