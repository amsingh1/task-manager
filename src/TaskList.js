import React from "react";

const style = {
  backgroundColor: "grey",
  textDecoration: "line-through",
};

export default function TaskList(props) {
  return (
    <div className="task d-flex justify-content-between mt-0.5" style={props.checked ? style : null}>
    <div>
    <p className="taskTitle">{props.todo}</p>
    </div>
       
      

      <div>
        <input
          type="checkbox"
          checked={props.checked}
          onChange={props.handleChecked}
        />
        <i className="bi bi-trash hide" onClick={props.handleDelete}></i>
      </div>
    </div>
  );
}
