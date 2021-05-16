import { useState } from 'react';

export default function EditModal(props) {
	const [todoList, settodoList] = useState(JSON.parse(localStorage.getItem("todos")));
	const [title, setTitle] = useState(props.title ? props.title : "");
	const [description, setDescription] = useState(props.description ? props.description : "");

	const handleSubmit = (e, title, description) => {
		let todos = todoList;
		e.preventDefault();
		todos.forEach(todo => {
			if (todo.id === props.id) {
				todo["title"]=title;
				todo["description"]=description;
			}
		})
		settodoList(todos);
		localStorage.setItem("todos", JSON.stringify(todoList));
		props.onClose();
	}

	if (!props.show) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<h2>📑 Edit Todo</h2>
					<span onClick={props.onClose} className="close-modal-btn"> Close</span>
				</div>
				<div className="modal-body">
					<form onSubmit={(e) => handleSubmit(e, title, description)}>
						<label><h3>Todo title</h3></label>
						<input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your cool title..." required />
						<label><h3>Todo description</h3></label>
						<textarea name="description" value={description} className="textarea" onChange={(e) => setDescription(e.target.value)} placeholder="Your cool description..." />
						<button className="submit">Submit</button>
					</form>
				</div>
			</div>
		</div>
	)
}