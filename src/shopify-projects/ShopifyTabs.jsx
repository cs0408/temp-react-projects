import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';
import React, { useCallback, useState } from 'react';
import { AppProvider, Tabs } from '@shopify/polaris';
import Container from './components/Container';
// css
import './css/global.css'
import './css/all_products.css'
// tabs
import AllProducts from './components/tabs/AllProducts';
import Analytics from './components/tabs/Analytics';
import Plan from './components/tabs/Plan';

const ShopifyTabs = () => {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'all-products-1',
            content: 'All products',
            accessibilityLabel: 'All products',
            panelID: 'all-products-1',
            component: <AllProducts />
        },
        {
            id: 'analytics-2',
            content: 'Aalytics',
            panelID: 'analytics-2',
            component: <Analytics />
        },
        {
            id: 'plan-3',
            content: 'Subscription plan',
            panelID: 'plan-3',
            component: <Plan />
        },
    ];

    return (
        <AppProvider i18n={enTranslations}>
            <Tabs
                tabs={tabs}
                selected={selected}
                onSelect={handleTabChange}
                disclosureText="More views"
            />
            <Container>
                {tabs[selected].component}
            </Container>
        </AppProvider>
    );
}

export default ShopifyTabs
