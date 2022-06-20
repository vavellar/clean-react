import { Navigate, RouteProps,  } from "react-router-dom"
import React, { ReactNode, useContext } from 'react'
import { ApiContext } from "@/presentation/contexts"

interface Props {
  accessToken?: string
  children?: any
}

const PrivateRoute: React.FC<Props> = ({children}) => {
    const { getCurrentAccount } = useContext(ApiContext)
    return getCurrentAccount()?.accessToken ? children : <Navigate to="/login" replace />
    
}
export default PrivateRoute