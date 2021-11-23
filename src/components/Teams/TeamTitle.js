import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import classes from './TeamTitle.module.css';

function TeamTitle({ selectedTeam, title, newAverage, initialAverage }) {
  const arrowIcont = (
    <AiOutlineArrowUp style={{ marginBottom: '5px', marginLeft: '5px' }} />
  );
  let arrowIcon;
  if (newAverage !== initialAverage) {
    arrowIcon =
      newAverage > initialAverage ? (
        <AiOutlineArrowUp
          style={{ marginBottom: '5px', marginLeft: '5px', color: 'green' }}
        />
      ) : (
        <AiOutlineArrowDown
          style={{ marginBottom: '5px', marginLeft: '5px', color: 'red' }}
        />
      );
  }

  return (
    <div>
      <h3 className={classes.teamTitle}>
        {selectedTeam ? selectedTeam.teamName : title}
        {selectedTeam && (
          <Row style={{ marginTop: '15px' }}>
            <Col md={6}>
              <h5>Team Avg</h5>
              <h5 style={{ fontSize: '20px' }}>{initialAverage.toFixed(2)}</h5>
            </Col>
            <Col md={6}>
              <h5>New Avg</h5>
              <h5 style={{ fontSize: '20px' }}>
                {newAverage.toFixed(2)} {arrowIcon}
              </h5>
            </Col>
          </Row>
        )}
      </h3>
    </div>
  );
}

export default TeamTitle;
