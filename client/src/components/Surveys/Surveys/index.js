import React from 'react'
import { connect } from 'react-redux'
import { Spin, List } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { getSurveys } from "../../../action";
const Item = List.Item

class Surveys extends React.Component {
    componentDidMount() {
        this.props.getSurveys()
    }

    render() {
        const { fetching, fetched, errorMessage, successMessage, list = [] } = this.props.surveys
        return (
            <div className="Surveys-list">
                <h2>Your surveys</h2>
                <Spin spinning={fetching && !fetched}>
                    <List
                      dataSource={list}
                      renderItem={(item, i) => {
                          console.log(item)
                          return <Item>
                              <a onClick={() => this.props.history.push(`/surveys/${i}`, { survey: item })}>
                                  {item.title} {' '}
                                  {item.numberOfQuestions}
                              </a>
                          </Item>
                      }}
                    >
                    </List>
                </Spin>
            </div>
        )
    }
}

export default withRouter(connect(state => ({ surveys: state.surveys }), { getSurveys })(Surveys))
