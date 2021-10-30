import React, { useState, useEffect } from 'react';
import { SpinnerSmall } from '../animations/Animations';
import { useParams } from 'react-router-dom';
import { server, client } from '../../config';

export default function ShareModal({password, user, show, onClose, sharelink}) {
  const [buttonText, setbuttonText] = useState('Set');
  const [link, setlink] = useState(sharelink);
  const [newpassword, setnewpassword] = useState(password);

  const { id } = useParams();

  const handlePassword = (e) => {
    setnewpassword(e.target.value);
  }

  const handlePasswordsubmit = (e) => {
    e.preventDefault();

    setbuttonText(<SpinnerSmall />);

    fetch(`${server}/newpass/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({newpassword})
    }).then(async (res) => {
      if (!res.ok) {
        console.log(await res.json());
        throw new Error("Error");
      }
      setbuttonText("Submit");
      return await res.json();
    }).then(data => {
      console.log("Success");
    }).catch(e => {
      console.log(e);
      return setbuttonText("Submit");
    })
  }

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
          <div className="newPassword">
            <form>
              <input onChange={handlePassword} placeholder="New password" value={newpassword} />
              <button onClick={handlePasswordsubmit}>{buttonText}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
