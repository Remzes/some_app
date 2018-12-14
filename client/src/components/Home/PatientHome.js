import React from 'react'
import { Link } from 'react-router-dom'

class NurseHome extends React.Component {

    render() {
        return (
            <div className="patient-home">
                <h4>Please, choose what you want to do today</h4>
                <ul>
                    <li><Link to="/patients/add">Create Emergency Alerts</Link></li>
                    <li><Link to="/patients">List motivational tips</Link></li>
                    <li><Link to="/tips">Some checklist</Link></li>
                </ul>
            </div>
        )
    }
}

export default NurseHome
