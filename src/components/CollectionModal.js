import { useState } from 'react';

export default function CollectionModal(props) {

	const [title, setTitle] = useState(null);
	const [isPending, setisPending] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setisPending(true);

		fetch('http://localhost:8000/collection', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({title})
		}).then(() => {
			console.log('New Collection Added!');
			setisPending(false);
		})
	}


	if (!props.show) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<h2>Add new collection</h2>
					<span onClick={props.onClose} className="close-modal-btn"> Close</span>
				</div>
				<div className="modal-body">
					<form onSubmit={handleSubmit}>
						<label><h3>Collection Title</h3></label>
						<input name="title" type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Your Cool Title..." required />
						{ !isPending && <button className="submit">Submit</button> }
						{ isPending && <button className="submit" disabled>Adding...</button> }
					</form>
				</div>
			</div>
		</div>
	)
}