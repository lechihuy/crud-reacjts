import React from 'react';

class UserModal extends React.Component {
  constructor(props) {
    super(props);

    this.defaultCheckedRoleId = this.props.roles[0].id;
  }

  onChangeFullname = e => {
    const user = this.props.user;
    user.fullname = e.target.value;

    this.setState({user})
  }

  onChangeAge = e => {
    const user = this.props.user;
    user.age = parseInt(e.target.value);

    this.setState({user})
  }

  onChangeRoleId = e => {
    const user = this.props.user;
    user.roleId = parseInt(e.target.value);

    this.setState({user})
  }

  onChangeStatus = e => {
    const user = this.props.user;
    user.status = e.target.checked ? 1 : 0;

    this.setState({user})
  }

  refreshMsg() {
    document.getElementById('msg-fullname').innerHTML = '';
    document.getElementById('msg-age').innerHTML = '';
  }

  validateFullname = (fullname) => {
    if (fullname === '') {
      document.getElementById('msg-fullname').innerHTML = 'Please enter a fullname.';
      return false;
    } else if (this.props.users.find(user => user.fullname === fullname && user.id !== this.props.user?.id)) {
      document.getElementById('msg-fullname').innerHTML = 'The fullname is used.';
      return false;
    } else {
      document.getElementById('msg-fullname').innerHTML = '';
    }
  }

  validateAge(age) {
    if (age === '') {
      document.getElementById('msg-age').innerHTML = 'Please enter a age.';
      return false;
    } else if (! Number.isInteger(age) ||  age < 1) {
      document.getElementById('msg-age').innerHTML = 'Please enter a positive integer for age.';
      return false;
    } else {
      document.getElementById('msg-age').innerHTML = '';
    }
  }

  onSubmit = () => {
    const {fullname, age, roleId, status} = this.props.user;
    const users = this.props.users;
    const id = this.props.user.id 
                ? this.props.user.id 
                : this.props.users.length > 0 
                ? Math.max.apply(Math, users.map(user => user.id)) + 1
                : 1;

    let isValidated = true;
    isValidated = this.validateFullname(fullname) ?? isValidated;
    isValidated = this.validateAge(age) ?? isValidated;
    if (! isValidated) return false;

    if (this.props.user.id) {
      this.props.updateUser(id, {id, fullname, age, roleId, status})
    } else {
      this.props.addNewUser({id, fullname, age, roleId, status}); 
    }
    this.onHideUserModal();
  }

  onHideUserModal = () => {
    this.refreshMsg();
    this.props.onHideUserModal();
    this.props.refreshUserModel();
  }

  render() {
    let modalClass, overlayClass;

    if (this.props.isShow) {
      modalClass = 'opacity-100 translate-y-0 sm:scale-100';
      overlayClass = 'opacity-100';
    } else {
      modalClass = 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95';
      overlayClass = 'opacity-0';
    }

    const roleRadios = this.props.roles.map(role => {
      return (
        <label className="inline-block mr-3" key={role.id}>
          <input type="radio" name="roleId" value={role.id}
            checked={this.props.user.roleId === role.id}
            onChange={this.onChangeRoleId}
          /> {role.name}
        </label>
      );
    })

    const user = this.props.user;

    return (
      <div className={"fixed inset-0 overflow-y-auto " + (!this.props.isShow && "pointer-events-none")}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className={"fixed inset-0 transition-opacity " + overlayClass} aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​&#8203;</span>
          <div className={"inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full " + modalClass} role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className="bg-gray-50 px-4 py-3 sm:px-6">
              <h3 className="font-medium text-gray-500 uppercase tracking-wider">
                {user.id ? 'Edit user' : 'Add new user'}
              </h3>
            </div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-3">
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">Fullname</label>
                <input type="text" className="px-2 py-1 rounded border w-full" id="fullname"
                  value={this.props.user.fullname}
                  onChange={this.onChangeFullname}
                />
                <span className="text-red-700 text-xs" id="msg-fullname"></span>
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input type="number" className="px-2 py-1 rounded border w-full" id="age" min="1"
                  value={this.props.user.age}
                  onChange={this.onChangeAge}
                />
                <span className="text-red-700 text-xs" id="msg-age"></span>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                {roleRadios}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <label>
                  <input type="checkbox"
                    checked={this.props.user.status}
                    onChange={this.onChangeStatus}
                  /> Active
                </label>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-end">
              <button type="button" className="w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-gray-700 font-medium sm:ml-3 sm:w-auto sm:text-sm"
                onClick={this.onHideUserModal}
              >
                Cancel
              </button>
              <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={this.onSubmit}
              >
                {user.id ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserModal;