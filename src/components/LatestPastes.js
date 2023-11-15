import React, { useEffect, useState } from "react";
import { Delete, Edit } from "@material-ui/icons";
import moment from "moment";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import "./NewPaste.css"; // Import your existing styles

export default function NewPaste() {
  const [pastes, setPastes] = useState([]);
  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://pastebin-server-p6ni.onrender.com/paste/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPastes(res.data);
      });
  }, [token]);

  const handleDelete = (idx) => {
    axios
      .delete(`https://pastebin-server-p6ni.onrender.com/paste/delete/${idx}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const newPastes = pastes.filter((paste) => paste._id !== idx);
        setPastes(newPastes);
        
        history.push('/latest')
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  const handleEdit = (idx) => {
    history.push(`/paste/edit/${idx}`);
  };

  return (
    <div>
      <h3>Latest Pastes</h3>
      {pastes.length ? (
        <ul className="collection">
          {pastes.map((paste, idx) => {
            const pasteLink = "http://localhost:3000/paste/" + paste.idx;

            return (
              <li className="collection-item" key={idx}>
                <div className="paste-info">
                  <div className="paste-title">{paste.title}</div>
                  <div className="paste-date">
                    Created on {moment(paste.createdAt).format("lll")}
                  </div>
                  <a href={pasteLink} className="goto-paste">
                    Go to Paste
                  </a>
                </div>
                <div className="paste-actions">
                  <Edit
                    onClick={() => handleEdit(paste.idx)}
                    className="edit-icon material-icons"
                    title="Edit"
                  />
                  <Delete
                    onClick={() => handleDelete(paste.idx)}
                    className="delete-icon material-icons"
                    title="Delete"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h5>No Pastes Exist</h5>
      )}
    </div>
  );
}
