import React from "react";
import styled from "styled-components";

class TaskList extends React.Component {
    list = ["shit", "piss","fuck","cunt","cocksucker","motherfucker","tits"];
    constructor(props) {
        super(props);
        this.state = {
            list: this.taskArray,
        }
    };

    listTasks() {
        return this.list.map((task) =>
            <li>{task}</li>
        );
    }


    render() {
        return (
            <div>
                <ol>
                    {this.listTasks()}
                </ol>
            </div>
        );
    }
}

export { TaskList }