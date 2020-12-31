import React from 'react';
import Table from './components/Table';
import UserModal from './components/UserModal';
import DeleteUserModal from './components/DeleteUserModal';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasUser: props.users.length > 0,
      users: props.users,
      isShowUserModal: false,
      isShowDeleteUserModal: false,
      filter: {
        descId: true, 
        keyword: '',
      },
      userModal: {
        fullname: '',
        age: '',
        roleId: this.props.roles[0].id,
        status: 0
      },
      willDeleteUserId: null,
    };
  }

  addNewUser = (user) => {
    const users = this.state.users;
    users.push(user);
    
    this.setState({users, hasUser: users.length > 0});
  }

  updateUser = (id, user) => {
    const users = this.state.users;
    users[users.indexOf(users.find(user => user.id === id))] = user;
    
    this.setState({users});
  }

  deleteUser = id => {
    const users = this.state.users;
    users.splice(users.indexOf(users.find(user => user.id === id)), 1);

    this.setState({users, hasUser: users.length > 0});
  }

  loadUserModel = (user) => {
    this.setState({user});
  }

  refreshUserModel = () => {
    const userModal = {
      fullname: '',
      age: '',
      roleId: this.props.roles[0].id,
      status: 0
    }

    this.setState({userModal});
  }

  onOpenUserModal = (user) => {
    this.setState({isShowUserModal: true, userModal: user});
  }

  onHideUserModal = (id) => {
    this.setState({isShowUserModal: false});
  }

  onOpenDeleteUserModal = (id) => {
    this.setState({isShowDeleteUserModal: true, willDeleteUserId: id});
  }

  onHideDeleteUserModal = () => {
    this.setState({isShowDeleteUserModal: false});
  }

  onSearch = () => {
    const filter = this.state.filter;
    filter.keyword = document.querySelector('input[name=k]').value;

    this.setState({filter});
  }

  render() {
    let users = this.state.users;
    const roles = this.props.roles;
    const filter = this.state.filter;

    return (
      <div className="App bg-gray-100 min-h-screen p-10">
        <h1 className="font-mono text-3xl text-center mb-10">CRUD made with ReactJS</h1>

        {
          this.state.hasUser
            ? 
              <div className="filterdTable">
                <div id="filter" className="mb-3 flex">
                  <input type="text" placeholder="Enter a fullname..." className="px-2 py-1 rounded" name="k"/>
                  <button className="bg-gray-50 text-gray-800 rounded px-2 ml-2 border"
                    onClick={this.onSearch}
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button className="bg-blue-400 text-white rounded px-2 ml-auto flex items-center"
                    onClick={this.onOpenUserModal.bind(this, this.state.userModal)}
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm">Add new</span>
                  </button>
                </div>
                <Table users={users} roles={roles} filter={filter}
                  onOpenUserModal={this.onOpenUserModal}
                  onOpenDeleteUserModal={this.onOpenDeleteUserModal}
                />
              </div>
            : <div className="text-center text-gray-500 py-5">
                <svg className="h-10 w-10 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                </svg> 
                <p>No data</p>
                <button className="px-3 py-2 bg-blue-400 rounded text-white mt-3"
                  onClick={this.onOpenUserModal.bind(this, this.state.userModal)}
                >Create a new</button>
              </div>
        }

        <UserModal 
          isShow={this.state.isShowUserModal} 
          onHideUserModal={this.onHideUserModal}
          users={users}
          roles={roles}
          addNewUser={this.addNewUser}
          user={this.state.userModal}
          loadUserModel={this.loadUserModel.bind(this, this.state.userModal)}
          refreshUserModel={this.refreshUserModel}
          updateUser={this.updateUser}
        />

        <DeleteUserModal
          isShow={this.state.isShowDeleteUserModal}
          onHideDeleteUserModal={this.onHideDeleteUserModal}
          deleteUser={this.deleteUser}
          userId={this.state.willDeleteUserId}
        />
      </div>
    );
  }
}

export default App;
