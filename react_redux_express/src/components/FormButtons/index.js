import React from 'react'

export default ({pristine, submitting}) => {
  return <div className="buttons">
    <button type="submit" disabled={pristine || submitting}>
      Submit
    </button>
    <button type="button" disabled={pristine || submitting}>
      Clear Values
    </button>
  </div>
}