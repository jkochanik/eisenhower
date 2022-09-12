import React from "react";
import { Task } from "../Task";
import {AddTask} from "../../AddTask";


function listTasks(list) {
    return list.map((task) =>
        <Task name={task}></Task>
    );
}

class TaskList extends React.Component {
    list = [];
    constructor(props) {
        super(props);
        this.state = {
            list: this.taskArray,
        }
    };




    render() {
        return (
            <div>
                {listTasks(this.list)}
                <AddTask></AddTask>
            </div>
        );
    }
}

export { TaskList }