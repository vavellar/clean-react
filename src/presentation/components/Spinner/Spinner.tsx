import React from 'react'
import Styles from './Spinner-styles.scss'

const Spinner: React.FC = () => {
    return (
      <div className={Styles.spinner} data-testid="spinner">
        <div />
        <div />
        <div />
        <div />
      </div>
    )
}

export default Spinner
