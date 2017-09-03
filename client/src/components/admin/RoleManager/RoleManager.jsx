import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';
import ModalContainer from 'react-mf-modal/container';
import ModalService from 'react-mf-modal';
import { Backdrop } from 'react-mf-modal/themes/materialize';
import PropTypes from 'prop-types';
import { loadRoles } from '../../../actions/roleActions';
import Modal from './Modal';
import Nav from '../../Nav';
import RoleContainer from './RoleContainer';

/**
 * @class RoleManager
 * @extends {Component}
 */
class RoleManager extends Component {
  /**
   * Hook Method
   * @returns {none} none
   * @memberOf RoleManager
   */
  componentWillMount() {
    if (this.props.user.roleId === 1) {
      this.props.loadRoles();
    } else {
      localStorage.removeItem('jwtToken');
      browserHistory.push('/login');
    }
  }

   handleModal = () => {
     ModalService.open(<Modal />);
   }
  /**
   * @returns {Object} Jsx
   * @memberOf RoleManager
   */
   render() {
     return (
       <div>
         <Nav />
         <div>
           <Row>
             <Col m={1} />
             <Col m={10}>

               <RoleContainer data={this.props.roles} />
               <ModalContainer backdropComponent={Backdrop}>
                 <a // eslint-disable-line
                   onClick={this.handleModal}
                   className="btn-floating btn-large waves-effect waves-light red"
                 >
                   <i
                     className="material-icons"
                     data-tool-tip="add new role"
                   >add</i>
                 </a>
               </ModalContainer>
             </Col>
             <Col m={1} />
           </Row>
         </div>
       </div>
     );
   }
}
RoleManager.propTypes = {
  user: PropTypes.object.isRequired,
  loadRoles: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user,
  roles: state.manageRoles.roles
});

export default connect(mapStateToProps,
  { loadRoles })(RoleManager);
