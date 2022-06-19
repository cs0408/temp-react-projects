import { Button, Card, Stack, } from '@shopify/polaris'
import React, { useState, useRef } from 'react'
import { SubContainer } from '../Container'
import Modal from '../modals/Modal';
// products page componenets
import TableHeader from '../all-products/TableHeader';
import TableBody from '../all-products/TableBody';
import ProductForm from '../all-products/ProductForm';

const AllProducts = () => {
    // create form state refrence
    const formStateRef = useRef()


    // table header states
    const [taggedWith, setTaggedWith] = useState('');
    const [queryValue, setQueryValue] = useState('');
    const [sortValue, setSortValue] = useState('all');

    // handle modal here
    const [modalDetails, setModalDetails] = useState({})
    const [active, setActive] = useState(false);
    const [modalBodyLoading, setModalBodyLoading] = useState(false)

    // handle modal show -  true false
    const handleChange = () => {
        setActive(!active)
    }

    // submit form 
    const submitForm = () => {
        const formStates = formStateRef.current.getFormState()
        console.log("States = ", formStates)
    }

    // cancel form
    const cancelForm = () => {
        handleChange()
    }

    // handle modal - title, body, buttons
    const handleChangeModal = (event, data) => {
        handleChange()
        console.log("Event = ", event)
        console.log("Data =", data)

        switch (event) {
            case "product-add":
                return setModalDetails(
                    {
                        title: "Add Product",
                        primaryAction: {
                            content: "Add Product",
                            onAction: submitForm,
                        },
                        secondaryActions: [
                            {
                                content: 'Cancel',
                                onAction: cancelForm
                            }
                        ],
                        body: <ProductForm ref={formStateRef} />
                    })

            case "product-edit":
                return setModalDetails(
                    {
                        title: "Edit Product",
                        primaryAction: {
                            content: "Update",
                            onAction: submitForm,
                        },
                        secondaryActions: [
                            {
                                content: 'Cancel',
                                onAction: cancelForm
                            }
                        ],
                        body: <ProductForm product={data} ref={formStateRef} />
                    })

            case "product-analytic":
                return setModalDetails(
                    {
                        title: "Product Analytic",
                        body: <ProductForm product={data} ref={formStateRef} />
                    })

            default:
                return
        }
    }

    return (
        <>
            <Modal active={active} loading={modalBodyLoading} handleChange={handleChange} details={modalDetails}>
                {modalDetails.body && modalDetails.body}
            </Modal>

            <SubContainer>
                <Stack distribution='trailing'>
                    <Button primary onClick={() => handleChangeModal("product-add")}>Add Product</Button>
                </Stack>
            </SubContainer>

            <SubContainer>
                <Card>
                    <TableHeader
                        taggedWith={taggedWith}
                        setTaggedWith={setTaggedWith}
                        queryValue={queryValue}
                        setQueryValue={setQueryValue}
                        sortValue={sortValue}
                        setSortValue={setSortValue}
                    />
                    <TableBody
                        taggedWith={taggedWith}
                        queryValue={queryValue}
                        sortValue={sortValue}
                        handleChangeModal={handleChangeModal}
                    />
                </Card>

            </SubContainer>
        </>
    )
}

export default AllProducts