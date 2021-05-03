/* eslint-disable react/jsx-props-no-spreading */
import './AllLists.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ListItem } from '../../Components/ListItem/ListItem';
import { AddList } from '../../Components/AddList/AddList';
import {
  fetchAllListsAsync,
  addListAsync,
  updateListsOrderAsync,
  selectLists,
  selectStatus,
} from './allListsSlice';

const ListItemsWrap = styled.div`
padding: 0.5rem;
margin: 0.5rem;
background-color: ${(props) => (props.isDraggingOver ? 'rgb(250, 250, 250)' : 'white')};
  `;

export function AllLists() {
  const lists = useSelector(selectLists);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllListsAsync());
  }, [dispatch]);

  let loadingIndicator;
  // TODO: The component isn't re-rendering when reorder the list, so this
  // indicator isn't changing when it should.
  if (status === 'syncing with database') {
    loadingIndicator = (
      <div>Syncing...</div>
    );
  }
  if (status === 'loading') {
    loadingIndicator = (
      <div>Loading...</div>
    );
  }
  if (status === 'idle') {
    loadingIndicator = (
      <div>✓ Synced with server</div>
    );
  }
  function onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    dispatch(updateListsOrderAsync({ source, destination }));
  }

  const renderedLists = lists.map((list, index) => (
    <ListItem
      key={list._id}
      title={list.title}
      id={list._id}
      index={index}
    />
  ));
  return (
    <div className="AllLists">
      <h1 style={{ marginLeft: '1.1rem' }}>Lists</h1>
      <div
        style={{ marginLeft: '1.2rem', marginBottom: '1rem' }}
        className="AllLists__loadingIndicator"
      >
        {loadingIndicator}
      </div>
      <AddList addListHandler={addListAsync} />
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId="lists">
          {(provided, snapshot) => (
            <ListItemsWrap
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
            >
              {renderedLists}
              {provided.placeholder}
            </ListItemsWrap>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
