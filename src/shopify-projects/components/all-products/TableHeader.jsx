import { Filters, Select, TextField, } from '@shopify/polaris'
import React, { useCallback, } from 'react'

const TableHeader = ({
    taggedWith,
    setTaggedWith,
    queryValue,
    setQueryValue,
    sortValue, setSortValue
}) => {

    const handleTaggedWithChange = useCallback(
        (value) => setTaggedWith(value),
        [],
    );

    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);

    const handleClearAll = useCallback(() => {
        handleTaggedWithRemove();
        handleQueryValueRemove();
    }, [handleQueryValueRemove, handleTaggedWithRemove]);

    const handleSortChange = useCallback((value) => setSortValue(value), []);

    const filters = [
        {
            key: 'taggedWith',
            label: 'Tagged with',
            filter: (
                <TextField
                    label="Tagged with"
                    value={taggedWith}
                    onChange={handleTaggedWithChange}
                    autoComplete="off"
                    labelHidden
                />
            ),
            shortcut: true,
        },
    ];

    const appliedFilters = !isEmpty(taggedWith)
        ? [
            {
                key: 'taggedWith',
                label: disambiguateLabel('taggedWith', taggedWith),
                onRemove: handleTaggedWithRemove,
            },
        ]
        : [];

    const sortOptions = [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' },
    ];

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'taggedWith':
                return `Tagged with ${value}`;
            default:
                return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }

    return (
        <div style={{ padding: '16px', display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <Filters
                    queryValue={queryValue}
                    filters={filters}
                    appliedFilters={appliedFilters}
                    onQueryChange={setQueryValue}
                    onQueryClear={handleQueryValueRemove}
                    onClearAll={handleClearAll}
                />
            </div>
            <div style={{ paddingLeft: '1rem' }}>
                <Select
                    labelInline
                    label="Sort by"
                    options={sortOptions}
                    value={sortValue}
                    onChange={handleSortChange}
                />
            </div>
        </div>
    )
}

export default TableHeader