import React, { useState } from "react";
import classes from "./TeamBoard.module.css";

function TeamBoard() {
  const [players, setPlayers] = useState({
    team1: ["Sikhar Dhawan", "Rohit Sharma", "Virat Kohli"],
    team2: ["Brandon Macullam", "Krish Gayle", "AB Devilliars"],
  });
  const [maxTeam, minTeam] =
    players.team1.length > players.team2.length
      ? ["team1", "team2"]
      : ["team2", "team1"];

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const handleInputChange1 = (e) =>{
    setInputValue1(e.target.value);
  }
  const handleInputChange2 = (e) =>{
    setInputValue2(e.target.value);
  }
  const handleOnKeyDown1 = (e) => {
    console.log('1st input::', e.key, e.defaultPrevented)
    if(e.key === 'Enter' || e.target.value==[] && inputValue1.trim() !== ''){
      setPlayers({...players, team1:[...players.team1, inputValue1]});
      setInputValue1('');
      e.preventDefault();
      e.stopPropagation();
    }
  }
  const handleOnKeyDown2 = (e) => {
    console.log('2nd input:: ', e.key, e.defaultPrevented)
    if(e.key === 'Enter' && inputValue2.trim() !== ''){
      setPlayers({...players, team2:[...players.team2, inputValue2]});
      setInputValue2('');
      e.preventDefault();
      e.stopPropagation();
    }
  }
  
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Team 1</th>
            <th>Team 2</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(players[maxTeam]).map((playerName, key) => (
            <tr key={key}>
              <td>{players.team1[key]}</td>
              <td>{players.team2[key]}</td>
            </tr>
          ))}
          <tr>
            <td className={classes.input}>
              <form action={()=>{e.preventDefault()}}>
                <input
                  type="text"
                  role="textbox"
                  className={classes.nameInput}
                  value={inputValue1}
                  onChange={handleInputChange1}
                  onKeyDown={handleOnKeyDown1}
                  placeholder="Enter Player name"
                />
              </form>
            </td>
            <td className={classes.input}>
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
        </tbody>
      </table>
    </div>
  );
}

export default TeamBoard;
