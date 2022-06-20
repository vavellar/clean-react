import { Navigate, RouteProps,  } from "react-router-dom"
import React, { ReactNode } from 'react'

interface Props {
  accessToken?: string
  children?: any
}

const PrivateRoute: React.FC<Props> = ({ accessToken, children}) => {
    if (!accessToken) {
      return <Navigate to="/login" replace />
    }
    return children
    
}
export default PrivateRoute