import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript.js";
import "./NewPaste.css";

export default function EditPaste() {
  const [title, setTitle] = useState("");
  const [pasteContent, setPasteContent] = useState("");
  const [timeout, setTimeoutValue] = useState(0);
  let [pasteID, setPasteID] = useState("");
   pasteID = useParams();
   const paramPasteID = pasteID.pasteId;
  console.log(paramPasteID)
  let history = useHistory();

  useEffect(() => {
    // Fetch existing paste data for editing
    const token = localStorage.getItem("token");
    axios
      .get(`https://pastebin-server-p6ni.onrender.com/paste/get/${paramPasteID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { title, paste, expireAt, idx } = response.data;
        setTitle(title);
        setPasteContent(paste);
        // setPasteID(idx);
        // Calculate timeout in minutes
        const currentTime = Date.now();
        const expirationTime = new Date(expireAt).getTime();
        const timeoutInMinutes = Math.floor((expirationTime - currentTime) / (60 * 1000));
        setTimeoutValue(timeoutInMinutes);
      })
      .catch((error) => {
        console.error("Error fetching paste data:", error);
        // Handle error (e.g., redirect to an error page)
        // Replace "/error" with the actual error page path
      });
  }, [paramPasteID, history]);

  function submitPaste() {
    const exp_date = timeout > 0 ? new Date(Date.now() + timeout * 60 * 1000) : null;
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://pastebin-server-p6ni.onrender.com/paste/edit/${paramPasteID}`,
        {
          title: title,
          paste: pasteContent,
          expireAt: exp_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        M.toast({ html: "Paste was successfully updated!" });
        const redir = "/paste/" + paramPasteID;
        history.push(redir);
      })
      .catch((err) => {
        console.error("Error updating paste:", err);
        // Handle error (e.g., show error message to the user)
      });
  }

  return (
    <div>
      <div className="new-paste-heading">Edit Paste</div>
      <div className="row">
        <div className="col s12 l9">
          <div className="card">
            <div className="card-content">
              <CodeMirror
                value={pasteContent}
                options={{
                  mode: "javascript",
                  theme: "material",
                  lineNumbers: true,
                  viewportMargin: Infinity,
                }}
                onBeforeChange={(editor, data, value) => setPasteContent(value)}
              />
            </div>
          </div>
        </div>
        <div className="col s12 l3">
          <div className="card">
            <div className="card-content">
              <span className="details-heading">Paste Title</span>
              <div className="input-field">
                <i className="material-icons prefix small">edit</i>
                <input
                  placeholder="Paste Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <span className="details-heading">Timeout In Minutes</span>
              <div className="input-field">
                <i className="material-icons prefix small">access_time</i>
                <input
                  placeholder="Timeout of pastes"
                  type="number"
                  min="0"
                  value={timeout}
                  onChange={(e) => setTimeoutValue(e.target.value)}
                />
              </div>

              <span className="details-heading">Paste Link</span>
              <div className="input-field">
                <i className="material-icons prefix small">link</i>
                <input
                    placeholder="Paste Link"
                    type="text"
                    value={`http://localhost:3000/paste/${paramPasteID}`}
                    readOnly
                />
                </div>
              <button onClick={submitPaste} className="btn green darken-4">
                Edit Paste
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
