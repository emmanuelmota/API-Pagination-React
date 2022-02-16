import React from 'react';
import ReactDOM from 'react-dom';
// import styled from 'styled-components';

const axios = require('axios').default;

// const Master = styled.div`
//   width: 50%;
//   margin: auto;
// `;

const ListItem = (props) => {
  const { data } = props;
  //console.log(data);
  const items = data.map((item) => <li>{item.date.slice(0, 4)}<br></br> {item.description} </li>);
  // const listItems = ailments.map((ailment) => <Ailment className={ailment} key={ailment} onClick={this.optionSelector}><AilmentText>{ailment}</AilmentText></Ailment>);
  return (
    <>{items}</>
  );
};

export default ListItem;
