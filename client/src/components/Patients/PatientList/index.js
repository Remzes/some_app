import React from 'react'
import { connect } from 'react-redux'
import { Table, Spin } from 'antd'
import { getPatients } from '../../../action'

class PatientList extends React.Component {

    componentDidMount() {
        this.props.getPatients()
    }

    renderColumns = () => {
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: 'Body Temp',
                dataIndex:'bodyTemperature',
                key: 'bodyTemperature',
                render: item => <span>{item || 'N/A'}</span>
            },
            {
                title: 'Heart Rate',
                dataIndex:'heartRate',
                key: 'heartRate',
                render: item => <span>{item || 'N/A'}</span>
            }
        ]
    }

    render() {
        const { fetching, fetched, list } = this.props.patients
        if (fetching && !fetched) return <Spin spinning={true}/>
        return (
            <div className="patient-list">
                <h2>Your patient list</h2>
                <Table dataSource={list} columns={this.renderColumns()} />
            </div>
        )
    }
}

export default connect(state => ({ patients: state.patients }), { getPatients })(PatientList)
