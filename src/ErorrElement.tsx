import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErorrElement = () => {
    const error = useRouteError()
    console.log(error)
  return (
    <div>ErorrElement</div>
  )
}

export default ErorrElement