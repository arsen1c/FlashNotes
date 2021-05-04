import { useState } from 'react';
import Header from './Header';
import CollectionModal from './CollectionModal';

export default function Collection (props) {
	const [showModal, setshowModal] = useState(false);

	const handleModal = (value) => {
		setshowModal(value);
	}

	return (
		<div className="collection">
			<Header heading="Collection" />
			<div className="addCollection" onClick={() => handleModal(true)}>
				+
			</div>
			<section className="collection-cards-grid">
				{
					props.data.map((item, index) => (
						<div className="collection-card" key={index}>
							<h3 className="card-title">
								{ item.title }
							</h3>
							<div className="collectionActions">
								<div className="tasks-done">0/0 done</div>
								<span className="delete-btn">
									<i className="fas fa-trash"></i>
								</span>
							</div>
						</div>
					))
				}
			</section>
			<CollectionModal onClose={() => handleModal(false)} show={showModal}/>
		</div>
	)
}