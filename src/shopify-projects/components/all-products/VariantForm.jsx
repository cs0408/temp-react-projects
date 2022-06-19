import { Grid, Icon, TextField, Tooltip } from '@shopify/polaris'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestionMarkMajor, } from "@shopify/polaris-icons";
import { CardSection } from '../Card'
import { FormSection } from '../Form'

const VariantForm = forwardRef((variant, _ref) => {
    const [variantStates, setVariantStates] = useState({
        price: "",
        sku: "",
        barcode: "",
        costPerItem: "",
        margin: "",
        profit: "",
    })

    const handleForm = (type, e) => {
        setVariantStates((states) => {
            return {
                ...states,
                [type]: e
            }
        })
    }

    // 
    useEffect(() => {
        setVariantStates({
            ...variant.variant
        })
    }, [])

    // use ref
    useImperativeHandle(_ref, () => ({
        getVariantFormState: () => {
            return { ...variantStates }
        }
    }))

    return (
        <>
            <CardSection>
                <FormSection>
                    <TextField
                        type="text"
                        label="Price"
                        prefix="$"
                        placeholder="0.00"
                        value={variantStates.price}
                        onChange={(e) => handleForm("price", e)}
                    />
                    <TextField
                        type="text"
                        label="Cost per item"
                        prefix="$"
                        placeholder="0.00"
                        suffix={
                            <Tooltip
                                content="To show a reduced price, move the product's original price into Compare at price. Enter a lower value into Price."
                                dismissOnMouseOut
                            >
                                <Icon source={QuestionMarkMajor} color="base" />
                            </Tooltip>
                        }
                        value={variantStates.costPerItem}
                        onChange={(e) => handleForm("costPerItem", e)}
                        helpText="Customers won’t see this"
                    />
                </FormSection>
            </CardSection>
            <CardSection title="Inventory">
                <FormSection>
                    <Grid>
                        <Grid.Cell columnSpan={{ xs: 6, md: 3, lg: 6 }}>
                            <TextField
                                type="text"
                                label="SKU (Stock Keeping Unit)"
                                value={variantStates.sku}
                                onChange={(e) => handleForm("sku", e)}
                            />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, md: 3, lg: 6 }}>
                            <TextField
                                type="text"
                                label="Barcode (ISBN, UPC, GTIN, etc.)"
                                value={variantStates.barcode}
                                onChange={(e) => handleForm("barcode", e)}
                            />
                        </Grid.Cell>
                    </Grid>
                </FormSection>
            </CardSection>
        </>
    )
})

export default VariantForm