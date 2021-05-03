/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import './Section.css';
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { AddTask } from '../AddTask/AddTask'; // eslint-disable-line
import { Task } from '../Task/Task'; // eslint-disable-line
import { SectionMenu } from '../SectionMenu/SectionMenu'; // eslint-disable-line

const SectionsWrap = styled.div`
  padding: 8px;
  `;
const TasksWrap = styled.div`
  padding: 0.5rem;
  background-color: ${(props) => (props.isDraggingOver ? 'rgb(250, 250, 250)' : 'white')};
  `;

export function Section({
  title,
  sectionId,
  sectionIndex,
  listId,
  isDefaultSection,
  tasks,
}) {
  const renderedTitle = isDefaultSection
    ? ''
    : (<h3 className="Section__title">{title}</h3>);
  const renderedSectionMenu = isDefaultSection
    ? ''
    : (<SectionMenu sectionId={sectionId} />);
  const renderedTasks = tasks.map((task, index) => (
    <Task
      key={task._id}
      id={task._id}
      title={task.title}
      complete={task.complete}
      notes={task.notes}
      lists={task.lists}
      sectionId={sectionId}
      currentListId={listId}
      index={index}
    />
  ));
  return (
    <Draggable
      draggableId={sectionId}
      index={sectionIndex}
    >
      {(provided) => (
        <SectionsWrap
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="Section">
            <div
              {...provided.dragHandleProps}
              className={`Section__header ${isDefaultSection ? '' : 'Section__header--border-bottom'}`}
            >
              {renderedTitle}
              {renderedSectionMenu}
            </div>
            <AddTask sectionId={sectionId} listId={listId} />
            <Droppable droppableId={sectionId} type="tasks">
              {(provided, snapshot) => (
                <TasksWrap
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                  {...provided.droppableProps}
                >
                  {renderedTasks}
                  {provided.placeholder}
                </TasksWrap>
              )}
            </Droppable>
          </div>
        </SectionsWrap>
      )}
    </Draggable>

  );
}
