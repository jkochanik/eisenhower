import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, content: 'Task 1' },
        { id: 2, content: 'Task 2' },
        { id: 3, content: 'Task 3' },
        { id: 4, content: 'Task 4' },
    ]);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newTasks = [...tasks];
        const task = newTasks.splice(source.index, 1)[0];
        newTasks.splice(destination.index, 0, task);

        setTasks(newTasks);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="task-list">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {task.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default App;

export { App }
