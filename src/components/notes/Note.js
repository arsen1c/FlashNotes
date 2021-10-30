import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import EditNote from '../modals/EditNote';
import ShareModal from '../modals/ShareModal';

const Note = ({ user, notes, id }) => {
  const history = useHistory();
  const [showModal, setshowModal] = useState(false);
  const [showShareModal, setshowShareModal] = useState(false);
  const [sharelink, setSharelink] = useState(null);

  const handleBackButton = () => {
    history.push('/notes');
  };
  const handleModal = (value) => {
    setshowModal(value);
  };
  const handleShareModal = (value) => {
    setshowShareModal(value);
  };

  const note = notes.filter((item, index) => {
    return item.id === parseInt(id, 10);
  });

  useEffect(() => {
    setSharelink(note[0].sharelink)
  }, [note])

  return note.length ? (
    <div className="details">
      <div className="details-content">
        <div  className="edit">
          <i onClick={() => handleShareModal(true)}style={{marginRight: "1rem"}} className="fas fa-share fa-2x link"></i>
          <i onClick={() => handleModal(true)} className="far fa-edit fa-2x link"></i>
        </div>

        <i className="fas fa-arrow-left fa-2x" onClick={handleBackButton}></i>
        <h1 className="details-heading">{note[0].title}</h1>
        <div
          title={new Date(note[0].date).toString()}
          className="details-date tasks-date"
        >
          {new Date(note[0].date).toLocaleDateString()}
        </div>
        <div className="details-description">
          <ReactMarkdown children={note[0].description} />
        </div>
        <EditNote
          title={note[0].title}
          description={note[0].description}
          id={note[0].id}
          onClose={() => handleModal(false)}
          show={showModal}
        />
        <ShareModal
          id={note[0].id}
          sharelink={sharelink}
          onClose={() => handleShareModal(false)}
          show={showShareModal}
          user={user}
        />
      </div>
    </div>
  ) : (
    <div>
      <div>404 Not Found!</div>
    </div>
  );
};

export default Note;
