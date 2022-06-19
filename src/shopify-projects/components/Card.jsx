import React from 'react'
import { Card as PolarisCard } from '@shopify/polaris'

export const CardSection = ({ title, children }) => {
    return (
        <PolarisCard.Section title={title}>
            {children}
        </PolarisCard.Section>
    )
}

const Card = ({ title, children }) => {
    return (
        <PolarisCard title={title}>
            {children}
        </PolarisCard>
    )
}

export default Card