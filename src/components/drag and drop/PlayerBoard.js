import React, { useState, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Row, Col } from 'react-bootstrap';

import classes from './PlayerBoard.module.css';

function PlayerBoard({ id, players }) {
  // here put the DragDrop context section inside the actual card instead of
  // on the outside so that maybe onlt thie things in the middle move when dragging?
  const [selectedPlayers, setSelectedPlayers] = useState(players);
  useEffect(() => {
    setSelectedPlayers(players);
  }, [players]);

  let renderedPlayers;
  let selectedAverage = 0;

  if (selectedPlayers) {
    renderedPlayers = selectedPlayers.map((player, index) => {
      return (
        <Draggable
          key={index + parseInt(id)}
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
    let totalPlayerScore = 0;
    selectedPlayers.forEach((player) => {
      totalPlayerScore += player.currentAverage;
    });
    selectedAverage = totalPlayerScore / selectedPlayers.length;
  }

  return (
    <div className={classes.card}>
      <Droppable droppableId={'board' + id}>
        {(provided) => (
          <div
            style={{ minHeight: '140px' }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {renderedPlayers}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <hr style={{ marginLeft: '10px', marginRight: '10px' }} />
      {selectedAverage ? (
        <p>
          Avg: {selectedAverage.toFixed(2)} <br />
        </p>
      ) : (
        <p>Avg: n/a</p>
      )}
    </div>
  );
}

export default PlayerBoard;
