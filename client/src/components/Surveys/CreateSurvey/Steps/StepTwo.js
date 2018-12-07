import React from 'react'
import { Row, Col } from 'antd'
import { FieldArray } from 'redux-form'
import Questions from '../Questions/Questions'

class StepTwo extends React.Component {
    render() {
        return (
            <Row align="center">
                <Col span={24}>
                    <h2>Survey Questions</h2>
                    <FieldArray name="questions" component={Questions} />
                </Col>
            </Row>
        )
    }
}

export default StepTwo
