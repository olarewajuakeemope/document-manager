import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';
import * as documentActions from '../../actions/documentActions';

/**
 * Replace with appropriate info on completion
 * @class DocumentSearch
 * @extends {Component}
 * @param {Object} e - event
 */
class DocumentSearch extends Component {
  /**
   * @returns {Object} Jsx
   * @memberOf DocumentSearch
   */
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    e.preventDefault();
    this.setState({ value: result.title });
    const selectedDocumentArray = this.props.documents.filter(
      document => document.id === result.id
    );
    const selectedDocument = selectedDocumentArray[0];
    const formattedDocument = {
      title: selectedDocument.title,
      content: selectedDocument.content,
      access: selectedDocument.access,
      id: selectedDocument.id,
      ownerId: selectedDocument.ownerId,
      date: selectedDocument.createdAt
    };
    this.props.actions.editDocument(formattedDocument);
    this.context.router.push('/editor');
  }

  handleSearchChange = (e, { value }) => {
    const source = this.props.documents.map(document => ({
      title: document.title,
      description: document.content.replace(/<p*[^>]*>/g, ''),
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHgAkwMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCBAcDAf/EADkQAAEEAQIDAgkLBQAAAAAAAAABAgMEBQYRBxIxIWEUQVFxcoGRobETIzI0QkaTwcLR0hUiY5Th/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAMEAQIF/8QAKhEBAAIBAgUCBQUAAAAAAAAAAAECAxESBBMhMVEiUhQyQWFxI5GhsfD/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCzWpq+Iux05KtyeeVnOxteLn5k7f2L4uHtkrNomIiGbNxNcVorMTrPhC6q1lkMTRxFmjjFV9+Z0Xg9tFje1fs+bfvO0wVm0xM9ic87YtEd/LwXWOrK31zQ1pyJ1WvY5/cjVO8nHPa7vNyR3q+t4kOjXa9pXP1vKrqq7J7dh8P4tDvO81l6t4pacT6z4dWXyS1Xfluefhr/Q+Ip9UljteaZyViKvVyrHTSuRjGOY9qq5V2RO1DzbBkrGsw9VzUtPSVmQkqAAAAAAAAAAAABUeJGZy+Cwbb2I+Ra1JUZYkkjV6xtXsRyJ5/P1LYKVvbSyWa9qxrCOysF7F4vCZi9kUyNmnZRZbTY0ZzxSL5E9iecvgmLzfHEaax/TJxMTSKZde0/wAS8eMTkZjsHZReyPJMXfu5VX8jxwve0fZbiJ6VlcMrqHD4aaKLK5GvVfMiujSZ/LzInXb2mVqfK2pMHbc1tbL0ZHOXZrWztVVVe7cCP4iuswaOyNihKsNmFjZGyNRN0RHIq9e7crhiJvESll6UmYVXLS4TUWEw8+PyeHq5SvLDZkWWRI13RP7mrsm/X4Fq78dpiYnRK00vETWerpzHI5qORUVF7UVDI1MgAAAAAAAAAAAA1MnQgyePs0bTeaGxGsb07lQ7W01mJhy0RaNJUTSiTX9KZfSeQVFv4rmrpv8AaZ1icnd2bebY1TOzLXLHaf8ASyTWb4rY5Q2u7i5HhVj7K7/KwWWRv36o5rXN/YrFNnE2iO0pVvzOGrMrrqmxZbWovqaViz7JWLzo+RjViTZFTsc1d99/cYJ7voR2VdbFGOWOazwosxzRuR7X1qkb1a5O1FRWonacdS1jX1OxBJWyelNRtikarZI5sW5zXJ40XynYmYnWHJiJjqispiNL5zRmZv4XBeB2asT1b8pUWF6Oa3m7EXyp2F8Wa++NZRyYqbZ6Ltou74fpPFWlXdz6zEd6SJsvvRSeWu28wpjnWkSmyb2AAAAAAAAAAAABQ9WIunNXYzU0e7alnajkNuiIv0Hr5l+CGjH66TT6x1hC/pvFv3Q+vMelTRGdrtT5uPKMlj9F/Iv6lL477stZ+zPNNmO8R5WizXyeT01hpMPnExMnyMb3SLE2RJEVidmzvaYrRpaW2vyw0m4fXjNli1hRmT/JQZ2+w8vTJKnEdn0MrgJvTgkb8AJXCw6ksV71fVKYxWSR8kTqKv7d0VHc3N6jsTpOrkxrCH4O2Hu0h4JKvztK1LA5PJ2836i/Ex69fKPDz6NPC9GdcAAAAAAAAAAAACN1HiYc5hbeNsInJYjVqOVN+V3VrvUuynqlppaJh4vXdWYUHKPs3eD1v+ox8t2t8xNv1c6Gbk3X1NNNdIzxp2QvE8mdU9hcHjtT8P8AA1srE6aFlWJyI16tVHNby77p6yGXpeV8fyQ8l4V6X+xDcZ6Nt/7k3tbMXQixmPr0a6yLDXjSNiyO5nbJ5V8YG2Bz/h8qUtV6txPRGW0sNTufuvw5TTm60rZnxdL2q6AZmgAAAAAAAAAAAAABWNfVY26JzqRNROeB8rtvGqbLv7iuGf1KpZYjZLHhjIkmhcVsu/LG5nseqDiI0yyYJ1xwtJJUAAc9Rf6dxnc3ozJY7fzuT/kZp78P+JZ+2b8uhGZoAAAAAAAAAAAAAAR2oaD8rgshj4nNa+1XfE1zuiK5FTdT1S220S83jdWYc2paB1vQrtrUdSRV4Gb8scc8iNTdd+nKa54jFadZqy1w5axpFmymjuISfexv+xJ/E5zsPteuXm9zJNJcQ06asj/Ff/Ec7D7Tl5vc+ppTiGn3rj/Ed/E5zcHsOXm9zLG6K1W3UuNy+XzFW4tN/jc7m5F3RUT+3vUWzY9k1rGhXDk3xa06umGRqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=',
      price: document.access,
      id: document.id
    }));
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 500);
  }
  /**
   * @returns {Object} Jsx
   * @memberOf DocumentSearch
   */
  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
      />
    );
  }
}

DocumentSearch.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired
};

DocumentSearch.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state) => {
  const { documents } = state.manageDocuments;
  return {
    documents
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentSearch);
