import React, {Component} from "react";
import {Task} from "../components/Task";

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleClick(){
        
    }

    render() {
      return <Task name="New Task"></Task>
    }

}

export { AddTask }

