import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ListItem from './ListItem.jsx';

const axios = require('axios').default;

const ListContainer = styled.div`
  width: 900px;
  margin: auto;
`;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    const { data } = this.props;
    return (
      <ListContainer>
        <h1>Search history:</h1>
        <ul>
          <ListItem data={data} />
        </ul>
      </ListContainer>
    );
  }
}

export default List;
