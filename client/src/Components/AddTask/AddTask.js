import './AddTask.css';
import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutocompleteItem } from '../AutocompleteItem/AutocompleteItem';
import {
  addNewTaskAsync,
  addExistingTaskAsync,
  selectTasksInOtherLists,
} from '../../Containers/AllLists/allListsSlice';
import { UserIdContext } from '../../App'; // eslint-disable-line
// Mock to be replaced with state in redux store
// TODO: Maybe move into Containers / Features since this is doing stuff now?

export function AddTask({ listId, sectionId }) {
  const tasksInOtherLists = useSelector(selectTasksInOtherLists);
  const dispatch = useDispatch();

  const [taskTitle, setTask] = useState('');
  // TODO: Move this out into the Redux store
  const [matchingTasks, setMatchingTasks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const userId = useContext(UserIdContext);

  function handleChange(e) {
    const { value } = e.target;
    setTask(value);
    if (value === '') {
      setMatchingTasks([]);
    } else {
      setMatchingTasks(() => tasksInOtherLists.filter((task) => (
        task.title.toLowerCase().includes(value.toLowerCase())
      )));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(addNewTaskAsync({ userId, title: taskTitle, listId, sectionId })); // eslint-disable-line
    console.log(res);
    if (res) {
      setShowAlert(false);
      setTask('');
    } else {
      setShowAlert(true);
    }
  }

  async function handleAddExistingTask(e, taskDetails) {
    try {
      await dispatch(addExistingTaskAsync({ userId, taskDetails }));
      setTask('');
      setMatchingTasks([]);
    } catch (error) {
      console.log(error);
    }
  }
  // TODO: Set this to appear if error with adding task
  const alert = !showAlert ? '' : (
    <div className="alert alert-danger" role="alert">
      There was a problem creating the task, please try again.
    </div>
  );

  let autocompleteResults;
  if (matchingTasks.length > 0) {
    autocompleteResults = (
      <div className="AddTask__autocomplete-results">
        {matchingTasks.map((task) => (
          <AutocompleteItem
            className="AddTask__autocomplete-item"
            key={task._id}
            task={task}
            listId={listId}
            sectionId={sectionId}
            handleAddExistingTask={handleAddExistingTask}
          />
        ))}
      </div>
    );
  } else {
    autocompleteResults = '';
  }

  return (
    <div className="AddTask">
      <form className="AddTask__form" onSubmit={handleSubmit}>
        <div className="AddTask__plus-icon">+ </div>
        <input
          className="AddTask__input"
          onChange={handleChange}
          value={taskTitle}
          type="text"
          placeholder="Add To-Do"
          onFocus={(e) => (e.target.placeholder = 'New To-Do')} // eslint-disable-line
          onBlur={(e) => (e.target.placeholder = 'Add To-Do')} // eslint-disable-line
        />
      </form>
      {autocompleteResults}
      {alert}
    </div>
  );
}
