import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import TeamTitle from './TeamTitle';

// import classes from './LeagueDisplay.module.css';

import TeamList from './TeamList';
import TeamPlayers from './TeamPlayers';
import PlayerBoard from '../drag and drop/PlayerBoard';
import PlayerBin from '../drag and drop/PlayerBin';

const LeagueDisplay = () => {
  const [leagueTeams, setLeagueTeams] = useState([]);
  const [leaguePlayers, setLeaguePlayers] = useState([]);

  const [selectedHomeTeam, setSelectedHomeTeam] = useState(null);
  const [selectedAwayTeam, setSelectedAwayTeam] = useState(null);

  const [boardOnePlayers, setBoardOnePlayers] = useState([]);
  const [boardTwoPlayers, setBoardTwoPlayers] = useState([]);
  const [playerBinPlayers, setPlayerBinPlayers] = useState([]);

  const [initialHomeAverage, setInitialHomeAverage] = useState(0);
  const [initialAwayAverage, setInitialAwayAverage] = useState(0);
  const [newHomeAverage, setNewHomeAverage] = useState(0);
  const [newAwayAverage, setNewAwayAverage] = useState(0);

  // on render gets an array of the team names and players on each team sets it to league teams
  useEffect(() => {
    const getTeams = async () => {
      let playersTemp = [];
      const result = await axios.get(
        'https://nba-fantasy-backend-pc.herokuapp.com/api/leagueteams/'
      );
      console.log('api results: ', result.data);

      // creates a list of all the players for getting any player data needed to display
      result.data.forEach((team) => {
        playersTemp = playersTemp.concat(team.players);
      });
      console.log('players: ', playersTemp);
      setLeaguePlayers(playersTemp);
      setLeagueTeams(result.data);
    };
    getTeams();
  }, []);

  const handleDrop = (e) => {
    if (!e.destination) return;
    console.log(e);
    // to get the player info, need to trim off the last digit in the draggableID
    // the last digit is there to differentiate from duplicates in the player lists
    // this is the reason for the math.floor below on the draggableId
    const playerInfo = leaguePlayers.find(
      (player) => player.playerId === Math.floor(e.draggableId / 10)
    );

    // if the user drop a player into the middle boards
    if (e.destination.droppableId === 'board3') {
      // need to spread out the array so it doesn't just pass to the reference
      // but creates a new array so the component updates
      const boardOnePlayersTemp = [...boardOnePlayers];
      boardOnePlayersTemp.splice(e.destination.index, 0, playerInfo);
      setBoardOnePlayers(boardOnePlayersTemp);

      // if the user picked player from a team lists
      removeFromTeamList(
        e,
        selectedHomeTeam,
        playerInfo,
        setSelectedHomeTeam,
        selectedAwayTeam,
        setSelectedAwayTeam
      );
      //if the user picked a player from board list
      // removes the picked up player from the board
      removeFromSourceBoard(e, removeFromBoard);
    } else if (e.destination.droppableId === 'board4') {
      const boardTwoPlayersTemp = [...boardTwoPlayers];
      boardTwoPlayersTemp.splice(e.destination.index, 0, playerInfo);
      setBoardTwoPlayers(boardTwoPlayersTemp);

      // if the user picked player from a team lists
      removeFromTeamList(
        e,
        selectedHomeTeam,
        playerInfo,
        setSelectedHomeTeam,
        selectedAwayTeam,
        setSelectedAwayTeam
      );
      removeFromSourceBoard(e, removeFromBoard);
    } else if (e.destination.droppableId === 'board5') {
      const binPlayersTemp = [...playerBinPlayers];
      binPlayersTemp.splice(e.destination.index, 0, playerInfo);
      setPlayerBinPlayers(binPlayersTemp);
      removeFromTeamList(
        e,
        selectedHomeTeam,
        playerInfo,
        setSelectedHomeTeam,
        selectedAwayTeam,
        setSelectedAwayTeam
      );
      removeFromSourceBoard(e, removeFromBoard);
    } else if (e.destination.droppableId === 'players1') {
      // spread out object to create a new one not just a reference for
      // proper re render
      const homeTeamTemp = { ...selectedHomeTeam };
      homeTeamTemp.players.splice(e.destination.index, 0, playerInfo);
      setSelectedHomeTeam(homeTeamTemp);
      removeFromTeamList(
        e,
        selectedHomeTeam,
        playerInfo,
        setSelectedHomeTeam,
        selectedAwayTeam,
        setSelectedAwayTeam
      );
      removeFromSourceBoard(e, removeFromBoard);
    } else if (e.destination.droppableId === 'players2') {
      // spread out object to create a new one not just a reference for
      // proper re render
      const awayTeamTemp = { ...selectedAwayTeam };
      awayTeamTemp.players.splice(e.destination.index, 0, playerInfo);
      setSelectedAwayTeam(awayTeamTemp);
      removeFromTeamList(
        e,
        selectedHomeTeam,
        playerInfo,
        setSelectedHomeTeam,
        selectedAwayTeam,
        setSelectedAwayTeam
      );
      removeFromSourceBoard(e, removeFromBoard);
    }
  };

  function removeFromSourceBoard(e, removeFromBoard) {
    if (e.source.droppableId === 'board3') {
      removeFromBoard(e, boardOnePlayers, setBoardOnePlayers);
    } else if (e.source.droppableId === 'board4') {
      removeFromBoard(e, boardTwoPlayers, setBoardTwoPlayers);
    } else if (e.source.droppableId === 'board5') {
      removeFromBoard(e, playerBinPlayers, setPlayerBinPlayers);
    }
  }
  // removes the player from the board list when dragging out
  const removeFromBoard = (e, sourceBoardPlayers, setSourcePlayers) => {
    // removes the player from the board list that the user got it from
    const currentBoardPlayers = [...sourceBoardPlayers];
    currentBoardPlayers.splice(e.source.index, 1);
    setSourcePlayers(currentBoardPlayers);
    setNewHomeAverage(getTeamAverage(selectedHomeTeam));
    setNewAwayAverage(getTeamAverage(selectedAwayTeam));
  };

  // creates the new average for the players that have moved around on the list
  const getTeamAverage = (team) => {
    console.log('team after drag: ', team);
    let totalScore = 0;
    team.players.forEach((player) => {
      totalScore += player.currentAverage;
    });
    const newTeamAverage = totalScore / team.players.length;
    return newTeamAverage;
  };

  // callback function for handling when user clicks on the team,
  // this function then gets the relevant object from the teams array
  // and passes it through to the teamplayers display compoenent
  const handleSelectedHomeTeam = (selectedTeamName) => {
    const selectedTeamInfo = leagueTeams.filter((team) => {
      const teamTotalAverage = [];
      let teamNameComparison = team.teamName;
      teamNameComparison = teamNameComparison.split(' ').join('');
      return teamNameComparison === selectedTeamName;
    });
    setSelectedHomeTeam(selectedTeamInfo[0]);
    setInitialHomeAverage(getTeamAverage(selectedTeamInfo[0]));
    setNewHomeAverage(getTeamAverage(selectedTeamInfo[0]));
  };

  const handleSelectedAwayTeam = (selectedTeamName) => {
    console.log('team name passed in: ', selectedTeamName);
    const selectedTeamInfo = leagueTeams.filter((team) => {
      const teamTotalAverage = [];
      let teamNameComparison = team.teamName;
      teamNameComparison = teamNameComparison.split(' ').join('');
      return teamNameComparison === selectedTeamName;
    });
    console.log(selectedTeamInfo[0].players);
    setSelectedAwayTeam(selectedTeamInfo[0]);
    setInitialAwayAverage(getTeamAverage(selectedTeamInfo[0]));
    setNewAwayAverage(getTeamAverage(selectedTeamInfo[0]));
  };

  // removes the player from the team that the user
  // dragged them from
  function removeFromTeamList(
    e,
    selectedHomeTeam,
    playerInfo,
    setSelectedHomeTeam,
    selectedAwayTeam,
    setSelectedAwayTeam
  ) {
    if (e.source.droppableId === 'players1') {
      // removes the player from the home team
      const homeTeamPlayersTemp = selectedHomeTeam;
      homeTeamPlayersTemp.players = homeTeamPlayersTemp.players.filter(
        (player) => player.playerId !== playerInfo.playerId
      );
      setSelectedHomeTeam(homeTeamPlayersTemp);
      setNewHomeAverage(getTeamAverage(selectedHomeTeam));
      setNewAwayAverage(getTeamAverage(selectedAwayTeam));
    } else if (e.source.droppableId === 'players2') {
      // removes the player from the away team
      const awayTeamPlayersTemp = selectedAwayTeam;
      awayTeamPlayersTemp.players = awayTeamPlayersTemp.players.filter(
        (player) => player.playerId !== playerInfo.playerId
      );
      setSelectedAwayTeam(awayTeamPlayersTemp);
      setNewHomeAverage(getTeamAverage(selectedHomeTeam));
      setNewAwayAverage(getTeamAverage(selectedAwayTeam));
    }
  }

  return (
    <div>
      <Row>
        <Col md={6}>
          <TeamList
            title={'Your Team'}
            leagueTeams={leagueTeams}
            handleSelectedTeam={handleSelectedHomeTeam}
          ></TeamList>
        </Col>
        <Col md={6}>
          <TeamList
            title={'Opponents Team'}
            leagueTeams={leagueTeams}
            handleSelectedTeam={handleSelectedAwayTeam}
          ></TeamList>
        </Col>
      </Row>
      <Row>
        <DragDropContext onDragEnd={handleDrop}>
          <Col md={4}>
            <TeamTitle
              selectedTeam={selectedHomeTeam}
              title="Your Team"
              initialAverage={initialHomeAverage}
              newAverage={newHomeAverage}
            />

            {selectedHomeTeam && (
              <TeamPlayers
                teamData={leagueTeams}
                selectedTeam={selectedHomeTeam}
                id={'1'}
              ></TeamPlayers>
            )}
          </Col>
          <Col md={4}>
            <PlayerBoard players={boardOnePlayers} id={'3'}></PlayerBoard>
            <PlayerBoard players={boardTwoPlayers} id={'4'}></PlayerBoard>
            <PlayerBin players={playerBinPlayers} id={'5'}></PlayerBin>
          </Col>
          <Col md={4}>
            <TeamTitle
              selectedTeam={selectedAwayTeam}
              title="Opponent's Team"
              initialAverage={initialAwayAverage}
              newAverage={newAwayAverage}
            />

            {selectedAwayTeam && (
              <TeamPlayers
                teamData={leagueTeams}
                selectedTeam={selectedAwayTeam}
                id={'2'}
              ></TeamPlayers>
            )}
          </Col>
        </DragDropContext>
      </Row>
    </div>
  );
};

export default LeagueDisplay;
