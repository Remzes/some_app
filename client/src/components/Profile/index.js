import React from 'react'
import { connect } from 'react-redux'
import { getSurveys } from "../../action";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getSurveys()
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="profile">
        { <h2>Welcome back, {currentUser.user.username}</h2> }
      </div>
    )
  }
}

export default connect(state => ({ currentUser: state.currentUser }), { getSurveys })(Profile)
