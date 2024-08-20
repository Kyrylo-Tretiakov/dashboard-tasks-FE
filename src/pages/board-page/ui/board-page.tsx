'use client';
import { Board } from '@/entities/board';
import { Column } from '@/entities/column';
import { Task } from '@/entities/task';
import React, { useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

interface CardType {
  id: string;
  text: string;
}

interface ColumnType {
  id: string;
  title: string;
  tasks: CardType[];
}

// Sample initial data
const initialColumns: ColumnType[] = [
  {
    id: 'column-1',
    title: 'To Do',
    tasks: [
      { id: '1', text: 'Task 1' },
      { id: '2', text: 'Task 2' },
      { id: '33', text: 'Task 3' },
      { id: '44', text: 'Task 4' },
      { id: '55', text: 'Task 5' },

    ],
  },
  {
    id: 'column-2',
    title: 'In Progress',
    tasks: [{ id: '3', text: 'Task 3' }],
  },
  {
    id: 'column-3',
    title: 'Done',
    tasks: [{ id: '4', text: 'Task 4' }],
  },
];


const BoardPage: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);



  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceColumnIndex = columns.findIndex((column) => column.id === source.droppableId);
    const destinationColumnIndex = columns.findIndex((column) => column.id === destination.droppableId);

    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];

    const [movedCard] = sourceColumn.tasks.splice(source.index, 1);

    destinationColumn.tasks.splice(destination.index, 0, movedCard);

    setColumns(
      columns.map((column, index) => {
        if (index === sourceColumnIndex) {
          return sourceColumn;
        }
        if (index === destinationColumnIndex) {
          return destinationColumn;
        }
        return column;
      })
    );
  };

  return (

    <div className='overflow-hidden'>
      <Board >
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-4">
            {columns.map((column, index) => (
              <Droppable key={index} droppableId={column.id} >
                {(provided) => (
                  <Column title={column.title} provided={provided} >
                    {column.tasks.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided, snapshot) =>
                        (
                          <div ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <Task isDragging={snapshot.isDragging} key={card.id} text={card.text} />
                          </div>
                        )
                        }
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Column>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </Board>
    </div>
  );
};

export default BoardPage;
