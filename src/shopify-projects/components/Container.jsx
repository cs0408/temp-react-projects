import { Grid, Layout, Page } from '@shopify/polaris'
import React from 'react'

export const SubContainer = ({ children }) => {
    return (
        <Layout.Section>
            {children}
        </Layout.Section>
    )
}

const Container = ({ children }) => {
    return (
        <Page fullWidth>
            <Layout>
                {children}
            </Layout>
        </Page>
    )
}

export default Container