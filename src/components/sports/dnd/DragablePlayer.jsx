import { Draggable } from "@hello-pangea/dnd";
import React from "react";

function DragablePlayer(props) {
  const team = props.team;
  const id = props.id;
  return (
    <Draggable key={`${team}-${id}`} draggableId={`${team}-${id}`} index={id}>
      {(provided) => (
        <td
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.children}
        </td>
      )}
    </Draggable>
  );
}

export default DragablePlayer;
