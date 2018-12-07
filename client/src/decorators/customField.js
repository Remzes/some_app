import React from 'react'
import { Input } from 'antd'

export default ({ input, meta, ...rest }) => (
  <div className="input-row">
    <Input {...input} type={rest.type} placeholder={rest.placeholder}/>
    {meta.touched && meta.error &&
    <span className="error">{meta.error}</span>}
  </div>
)
