/* eslint-disable react/jsx-props-no-spreading */
import './Task.css';
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useDispatch } from 'react-redux';
import { setTaskTitle, updateTaskAsync } from '../../Containers/AllLists/allListsSlice';
import { UserIdContext } from '../../App'; // eslint-disable-line

const Container = styled.div`
border-radius: 2px;
margin-bottom: 5px;
background-color: ${(props) => (props.isDragging ? ' rgb(200, 200, 200)' : 'white')};
`;

export function Task({
  id,
  title,
  complete,
  sectionId,
  lists,
  currentListId,
  index,
}) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const userId = useContext(UserIdContext);

  const textInput = useRef(null);
  useEffect(() => {
    if (editing) {
      textInput.current.focus();
    }
  }, [editing]);

  function checkboxClickHandler() {
    dispatch(updateTaskAsync({
      userId,
      taskId: id,
      payload: {
        complete: !complete,
      },
    }));
  }

  function enableEditingClickHandler() {
    setEditing(true);
  }

  function handleTextInputKeyDown(e) {
    if (e.keyCode === 27) {
      setEditing(false);
    }
  }

  function handleChange(e) {
    const { value } = e.target;
    dispatch(setTaskTitle({
      title: value,
      sectionId,
      taskId: id,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(updateTaskAsync({
      taskId: id,
      payload: {
        title,
      },
    }));
    if (res) {
      setEditing(false);
    } else {
      console.warn('Problem editing task title'); // eslint-disable-line
    }
  }

  let renderedCompletion;
  if (complete) {
    renderedCompletion = (
      <div
        className="Task__checkbox-wrap"
        id={id}
        role="button"
        onClick={checkboxClickHandler}
        onKeyPress={checkboxClickHandler}
        tabIndex={0}
      >
        <CheckBoxIcon />
      </div>
    );
  } else {
    renderedCompletion = (
      <div
        className="Task__checkbox-wrap"
        id={id}
        role="button"
        onClick={checkboxClickHandler}
        onKeyPress={checkboxClickHandler}
        tabIndex={0}
      >
        <CheckBoxOutlineBlankIcon />
      </div>
    );
  }
  const otherListsTaskIsIn = lists.filter((list) => list._id !== currentListId);
  const listsViewing = otherListsTaskIsIn.map((list) => (
    <div className="Task__other-list-task-is-in">{list.title}</div>
  ));
  const listsEditing = otherListsTaskIsIn.map((list) => (
    <div className="Task__other-list-task-is-in full-names">{list.title}</div>
  ));
  let renderedTask;
  if (!editing) {
    renderedTask = (
      <div className="Task__view-wrap">
        {renderedCompletion}
        <div
          className="Task__main-wrap"
          id={id}
          role="button"
          onClick={enableEditingClickHandler}
          onKeyPress={enableEditingClickHandler}
          tabIndex={0}
        >
          <div className="Task__title">{title}</div>
        </div>
        {listsViewing}
      </div>
    );
  } else {
    renderedTask = (
      <div className="Task__editing-wrap">
        <div className="Task__editing-main">
          {renderedCompletion}
          <form onSubmit={handleSubmit} className="Task__form-edit-title">
            <input
              ref={textInput}
              onChange={handleChange}
              onKeyDown={handleTextInputKeyDown}
              value={title}
              type="text"
            />
          </form>
        </div>
        <div className="Task__editing-details">
          <div className="Task__editing-other-lists-wrap">
            {listsEditing}
          </div>
          <div className="Task__delete-buttons-wrap">
            <button className="Task__remove-from-list-button" type="button">Remove from list</button>
            <button className="Task__delete-button" type="button">Delete from all lists</button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="Task">
            {renderedTask}
          </div>
        </Container>
      )}
    </Draggable>
  );
}
