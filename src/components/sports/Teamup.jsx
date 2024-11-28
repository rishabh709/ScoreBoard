import React, { useState } from "react";
import classes from "./Teamup.module.css";
import { useMatchContext } from "../../context/matchReducer";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function Teamup() {
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
    console.log("1st input::", e.key, e.defaultPrevented, inputValue1);
    if (
      e.key === "Enter" ||
      (e.target.value == [] && inputValue1.trim() !== "")
    ) {
      matchDispatch({
        type: "INSERT_PLAYER_INTO",
        playerName: inputValue1,
        team: "team1",
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
        playerName: inputValue2,
        team: "team2",
      });
      setInputValue2("");
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const onDragEnd = (result) => {
    const { destination, source } = result;
    const playerName = matchState.players[source.droppableId][source.index];

    if (!destination) return;

    matchDispatch({
      type: "REMOVE_PLAYER_AT",
      id: source.index,
      teamName: source.droppableId,
    });
    matchDispatch({
      type: "INSERT_PLAYER_INTO",
      playerName,
      team: destination.droppableId,
      index: destination.index,
    });
  };

  const Sno = () => (
    <table style={{ borderRight: "none" }}>
      <thead>
        <tr>
          <th>
            <h3>Sno</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {matchState.players[maxTeam].map(({}, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div style={{ display: "flex" }}>
      <Sno />
      <DragDropContext onDragEnd={onDragEnd}>
        <table>
          <thead>
            <tr>
              <th>
                <h3>Team1</h3>
              </th>
            </tr>
          </thead>
          <Droppable droppableId={"team1"}>
            {(provided) => (
              <tbody
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classes.team}
              >
                {matchState.players["team1"].map((playerName, id) => (
                  <Draggable
                    key={`${"team1"}-${id}`}
                    draggableId={`${"team1"}-${id}`}
                    index={id}
                  >
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <td>{playerName}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
          <tfoot>
            <tr>
              <td className={classes.inputBox}>
                <input
                  type="text"
                  className={classes.nameInput}
                  value={inputValue1}
                  onChange={handleInputChange1}
                  onKeyDown={handleOnKeyDown1}
                  placeholder="Enter Player name"
                />
              </td>
            </tr>
          </tfoot>
        </table>
        <table>
          <thead>
            <tr>
              <th>
                <h3>Team2</h3>
              </th>
            </tr>
          </thead>
          <Droppable droppableId={"team2"}>
            {(provided) => (
              <tbody
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classes.team}
              >
                {matchState.players["team2"].map((playerName, id) => (
                  <Draggable
                    key={`${"team2"}-${id}`}
                    draggableId={`${"team2"}-${id}`}
                    index={id}
                  >
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <td>{playerName}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
          <tfoot>
            <tr>
              <td className={classes.inputBox}>
                <input
                  type="text"
                  className={classes.nameInput}
                  value={inputValue2}
                  onChange={handleInputChange2}
                  onKeyDown={handleOnKeyDown2}
                  placeholder="Enter Player name"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </DragDropContext>
    </div>
  );
}

export default Teamup;
