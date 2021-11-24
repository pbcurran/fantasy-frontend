import React, { useState, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Row, Col } from 'react-bootstrap';

import classes from './PlayerBin.module.css';

function PlayerBoard({ id, players }) {
  // here put the DragDrop context section inside the actual card instead of
  // on the outside so that maybe onlt thie things in the middle move when dragging?
  const [selectedPlayers, setSelectedPlayers] = useState(players);
  useEffect(() => {
    setSelectedPlayers(players);
  }, [players]);

  let renderedPlayers;

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
              </Row>
            </div>
          )}
        </Draggable>
      );
    });
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
            {renderedPlayers.length == 0 ? (
              <p>
                Use this are as a place holder to discount player scores from
                averages
              </p>
            ) : (
              <p></p>
            )}
            {renderedPlayers}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default PlayerBoard;
