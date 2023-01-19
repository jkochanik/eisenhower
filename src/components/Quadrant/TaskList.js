import React from "react";
import { Task } from "../Task";
import {AddTask} from "../../AddTask";
import { Droppable} from 'react-beautiful-dnd';
import initialData from "../../assests/initial-data";


function listTasks(list) {
    return list.map((task, index) =>
        <Task name={task}></Task>
    );
}

class TaskList extends React.Component {
    state = initialData;


    constructor(props) {
        super(props);
        this.state = {
            list: this.taskArray,
            id: this.taskName

        }
    };




    render() {
        return <Droppable droppableId={this.id}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {listTasks(this.list)}
                    <AddTask></AddTask>
                </div>
            )}
        </Droppable>

    }
}

export { TaskList }