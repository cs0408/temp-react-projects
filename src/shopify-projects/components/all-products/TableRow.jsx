import { Button, Checkbox, Icon, IndexTable, Stack, TextStyle, Thumbnail, } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { ImageMajor, EditMinor, AnalyticsMinor } from '@shopify/polaris-icons';
import { Switch } from '@mui/material';

const TableRow = ({ data, selectedResources, handleChangeModal, index }) => {
    const [checkBox, setCheckBox] = useState(false);
    const [toggle, setToggle] = useState(false)
    const handleChange = useCallback((newChecked) => setCheckBox(newChecked), []);

    return (
        <IndexTable.Row
        >
            <IndexTable.Cell >
                <Checkbox
                    checked={checkBox}
                    value={checkBox}
                    onChange={handleChange}
                    selected={selectedResources.includes(data.id)}
                    position={index}
                />
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Stack alignment='center'>
                    <Thumbnail
                        source={ImageMajor}
                        alt="Black choker necklace"
                        size="small"
                    />
                    <TextStyle variation="strong">{data.name}</TextStyle>
                </Stack>
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Switch
                    checked={toggle}
                    onChange={() => setToggle(!toggle)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Button icon={EditMinor} disabled={!toggle && true} onClick={() => handleChangeModal("product-edit", data)} />
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Button icon={AnalyticsMinor} disabled={!toggle && true} onClick={() => handleChangeModal("product-analytic", data)} />
            </IndexTable.Cell>
        </IndexTable.Row>
    )
}

export default TableRow