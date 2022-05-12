import FormContext from '@/presentation/contexts/form/FormContext'
import React, { useContext } from 'react'

type Props = {
    label: string
}

const SubmitButton: React.FC<Props> = ({ label }) => {
  const { state } = useContext(FormContext)  
  return (
    <button data-testid="submit"  disabled={state.isFormInvalid}>
      {label}
    </button>
  )
}

export default SubmitButton