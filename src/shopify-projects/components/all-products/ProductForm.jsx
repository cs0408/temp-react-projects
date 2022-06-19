import React, { useState, forwardRef, useImperativeHandle, } from 'react'
import { ModalSection } from '../modals/Modal'
import Form from '../Form'
import { Inventory, Media, Options, Pricing, ProductOrganization, Status, TitleDescription, Variants } from './form/form'


const ProductForm = forwardRef(({ product }, _ref) => {
    const [titleDescription, setTitleDescription] = useState({
        title: "",
        description: ""
    })

    const [media, setMedia] = useState([])

    const [pricing, setPricing] = useState({
        price: "",
        compareAtPrice: "",
        costPerItem: "",
        margin: "",
        profit: ""
    })

    const [inventory, setInventory] = useState({
        sku: "",
        barcode: ""
    })

    const [options, setOptions] = useState({
        flag: false,
        optionAvailable: [
            { value: "size", label: "Size" },
            { value: "color", label: "Color" },
            { value: "material", label: "Material" },
        ],
        optionNotAvailable: [],
        optionsList: []
    })

    const [variants, setVariants] = useState([
        //     {
        //     title: "30 / Red / Casual",
        //     price: "234",
        //     quantity: "23",
        //     sku: "3456",
        //     barcode: "BARG",
        //     costItem: 4533,
        //     margin: "",
        //     profit: ""
        // }
    ])

    const [organization, setOrgaization] = useState({
        vendor: "",
        collection: "",
        collectionList: [],
        tag: "",
        tagList: []
    })

    const [status, setStatus] = useState("draft")

    function handleFormInput(type, value) {
        console.log(type, "=", value)
        switch (type) {
            case "title":
                return setTitleDescription((states) => { return { ...states, title: value } })

            case "description":
                return setTitleDescription((states) => { return { ...states, description: value } })

            case "price":
                return setPricing((states) => { return { ...states, price: value } })

            case "compareAtPrice":
                return setPricing((states) => { return { ...states, compareAtPrice: value } })

            case "costPerItem":
                return setPricing((states) => { return { ...states, costPerItem: value } })

            case "sku":
                return setInventory((states) => { return { ...states, sku: value } })

            case "barcode":
                return setInventory((states) => { return { ...states, barcode: value } })

            case "options-flag":
                return setOptions((states) => {
                    return {
                        ...states,
                        flag: states.flag ? false : true,
                        optionsList: states.flag ? [] : [
                            {
                                option: "",
                                optionError: "",
                                values: [{ value: "", valueError: "" }]
                            }
                        ]
                    }
                })

            case "add-option":
                return setOptions((states) => {
                    return {
                        ...states,
                        optionsList: [
                            ...states.optionsList,
                            {
                                option: "",
                                optionError: "",
                                values: [{ value: "", valueError: "" }]
                            }]
                    }
                })

            case "edit-option-input":
                return

            case "edit-option-selection":
                var { inputValue, optionIndex } = value

                // update option
                const selectedValue = inputValue.map((selectedItem) => {
                    const matchedOption = options.optionAvailable.find((option) => {
                        return option.value.match(selectedItem);
                    });
                    return matchedOption && matchedOption.label;
                });

                var options_list = [...options.optionsList]



                // check option is already in used or not
                const filterSameOption = options_list.filter((option, index) => {
                    if (option.option === selectedValue[0]) {
                        return { ...option, option_index: index }
                    }
                })

                options_list[optionIndex].option = selectedValue[0]
                options_list[optionIndex].optionError = ""

                filterSameOption.map(() => options_list[optionIndex].optionError = selectedValue[0])

                return setOptions((states) => {
                    return {
                        ...states,
                        optionNotAvailable: selectedValue,
                        optionsList: options_list
                    }
                })

            default:
                return
        }
    }

    function handleFormInputKey(type, key) {
        console.log(type, "==", key)
    }

    // use ref
    useImperativeHandle(_ref, () => ({
        getFormState: () => {
            return {
                titleDescription, media, pricing, inventory, options, variants, organization, status
            }
        }
    }))

    return (
        <ModalSection>
            <Form>
                <TitleDescription titleDescription={titleDescription} handleFormInput={handleFormInput} />

                <Media media={media} setMedia={setMedia} />

                <Pricing pricing={pricing} handleFormInput={handleFormInput} />

                <Inventory inventory={inventory} handleFormInput={handleFormInput} />

                <Options options={options} handleFormInput={handleFormInput} />

                {options.flag && options.optionsList.length > 0 && <Variants variants={variants} handleFormInput={handleFormInput} />}

                <ProductOrganization organization={organization} handleFormInput={handleFormInput} handleFormInputKey={handleFormInputKey} />

                <Status status={status} setStatus={setStatus} />
            </Form>
        </ModalSection>
    )
})

export default ProductForm