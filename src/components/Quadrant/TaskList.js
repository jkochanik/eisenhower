import React from "react";
import { Task } from "../Task";


function listTasks(list) {
    return list.map((task) =>
        <Task name={task}></Task>
    );
}

class TaskList extends React.Component {
    list = ["shit", "piss","fuck","cunt","cocksucker","motherfucker","tits"];
    constructor(props) {
        super(props);
        this.state = {
            list: this.taskArray,
        }
    };




    render() {
        return (
            <div>
                {listTasks()}
            </div>
        );
    }
}

export { TaskList }