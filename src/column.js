import React, { Component } from "react";
import styled from "styled-components";
import Task from "./task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  ${'' /* width: 220px; */}

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
`;

const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;

  ${'' /* display: flex; */}
`;

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if(nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }
  render() {
   return this.props.tasks.map((task, index) => (
      <Task index={index} key={task.id} task={task} />
    ))
  }
}

class column extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
      {(provided) => (
      <Container {...provided.draggableProps}  ref={provided.innerRef}>
        <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id} 
        type="task"
        // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
        isDropDisabled={this.props.isDropDisabled}
        direction='vertical'
        >
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <InnerList tasks={this.props.tasks} />
              
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
      )}
      </Draggable>
    );
  }
}

export default column;
