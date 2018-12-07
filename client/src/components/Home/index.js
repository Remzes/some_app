import React from 'react'
import { Row, Col } from 'antd'

class Home extends React.Component {
  render() {
    return (
        <Row align="middle">
          <Col span={12}>
            Welcome to our Survey app!
          </Col>
        </Row>
    )
  }
}

export default Home
