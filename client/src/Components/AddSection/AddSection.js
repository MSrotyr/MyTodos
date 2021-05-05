import './AddSection.css';
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  addSectionAsync,
} from '../../Containers/AllLists/allListsSlice';
import { UserIdContext } from '../../App'; // eslint-disable-line

// TODO: Maybe move into Containers / Features since this is doing stuff now?

export function AddSection({ listId }) {
  const dispatch = useDispatch();

  const [section, setSection] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const userId = useContext(UserIdContext);

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.focus();
  }, []);

  function handleChange(e) {
    const { value } = e.target;
    setSection(value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(addSectionAsync({ userId, title: section, listId }));
    if (res) {
      setShowAlert(false);
      setSection('');
    } else {
      setShowAlert(true);
    }
  }
  // TODO: Set this to appear if error with adding task
  const alert = !showAlert ? '' : (
    <div className="alert alert-danger" role="alert">
      There was a problem creating the section, please try again.
    </div>
  );

  return (
    <div className="AddSection">
      <form onSubmit={handleSubmit}>
        <input
          id="sectionName"
          className="AddSection__input"
          ref={textInput}
          onChange={handleChange}
          value={section}
          type="text"
          placeholder="New Section"
        />
      </form>
      {alert}
    </div>
  );
}
