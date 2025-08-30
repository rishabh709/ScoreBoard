import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  const tableHeadRef1 = useRef(null);
  const tableHeadRef2 = useRef(null);
  const tableHeadRef3 = useRef(null);

  useEffect(()=>{
    const divs = [tableHeadRef1, tableHeadRef2, tableHeadRef3];
    const heights = divs.map(ref => ref.current?.offsetHeight || 0);
    const maxHeight = Math.max(...heights);

    divs.forEach(ref => {
      console.log(ref.current)
      ref.current.style.height = `${maxHeight}px`;
    });
  }, [matchState.players.team1.length, matchState.players.team2.length])

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


  const inputStyle = {
                    backgroundColor:'transparent', 
                    borderBottom:'1px solid #00000066',
                    paddingTop: '15px',
                    paddingLeft: '5px'
                  }

  const content = (
    <div style={{display:'flex', width:'100%', height:'100%'}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.sno}>


            <div className={classes.table}>
              <h3 className={classes.columnHeading} ref={tableHeadRef1} >No.</h3>
              </div>

        <div className={classes.numbers}>
          {matchState.players[maxTeam].map(({}, index) => (
            <div key={index} className={classes.tableRow}>
              {index + 1}
            </div>
          ))}
        </div>
        </div>
        <div style={{width:'100%', height:'100%', display:'flex', flexGrow:'1', columnGap:'0.7vw', boxSizing:'border-box', overflow:'auto'}}>
        <div className={classes.table}>
          <h3 className={classes.columnHeading} ref={tableHeadRef2}>{matchState.team1}</h3>
          <Droppable droppableId={"team1"}>
            {(provided) => (
              <div
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
                      <div
                        ref={provided.innerRef}
                        className={classes.tableRow}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {playerName}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div>
            <div className={classes.inputBox}>
                <input
                  type="text"
                  style={inputStyle}
                  className={classes.nameInput}
                  value={inputValue1}
                  onChange={handleInputChange1}
                  onKeyDown={handleOnKeyDown1}
                  placeholder="Enter Player name"
                  onSubmit={(e)=>e.preventDefault()}
                />
            </div>
          </div>
        </div>

        <div className={classes.table}>
          <div>
            <h3 className={classes.columnHeading} ref={tableHeadRef3}>{matchState.team2}</h3>
          </div>
          <Droppable droppableId={"team2"}>
            {(provided) => (
              <div
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
                      <div
                        ref={provided.innerRef}
                        className={classes.tableRow}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {playerName}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div>
            <div className={classes.inputBox}>
              <input
                type="text"
                style={inputStyle}
                className={classes.nameInput}
                value={inputValue2}
                onChange={handleInputChange2}
                onKeyDown={handleOnKeyDown2}
                placeholder="Enter Player name"
              />
            </div>
          </div>
        </div>
        </div>
      </DragDropContext>
    </div>
  );

  return content;

  return (
    <div style={{ display: "flex" }}>
      <Sno />
      <DragDropContext onDragEnd={onDragEnd}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>
                <h3>{matchState.team1}</h3>
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
                        className={classes.tableRow}
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
                <form action="">
                  <input
                    type="text"
                    className={classes.nameInput}
                    value={inputValue1}
                    onChange={handleInputChange1}
                    onKeyDown={handleOnKeyDown1}
                    placeholder="Enter Player name"
                  />
                </form>
              </td>
            </tr>
          </tfoot>
        </table>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>
                <h3>{matchState.team2}</h3>
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
                        className={classes.tableRow}
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
