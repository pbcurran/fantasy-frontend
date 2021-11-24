import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

import './TeamList.module.css';
import styles from './TeamList.module.css';

const TeamList = ({ leagueTeams, handleSelectedTeam, title }) => {
  const renderedTeams = leagueTeams.map((team, index) => {
    return <option key={index}>{team.teamName}</option>;
  });

  const handleChange = (e) => {
    let teamName = e.target.value;
    teamName = teamName.split(' ').join('');
    handleSelectedTeam(teamName);
  };

  return (
    <div>
      {leagueTeams.length > 0 ? (
        <Form.Select
          className={styles.dropDown}
          aria-label="Default select example"
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option>{title}</option>
          {renderedTeams}
        </Form.Select>
      ) : (
        <h5 style={{ color: 'black', marginTop: '5px' }}>loading teams...</h5>
      )}
    </div>
  );
};

export default TeamList;
