import React, { Component } from 'react';
import LogoutButton from './LogoutButton';

class Aside extends Component {
  render() {
    return (
      <aside className="aside-menu">
        <LogoutButton />
      </aside>
    )
  }
}

export default Aside;
