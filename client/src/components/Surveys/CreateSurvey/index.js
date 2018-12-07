import React from 'react'
import { Steps, Button, message, Row, Col } from 'antd'
import {Form, reduxForm} from 'redux-form'
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import connect from "react-redux/es/connect/connect";
import { submitSurvey } from '../../../action'
const Step = Steps.Step

const steps = [
    {
        title: "First",
        content: <StepOne />
    },
    {
        title: "Second",
        content: <StepTwo/>
    },
    {
        title: "Third",
        content: <StepThree />
    }
];

class CreateSurvey extends React.Component {
    state = {
        current: 0
    }

    next() {
        const current = this.state.current + 1
        this.setState({ current })
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const current = this.state.current
        const { handleSubmit } = this.props
        return (
            <Row>
                <Form onSubmit={handleSubmit(values => this.props.submitSurvey(values))}>
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                    <Col className="steps-action">
                        {
                            current < steps.length - 1
                            && <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                            current === steps.length - 1
                            && <button type="submit" onClick={() => message.success('Processing complete!')}>Submit</button>
                        }
                        {
                            current > 0
                            && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )
                        }
                    </Col>
                </Form>
            </Row>
        )
    }
}

export default connect(null, { submitSurvey })(
    reduxForm({
        form: 'newSurvey'
    })(CreateSurvey)
);
