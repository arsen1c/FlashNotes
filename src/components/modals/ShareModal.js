import React, { useState, useEffect } from 'react';
import { SpinnerSmall } from '../animations/Animations';
import { useParams } from 'react-router-dom';
import { server, client } from '../../config';

export default function ShareModal({user, show, onClose, sharelink}) {
  const [buttonText, setbuttonText] = useState('Submit');
  const [link, setlink] = useState(sharelink);

  const { id } = useParams();

  const handleGenerateLink = (id) => {
    fetch(`${server}/generatelink/${id}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then(async (data) => await data.json())
      .then(json => setlink(json.id))
      .catch(e => console.log(e));
  }

  useEffect(() => {
    setlink(sharelink)
  }, [sharelink]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content share-modal">
        <span onClick={onClose} className="close-modal-btn">
          {' '}
          x
        </span>
        <div className="modal-body ">
          <div className="shareLink">{`${client}/${user}/${link}`}</div>
          <br />
          <button className="newLink" onClick={() => handleGenerateLink(id)}>Generate new link</button>
        </div>
      </div>
    </div>
  );
}
