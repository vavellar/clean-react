import React, { useContext } from 'react'
import Styles from './FormStatus-styles.scss'
import { Spinner } from '@/presentation/components'
import formContext from '@/presentation/contexts/form/formContext'

const FormStatus: React.FC = () => {
  const { state } = useContext(formContext)
  const { isLoading, errorMessage } = state
    return (
      <div data-testid="error-wrap" className={Styles.errorWrap}>
        {isLoading && <Spinner />}
        {errorMessage && <span data-testid="error-message" className={Styles.error}>{errorMessage}</span>}
      </div>
    )
}

export default FormStatus