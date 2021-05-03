/* eslint-disable react/jsx-props-no-spreading */
import './SelectedList.css';
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import {
  selectCurrentList,
  updateTasksOrderAsync,
  updateSectionsOrderAsync,
} from '../AllLists/allListsSlice';
import { selectShowAddSectionForm } from './selectedListSlice';
import { Section } from '../../Components/Section/Section'; // eslint-disable-line
import { ListMenu } from '../../Components/ListMenu/ListMenu'; // eslint-disable-line
import { AddSection } from '../../Components/AddSection/AddSection'; // eslint-disable-line
import { UserIdContext } from '../../App'; // eslint-disable-line

const SectionsWrap = styled.div`
  `;

export function SelectedList() {
  const currentList = useSelector(selectCurrentList);
  const showAddSectionForm = useSelector(selectShowAddSectionForm);
  const dispatch = useDispatch();
  const userId = useContext(UserIdContext);

  function onDragEnd(result) {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    if (type === 'sections') {
      dispatch(updateSectionsOrderAsync({ userId, sections: { source, destination } }));
    }
    if (type === 'tasks') {
      dispatch(updateTasksOrderAsync({ userId, tasks: { source, destination } }));
    }
  }

  let sections;
  if (currentList) {
    sections = currentList.sections.map((section, index) => (
      <Section
        key={section._id}
        sectionIndex={index}
        title={section.title}
        sectionId={section._id}
        listId={currentList._id}
        isDefaultSection={section.isDefaultSection}
        tasks={section.tasks}
      />
    ));
  } else {
    sections = '';
  }

  let addSectionForm;
  if (showAddSectionForm) {
    addSectionForm = (
      <AddSection listId={currentList ? currentList._id : ''} />
    );
  } else {
    addSectionForm = '';
  }

  let selectedListComponent;
  if (currentList) {
    selectedListComponent = (
      <div className="SelectedList">
        <div className="SelectedList__header">
          <h1>{currentList ? currentList.title : '' }</h1>
          <ListMenu />
        </div>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId={currentList._id} type="sections">
            {(provided) => (
              <SectionsWrap
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sections}
                {provided.placeholder}
              </SectionsWrap>
            )}
          </Droppable>
        </DragDropContext>
        {addSectionForm}
      </div>
    );
  } else {
    selectedListComponent = '';
  }

  return (
    selectedListComponent
  );
}
