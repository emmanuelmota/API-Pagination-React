import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import List from './List.jsx';
import Search from './Search.jsx';

const axios = require('axios').default;

const pagination = styled.ul`
list-style-type: none;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pageCount: 0,
      query: null,
    };
    this.getPage = this.getPage.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.search(1, null);
  }

  getPage(page, query) {
    if (query === null) {
      axios.get(`/events?_page=1&_limit=10`)
        .then((response) => {
          const responsePages = Math.floor(response.headers['x-total-count'] / 10);
          console.log('Total Number of pages', responsePages);
          this.setState({
            data: response.data,
            pageCount: responsePages,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } if (query) {
      axios.get(`/events?_page=${page}&q=${query}&_limit=10`)
        .then((response) => {
          const responsePages = Math.floor(response.headers['x-total-count'] / 10);
          console.log('Total Number of pages', responsePages);
          this.setState({
            data: response.data,
            query: `${query}`,
            pageCount: responsePages,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  search(query) {
    console.log("Search was invoked");
    this.getPage(1, query);
  }

  handlePageClick(data) {
    console.log("Handle Page clicled", data.selected);
    const { query } = this.state;
    let { selected } = data;
    this.getPage(selected + 1, query);
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          initialPage={0}
          marginPagesDisplayed={5}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        <Search searchIt={this.search} />
        <List data={data} />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
