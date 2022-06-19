import { Checkbox, EmptySearchResult, IndexTable, Stack, useIndexResourceState } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import TablePagination from './TablePagination';
import TableRow from './TableRow';

const EmptyProductList = (
    <EmptySearchResult
        title='No products yet'
        description={'Try changing the filters or search term'}
        withIllustration
    />
)

const TableBody = ({
    taggedWith,
    queryValue,
    sortValue,
    handleChangeModal
}) => {
    const products = [
        {
            id: '3417',
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            orders: 20,
            amountSpent: '$2,400',
        },
    ];

    const resourceName = {
        singular: 'product',
        plural: 'products',
    };

    // handle header checkbox
    const [checked, setChecked] = useState(false);
    const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(products);

    // // promoted and bulk actions
    // const promotedBulkActions = [
    //     {
    //         content: 'Edit customers',
    //         onAction: () => console.log('Todo: implement bulk edit'),
    //     },
    // ];

    // const bulkActions = [
    //     {
    //         content: 'Add tags',
    //         onAction: () => console.log('Todo: implement bulk add tags'),
    //     },
    //     {
    //         content: 'Remove tags',
    //         onAction: () => console.log('Todo: implement bulk remove tags'),
    //     },
    //     {
    //         content: 'Delete customers',
    //         onAction: () => console.log('Todo: implement bulk delete'),
    //     },
    // ];

    const tableColumnsType = [
        {
            title: <Checkbox
                checked={checked}
                value={checked}
                onChange={handleChange} />
        },
        { title: 'Product' },
        { title: 'Status' },
        { title: 'Edit' },
        { title: 'Analytic' },
    ]

    useEffect(() => {
        console.log("API hIt")
    }, [
        taggedWith,
        queryValue,
        sortValue,
    ])

    return (
        <div className='all-products-table-body'>
            <IndexTable
                resourceName={resourceName}
                itemCount={products.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                // hasMoreItems
                // bulkActions={bulkActions}
                // promotedBulkActions={promotedBulkActions}
                // lastColumnSticky
                // loading
                selectable={false}
                emptyState={EmptyProductList}
                headings={tableColumnsType}
            >
                {products.map((product, index) => (<TableRow key={index} data={product} selectedResources={selectedResources} handleChangeModal={handleChangeModal} />))}

            </IndexTable>

            <Stack distribution='center'>
                <div style={{ margin: "10px 0 20px" }}>
                    <TablePagination />
                </div>
            </Stack>
        </div>
    )
}

export default TableBody