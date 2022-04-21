import React from 'react'
import { render } from '@testing-library/react'
import Login from './Login'

describe('Login component', () => {
    it('Should start with inital state', () => {
        const { getByTestId } = render(<Login/>)
        const errorWrap = getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)

    });
});