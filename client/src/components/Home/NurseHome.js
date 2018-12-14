import React from 'react'
import { Link } from 'react-router-dom'

class NurseHome extends React.Component {

    render() {
        return (
            <div className="nurse-home">
                <h4>Please, choose what you want to do today</h4>
                <ul>
                    <li><Link to="/patients/add">Add New Patient</Link></li>
                    <li><Link to="/patients/list">View patient list</Link></li>
                    <li><Link to="/tips">Add motivational tips</Link></li>
                </ul>
            </div>
        )
    }
}

export default NurseHome
