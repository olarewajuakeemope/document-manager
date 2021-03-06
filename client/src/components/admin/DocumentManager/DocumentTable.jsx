import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter } from 'material-ui/Table';
import { Card, CardHeader } from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Search } from 'semantic-ui-react';
import SortIcon from 'material-ui/svg-icons/action/swap-vert';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import FlatButton from 'material-ui/FlatButton';
import { sortFunc, processTableData } from '../../../utils';
import * as documentActions from '../../../actions/documentActions';


/**
 * @class DocTable
 * @extends {Component}
 */
export class DocumentTable extends Component {
  /**
   * Creates an instance of DocTable.
   * @param {Object} props
   * @memberOf DocumentTable
   */
  constructor(props) {
    super(props);

    this.state = {
      isAsc: true,
      sortHeader: null,
      offset: 0,
      limit: props.limit,
      page: [],
      processedData: [],
      showButtons: false
    };

    this.paginate = this.paginate.bind(this);
    this.paginateBack = this.paginateBack.bind(this);
    this.paginateForward = this.paginateForward.bind(this);
    this.sortByColumn = this.sortByColumn.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // this.handleSelectedDocument = this.handleSelectedDocument.bind(this);
  }
  /**
   * @returns {Object} Jsx
   * @memberOf UserSearch
   */
  componentWillMount() {
    this.resetComponent();
  }
  /**
   * Hook Method
   * @param {Object} nextProps
   * @returns {none} updates state before component mounts
   * @memberOf DocumentTable
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      page: nextProps.data
        ? nextProps.data.slice(this.state.offset, nextProps.limit)
        :
        [],
    });
    const processedData = processTableData(nextProps.data);
    this.setState({
      processedData
    });
  }

  /**
   * Function that responds to click events to return sorted data
   * @param {Object} e: browser event
   * @returns {Object} updated state of sorted data
   * @memberOf DocumentTable
   */
  sortByColumn(e) {
    e.preventDefault();
    const sortHeader = e.target.id;
    if (sortHeader.length < 1) {
      return;
    }
    const { data, limit } = this.state;
    const isAsc = this.state.sortHeader === sortHeader ?
      !this.state.isAsc : true;
    const sortedData = data.sort((a, b) => sortFunc(a, b, sortHeader));
    if (!isAsc) {
      sortedData.reverse();
    }
    this.setState({
      page: sortedData.slice(0, limit),
      data: sortedData,
      sortHeader,
      offset: 0,
      isAsc
    });
    const { page } = this.state;
    const processedData = processTableData(page);
    this.setState({
      processedData
    });
  }
  /**
   * Function that handles deletion of documents
   * @param {Number} id - userId
   * @param {Function} callback - to delete user after prompt
   * @returns {Function} callback
   * @memberOf DocumentTable
   */
  handleDelete(id, callback) { //eslint-disable-line
    swal({  //eslint-disable-line
      title: 'Are you sure?',
      text: 'This Document will be totally deleted!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: true
    },
    () => {
      callback(id);
    });
  }

  /**
   * Function to handle Updates on document
   * @param {Object} document - userId
   * @returns {Function} callback
   * @memberOf DocumentTable
   */
  handleEdit(document) {
    const formattedDocument = {
      title: document.title,
      content: document.content,
      access: document.access,
      id: document.id,
      ownerId: document.ownerId,
      date: document.createdAt
    };
    this.props.actions.editDocument(formattedDocument);
    this.context.router.push('/editor');
  }

  /**
   * Function that paginates data in an array
   * @param {Number} offset
   * @param {Number} limit
   *@returns {none} updates state with new paginated data
   * @memberOf DocumentTable
   */
  paginate(offset, limit) {
    this.setState({
      page: this.state.data.slice(offset, offset + limit),
      offset,
    });
    const { page } = this.state;
    const processedData = processTableData(page);
    this.setState({
      processedData
    });
  }

  /**
   * Functions to move to a previous page
   * @param {none} none
   * @returns {none} none
   * @memberOf DocumentTable
   */
  paginateBack() {
    const { offset, limit } = this.state;
    this.paginate(offset - limit, limit);
  }

  /**
   * Functions to move to a new page
   * @param {none} none
   * @returns {none} none
   * @memberOf DocumentTable
   */
  paginateForward() {
    const { offset, limit } = this.state;
    this.paginate(offset + limit, limit);
  }
  resetComponent = () => {
    const { page } = this.state;
    const processedData = processTableData(page);

    this.setState({
      isLoading: false,
      value: '',
      processedData
    });
  }
  /**
   * Functions to move to a new page
   * @param {Object} e
   * @param {Object} state
   * @returns {none} none 
   * @memberOf UserTable
   */
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      const { page } = this.state;
      const processedData = processTableData(page);
      this.setState({
        processedData: _.filter(processedData, isMatch)
      });

      this.setState({
        isLoading: false
      });
    }, 500);
  }
  /**
   * @returns {Object} Jsx
   * @memberOf DocumentTable
   */
  render() {
    const { isLoading, value } = this.state;
    const { total, tableHeaders } = this.props;
    const { offset, limit, processedData } = this.state;

    return (
      <Card
        style={{ margin: '10px 50px' }}
      >
        <CardHeader
          title="Documents"
          titleStyle={{ fontSize: '2em', color: 'white' }}
          style={{ backgroundColor: 'rgb(0, 188, 212)', overflow: 'auto' }}
        >
          <span style={{ float: 'right' }}>
            <Search
              loading={isLoading}
              onSearchChange={this.handleSearchChange}
              open={false}
              value={value}
              style={{ display: 'inline-block', marginRight: '50px' }}
            />
          </span>

        </CardHeader>
        <div>
          <Table className="table" displaySelectAll={false}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                { tableHeaders && tableHeaders.map((header, index) => (
                  <TableHeaderColumn key={index} >
                    <div className="rowAlign">
                      { header.alias }
                      { header.sortable &&
                        <SortIcon
                          id={header.dataAlias}
                          className="sortIcon"
                          onMouseUp={this.sortByColumn}
                        />
                      }
                    </div>
                  </TableHeaderColumn>
                )) }
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.map((row, index) => (
                <TableRow key={`${index} ${row.id}`}>
                  <TableRowColumn key={`${row.id} ${row.id}`}>
                    {row.id}
                  </TableRowColumn>
                  <TableRowColumn key={`${row.id} ${row.title}`}>
                    {row.title}
                  </TableRowColumn>
                  <TableRowColumn key={`${row.id} ${row.access}`}>
                    {row.access}
                  </TableRowColumn>
                  <TableRowColumn key={`${row.id} ${row.ownerRoleId}`}>
                    {row.ownerRoleId === 1 ? 'Admin' : 'Regular'}
                  </TableRowColumn>
                  <TableRowColumn key={`${row.id} ${row.ownerRoleId}`}>
                    <FlatButton
                      key={`${index}flat${row.id}`}
                      label="Delete"
                      secondary
                      onTouchTap={
                        () => {
                          this.handleDelete(
                            row.id,
                            this.props.actions.deleteDocumentById
                          );
                        }
                      }
                    />
                  </TableRowColumn>
                  <TableRowColumn key={`${row.id} ${row.ownerRoleId}`}>
                    <FlatButton
                      key={`${index}flat${row.id}`}  // eslint-disable-line
                      label="Edit"
                      secondary
                      onTouchTap={
                        () => {
                          this.handleEdit(row);
                        }
                      }
                    />
                  </TableRowColumn>
                </TableRow>
              ))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableRowColumn>
                  <div className="footerControls">
                    { `${Math.min((offset + 1), total)}
                    - ${Math.min((offset + limit), total)} of ${total}` }
                    <IconButton
                      disabled={offset === 0}
                      onClick={this.paginateBack}
                    >
                      <ChevronLeft />
                    </IconButton>
                    <IconButton
                      disabled={offset + limit >= total}
                      onClick={this.paginateForward}
                    >
                      <ChevronRight />
                    </IconButton>
                  </div>
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Card>
    );
  }
}

DocumentTable.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

DocumentTable.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state) => {
  const { documents } = state.manageDocuments;
  return {
    data: documents,
    total: documents.length
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTable);
