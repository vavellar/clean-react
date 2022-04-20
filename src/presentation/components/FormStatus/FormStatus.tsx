import React from 'react'
import Styles from './FormStatus-styles.scss'
import Spinner from '@/presentation/components/Spinner/Spinner'

const FormStatus: React.FC = () => {
    return (
      <div className={Styles.errorWrap}>
        <Spinner />
        <span className={Styles.error}>Erro</span>
      </div>
    )
}

export default FormStatus