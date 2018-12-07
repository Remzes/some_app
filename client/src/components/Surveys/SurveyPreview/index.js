import React from 'react'
import { List } from 'antd'
import { withRouter } from 'react-router-dom'
const Item = List.Item

class SurveyPreview extends React.Component {
    render() {
        // console.log(this.props.history.location.state.survey)
        const { title, numberOfQuestions, questions } = this.props.history.location.state.survey
        console.log(title, numberOfQuestions, questions)
        return (
            <div className="Survey-survey">
                <p>
                    Title: {title}
                </p>
                <p>
                    Number of questions: {numberOfQuestions}
                </p>
                <h4>Questions</h4>
                <List
                  dataSource={questions}
                  renderItem={(q, i) => (
                      <Item>
                          <p>{i}: {q.name}</p>
                          <List
                            dataSource={q.answers}
                            renderItem={(a, j) => (
                                <Item>{j}: {a.text}</Item>
                            )}
                          />
                      </Item>
                  )}
                />
            </div>
        )
    }
}

export default withRouter(SurveyPreview)
