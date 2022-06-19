import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  DataTable,
  Grid,
  Icon,
  Select,
  Stack,
  TextField,
  TextStyle,
  Tooltip,
} from "@shopify/polaris";
import {
  QuestionMarkMajor,
  EditMinor,
  DeleteMinor,
  PlusMinor,
} from "@shopify/polaris-icons";
import VariantForm from "../VariantForm";
import Card, { CardSection } from "../../Card";
import Modal from "../../modals/Modal";
import { FormSection } from "../../Form";
import { Sledding } from "@mui/icons-material";

export const Status = ({ status, setStatus }) => {
  return (
    <Card title="Product status">
      <CardSection>
        <Select
          options={[
            { label: "Draft", value: "draft" },
            { label: "Active", value: "active" },
          ]}
          onChange={(value) => setStatus(value)}
          value={status}
        />
      </CardSection>
    </Card>
  );
};

export const ProductOrganization = ({
  organization,
  handleFormInput,
  handleFormInputKey,
}) => {
  return (
    <Card title="Product Orgaization">
      <CardSection>
        <FormSection>
          <TextField
            type="text"
            label="Vendor"
            value={organization.vendor}
            onChange={(e) => handleFormInput("vendor", e)}
          />
          <div onKeyDown={(key) => handleFormInputKey("add-collection", key)}>
            <TextField
              type="text"
              label="Collections"
              value={organization.collection}
              onChange={(e) => handleFormInput("collection", e)}
            />
          </div>
          <div onKeyDown={(key) => handleFormInputKey("add-tag", key)}>
            <TextField
              type="text"
              label="Tags"
              value={organization.tag}
              onChange={(e) => handleFormInput("tag", e)}
            />
          </div>
        </FormSection>
      </CardSection>
    </Card>
  );
};

export const Variants = ({ variants, handleFormInput }) => {
  // form state ref
  const variantFormRef = useRef();

  // handle modal here
  const [modalDetails, setModalDetails] = useState({});
  const [active, setActive] = useState(false);

  const handleChange = () => {
    setActive(!active);
  };

  const submitVariantForm = () => {
    const variantStates = variantFormRef.current.getVariantFormState();
    handleFormInput("variant-edit", variantStates);
    handleChange();
  };

  const cancelVariantForm = () => {
    handleChange();
  };

  const handleChangeModal = (data, index) => {
    handleChange();

    setModalDetails({
      title: `Edit - ${data.title}`,
      primaryAction: {
        content: "Edit",
        onAction: () => submitVariantForm(),
      },
      secondaryActions: [
        {
          content: "Cancel",
          onAction: cancelVariantForm,
        },
      ],
      body: <VariantForm variant={{ ...data, index }} ref={variantFormRef} />,
    });
  };

  const rows = variants.map((variant, index) => {
    return [
      variant.title,
      <div className="input-150px-width">
        <TextField
          prefix="$"
          placeholder="0.00"
          value={variant.price}
          readOnly
        />
      </div>,
      <div className="input-150px-width">
        <TextField value={variant.quantity} readOnly />
      </div>,
      <div className="input-150px-width">
        <TextField value={variant.sku} readOnly />
      </div>,
      <div className="input-150px-width">
        <TextField value={variant.barcode} readOnly />
      </div>,
      <Button
        icon={EditMinor}
        onClick={() => handleChangeModal(variant, index)}
      />,

      <Button
        icon={DeleteMinor}
        onClick={() => handleFormInput("variant-delete", index)}
      />,
    ];
  });

  return (
    <Card title="Variants">
      <Modal active={active} handleChange={handleChange} details={modalDetails}>
        {modalDetails.body && modalDetails.body}
      </Modal>

      <br />
      <DataTable
        columnContentTypes={[
          "text",
          "numeric",
          "numeric",
          "numeric",
          "numeric",
          "text",
          "text",
        ]}
        headings={["Product", "Price", "Quantity", "SKU", "Barcode", "", ""]}
        rows={rows}
        defaultSortDirection="descending"
        initialSortColumnIndex={4}
        hasFixedFirstColumn
        truncate
        hideScrollIndicator={true}
      />
    </Card>
  );
};

export const Options = ({ options, handleFormInput }) => {
  return (
    <Card title="Options">
      <CardSection>
        <Checkbox
          label="This product has options, like size or color"
          checked={options.flag}
          value={options.flag}
          onChange={() => handleFormInput("options-flag")}
        />
      </CardSection>

      {options.optionsList.map((option, optionIndex) => {
        return (
          <CardSection key={optionIndex}>
            <Stack alignment="trailing">
              <Stack.Item fill>
                <Autocomplete
                  options={options.optionAvailable}
                  selected={options.optionNotAvailable}
                  onSelect={(selected) =>
                    handleFormInput("edit-option-selection", {
                      optionIndex,
                      inputValue: selected,
                    })
                  }
                  textField={
                    <Autocomplete.TextField
                      onChange={(e) =>
                        handleFormInput("edit-option", {
                          optionIndex,
                          inputValue: e,
                        })
                      }
                      label="Option name"
                      value={option.option}
                      placeholder="Search"
                      error={
                        option.optionError &&
                        `You've already used the option name "${option.optionError}".`
                      }
                    />
                  }
                />
              </Stack.Item>
              <Icon source={DeleteMinor} color="base" />
            </Stack>

            {/* values */}
            <FormSection>
              {option.values.map((value, valueIndex) => (
                <Stack key={valueIndex} alignment="trailing">
                  <Stack.Item fill>
                    <TextField
                      label={valueIndex === 0 && "Option values"}
                      value={value.value}
                      onChange={(e) =>
                        handleFormInput("edit-value-input", {
                          optionIndex,
                          valueIndex,
                          input: e,
                        })
                      }
                    />
                  </Stack.Item>
                  <Icon source={DeleteMinor} color="base" />
                </Stack>
              ))}
            </FormSection>
          </CardSection>
        );
      })}

      {options.flag && options.optionsList.length < 3 && (
        <CardSection>
          <Button plain onClick={() => handleFormInput("add-option")}>
            <p style={{ display: "flex", alignItems: "center" }}>
              <Icon source={PlusMinor} color="base" />
              <span style={{ marginLeft: "20px" }}>Add another option</span>
            </p>
          </Button>
        </CardSection>
      )}
    </Card>
  );
};

export const Inventory = ({ inventory, handleFormInput }) => {
  return (
    <Card title="Inventory">
      <CardSection>
        <FormSection>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, md: 3, lg: 6 }}>
              <TextField
                type="text"
                label="SKU (Stock Keeping Unit)"
                value={inventory.sku}
                onChange={(e) => handleFormInput("sku", e)}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, md: 3, lg: 6 }}>
              <TextField
                type="text"
                label="Barcode (ISBN, UPC, GTIN, etc.)"
                value={inventory.barcode}
                onChange={(e) => handleFormInput("barcode", e)}
              />
            </Grid.Cell>
          </Grid>
        </FormSection>
      </CardSection>
    </Card>
  );
};

export const Pricing = ({ pricing, handleFormInput }) => {
  return (
    <Card title="Pricing">
      <CardSection>
        <FormSection>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, md: 3, lg: 6 }}>
              <TextField
                type="text"
                label="Price"
                prefix="$"
                placeholder="0.00"
                value={pricing.price}
                onChange={(e) => handleFormInput("price", e)}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, md: 3, lg: 6 }}>
              <TextField
                type="text"
                label="Compare at price"
                prefix="$"
                placeholder="0.00"
                value={pricing.compareAtPrice}
                onChange={(e) => handleFormInput("compareAtPrice", e)}
              />
            </Grid.Cell>
          </Grid>
        </FormSection>
      </CardSection>
      <CardSection>
        <FormSection>
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
            value={pricing.costPerItem}
            onChange={(e) => handleFormInput("costPerItem", e)}
            helpText="Customers won’t see this"
          />
        </FormSection>
      </CardSection>
    </Card>
  );
};

export const Media = ({ media, setMedia }) => {
  return (
    <Card title="Media">
      <CardSection>lol</CardSection>
    </Card>
  );
};

export const TitleDescription = ({ titleDescription, handleFormInput }) => {
  return (
    <Card>
      <CardSection>
        <FormSection>
          <TextField
            type="text"
            label="Title"
            value={titleDescription.title}
            onChange={(e) => handleFormInput("title", e)}
            placeholder="Short sleeve t-shirt"
          />
          <TextField
            type="text"
            label="Description"
            value={titleDescription.description}
            onChange={(e) => handleFormInput("description", e)}
          />
        </FormSection>
      </CardSection>
    </Card>
  );
};
