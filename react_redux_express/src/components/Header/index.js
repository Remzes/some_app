import React from 'react'
import { Menu } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../action'
import { withRouter } from 'react-router-dom'
const MenuItem = Menu.Item;

class Header extends React.Component {

  render() {
    const isAuthenticated = this.props.user && this.props.user.isAuthenticated
    return (
      <Menu mode="horizontal">
        {!isAuthenticated &&
          <MenuItem>
            <Link to="/login">Login</Link>
          </MenuItem>
        }
        {!isAuthenticated &&
          <MenuItem>
            <Link to="/register">Register</Link>
          </MenuItem>
        }
        {isAuthenticated &&
          <MenuItem>
            <a onClick={() => this.props.logoutUser(this.props.history)}>Logout</a>
          </MenuItem>
        }
        {isAuthenticated &&
        <MenuItem>
          <Link to="/profile">Profile</Link>
        </MenuItem>
        }
      </Menu>
    )
  }
}

export default withRouter(connect(state => ({ user: state.currentUser }), { logoutUser })(Header))