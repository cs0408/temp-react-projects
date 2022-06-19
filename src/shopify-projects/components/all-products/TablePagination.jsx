import { Pagination } from '@shopify/polaris';
import React from 'react'

const TablePagination = () => {
    return (
        <Pagination
            hasPrevious
            onPrevious={() => {
                console.log('Previous');
            }}
            hasNext
            onNext={() => {
                console.log('Next');
            }}
        />
    )
}

export default TablePagination