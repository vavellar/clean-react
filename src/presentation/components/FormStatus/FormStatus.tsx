import React, { useContext } from 'react'
import Styles from './FormStatus-styles.scss'
import { Spinner } from '@/presentation/components'
import formContext from '@/presentation/contexts/form/formContext'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(formContext)
    return (
      <div data-testid="error-wrap" className={Styles.errorWrap}>
        {isLoading && <Spinner />}
        {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
      </div>
    )
}

export default FormStatus