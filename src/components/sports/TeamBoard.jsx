import React, { useState } from "react";
import classes from "./TeamBoard.module.css";
import { useMatchContext } from "../../context/matchReducer";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function TeamBoard() {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();
  const maxTeam =
    matchState.players.team1.length > matchState.players.team2.length
      ? "team1"
      : "team2";

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };
  const handleOnKeyDown1 = (e) => {
    console.log("1st input::", e.key, e.defaultPrevented);
    if (
      e.key === "Enter" ||
      (e.target.value == [] && inputValue1.trim() !== "")
    ) {
      matchDispatch({
        type: "INSERT_PLAYER_INTO",
        team: "team1",
        payload: inputValue1,
      });
      setInputValue1("");
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const handleOnKeyDown2 = (e) => {
    console.log("2nd input:: ", e.key, e.defaultPrevented);
    if (e.key === "Enter" && inputValue2.trim() !== "") {
      matchDispatch({
        type: "INSERT_PLAYER_INTO",
        team: "team2",
        payload: inputValue2,
      });
      setInputValue2("");
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    console.log(source);
    console.log(destination);
    const playerName = matchState.players[source.droppableId].at(source.index);

    if (!destination) return;
    else {
      matchDispatch({
        type: "REMOVE_PLAYER_AT",
        id: source.index,
        teamName: source.droppableId,
      });
      matchDispatch({
        type: "INSERT_PLAYER_INTO",
        playerName: playerName,
        team: destination.droppableId,
        index: destination.index,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.container}>
        <Droppable droppableId="team1">
          {(provided) => (
            <table
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyleType: "none", padding: 0 }}
              className={classes.team}
            >
              <tr>
                <th>Team 1</th>
              </tr>
              {matchState.players.team1.map((name, id) => (
                <Draggable
                  key={`team1-${id}`}
                  draggableId={`team1-${id}`}
                  index={id}
                >
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>{name}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder} {/* Important */}
            </table>
          )}
        </Droppable>
        <Droppable droppableId="team2">
          {(provided) => (
            <table
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyleType: "none", padding: 0 }}
              className={classes.team}
            >
              <tr>
                <th>Team 2</th>
              </tr>
              {matchState.players.team2.map((name, id) => (
                <Draggable
                  key={`team2-${id}`}
                  draggableId={`team2-${id}`}
                  index={id}
                >
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>{name}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder} {/* Important */}
            </table>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default TeamBoard;
