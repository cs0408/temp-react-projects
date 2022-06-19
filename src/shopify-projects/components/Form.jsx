import React from 'react'
import { Form as PolarisForm, FormLayout, } from '@shopify/polaris'

export const FormSection = ({ children, type }) => {
    return (
        <FormLayout>
            {children}
        </FormLayout>
    )
}

const Form = ({ children }) => {
    return (
        <PolarisForm autoComplete="off">{children}</PolarisForm>
    )
}

export default Form