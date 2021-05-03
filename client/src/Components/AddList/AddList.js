import './AddList.css';
import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  addListAsync,
} from '../../Containers/AllLists/allListsSlice';
import { UserIdContext } from '../../App'; // eslint-disable-line

// TODO: Move into Containers / Features since this is doing stuff now

export function AddList() {
  const dispatch = useDispatch();

  const [list, setList] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const userId = useContext(UserIdContext);

  function handleChange(e) {
    const { value } = e.target;
    setList(value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(addListAsync({ userId, title: list }));
    console.log(res);
    if (res) {
      setShowAlert(false);
      setList('');
    } else {
      setShowAlert(true);
    }
  }
  // TODO: Set this to appear if error with adding list
  const alert = !showAlert ? '' : (
    <div className="alert alert-danger" role="alert">
      There was a problem creating the list, please try again.
    </div>
  );

  return (
    <div style={{ marginLeft: '1.2rem' }} className="AddList">
      <form onSubmit={handleSubmit}>
        <span style={{ marginLeft: '2px' }}>+ </span>
        <input
          style={{ marginLeft: '4px' }}
          onChange={handleChange}
          value={list}
          type="text"
          placeholder="Add List"
          onFocus={(e) => (e.target.placeholder = 'New List')} // eslint-disable-line
          onBlur={(e) => (e.target.placeholder = 'Add List')} // eslint-disable-line
        />
      </form>
      {alert}
    </div>
  );
}
