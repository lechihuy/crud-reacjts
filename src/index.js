import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const ROLES = [
  {
    id: 1,
    name: 'Student',
  },

  {
    id: 2,
    name: 'Teacher',
  }
];

let users = [
  {
    id: 1,
    fullname: 'Tom',
    age: 15,
    roleId: 1,
    status: 1,
  },

  {
    id: 2,
    fullname: 'Jerry',
    age: 20,
    roleId: 1,
    status: 1,
  },

  {
    id: 3,
    fullname: 'Spike',
    age: 30,
    roleId: 2,
    status: 0,
  }
];

ReactDOM.render(
  <React.StrictMode>
    <App users={users} roles={ROLES} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
