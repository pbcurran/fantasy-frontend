import React, { useState, useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import classes from './TeamPlayers.module.css';

const TeamPlayers = ({ selectedTeam, id }) => {
  const [team, setTeam] = useState(selectedTeam);
  useEffect(() => {
    setTeam(selectedTeam);
  }, [selectedTeam]);

  // for each player make the color of the card correlate with their average
  // the higher the score the different the color
  let renderedPlayers;
  if (selectedTeam) {
    renderedPlayers = team.players.map((player, index) => {
      return (
        <Draggable
          key={'' + player.playerId + id}
          draggableId={'' + player.playerId + id}
          index={index}
        >
          {(provided) => (
            <div
              className={classes.playerCard}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Row>
                <Col sm={8}>
                  <div>{player.playerName}</div>
                </Col>
                <Col>{player.currentAverage}</Col>
                <Col>
                  <div
                    style={
                      player.position === 'C' || player.position === 'PF'
                        ? { color: 'red', fontSize: '13px' }
                        : { color: 'black', fontSize: '13px' }
                    }
                  >
                    {player.position}
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Draggable>
      );
    });
  }
  return (
    <div>
      <Row style={{ marginBottom: '5px' }}>
        <Col sm={8}>Name</Col>
        <Col>Current Avg</Col>
      </Row>
      <div>
        <Droppable droppableId={'players' + id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {renderedPlayers}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TeamPlayers;
