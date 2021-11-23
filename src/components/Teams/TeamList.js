import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

import './TeamList.module.css';
import styles from './TeamList.module.css';

const TeamList = ({
  leagueTeams,
  handleSelectedTeam,
  droppableId,
  prompt,
  title,
}) => {
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
    </div>
  );
};

export default TeamList;
