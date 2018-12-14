import React from 'react'
import { Button } from 'antd'

export default ({pristine, submitting}) => {
  return <div className="buttons" style={{ marginTop: '15px' }}>
    <Button htmlType="submit" disabled={submitting}>
      Submit
    </Button>
    <Button type="primary" htmlType="button" disabled={pristine || submitting}>
      Clear Values
    </Button>
  </div>
}
