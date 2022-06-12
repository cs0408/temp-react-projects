import React, { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import SubContainer from "./SubContainer";
import Option, { ShowCardOption } from "./Option";
import OptionValue, { ValueDeleteButton } from "./OptionValue";
import ButtonComponents, { ButtonComponent } from "./Buttons";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import { Stack } from "@mui/material";



const AddNewFieldOnButtonClick_2 = () => {
  const [optionFlag, setOptionFlag] = useState(false);
  const [optionTypes, setOptionTypes] = useState([
    "Size",
    "Color",
    "Material",
    "Style",
  ]);

  const [options, setOptions] = useState([
    {
      id: '0',
      flag: false,
      option: "",
      optionError: "",
      values: [{ id: "0", value: "", valueError: "" }],
    },
  ]);



  // add new option
  const addNewOption = () => {
    // const lastIndexOption = options[options.length - 1]
    console.log(options)
    setOptions((option) => [
      ...option,
      {
        id: options.length.toString(),
        flag: false,
        option: "",
        optionError: "",
        values: [{ id: "0", value: "", valueError: "" }],
      },
    ]);
  };

  // delete option
  const deleteOption = (index) => {
    const list = [...options];
    list.splice(index, 1);
    setOptions(list);
  };

  // save option
  const saveOption = (index) => {
    const list = [...options];

    if (
      list[index].option === "" &&
      list[index].values.length === 1 &&
      list[index].values[0].value === ""
    ) {
      list[index].optionError = "Option name is required.";
      list[index].values[0].valueError = "Option value is required.";
    }

    if (list[index].option === "")
      list[index].optionError = "Option name is required.";

    if (list[index].values.length === 1)
      list[index].values[0].valueError = "Option value is required.";

    if (list[index].option !== "" && list[index].values.length > 1)
      list[index].flag = true;

    setOptions(list);
  };

  // clear option
  const clearOption = (index) => {
    const list = [...options];
    list[index] = {
      flag: false,
      option: "",
      optionError: "",
      values: [{ id: "0", value: "", valueError: "" }],
    };
    setOptions(list);
  };

  // edit option
  const editOption = (index) => {
    console.log(index);
    const list = [...options];
    list[index].flag = false;
    setOptions(list);
  };

  // delete option value
  const deleteOptionValue = (optionIndex, index) => {
    console.log(optionIndex, index);
    const list = [...options];
    list[optionIndex].values.splice(index, 1);
    setOptions(list);
  };

  // handle input field
  const handleInputField = (e, optionIndex, valueIndex) => {
    const list = [...options];

    if (valueIndex !== null) {
      list[optionIndex].values[valueIndex][e.target.name] = e.target.value;

      // check field is not empty
      if (!e.target.value) {
        list[optionIndex].values[valueIndex].valueError =
          "Option value is required.";
      } else {
        list[optionIndex].values[valueIndex].valueError = "";
      }

      // check value is already available or not
      const valuesLength = list[optionIndex].values.length;
      // add new value field
      if (list[optionIndex].values[valuesLength - 1].value !== "") {
        list[optionIndex].values.push({ id: list[optionIndex].values.length.toString(), value: "", valueError: "" });
      }

      setOptions(list);
    } else {
      const { name, value } = e.target;

      list[optionIndex][name] = value;

      // check value is not empty
      if (!value) {
        list[optionIndex].optionError = "Option name is required";
      } else {
        list[optionIndex].optionError = "";
      }

      setOptions(list);
    }
  };

  // on drag end
  const onOptionsDragEnd = (results) => {
    let tempOptions = [...options]
    const optionIndex = results.source.index

    // if destination index not available
    if (!results.destination) { return }

    // if source index or destination index item values is empty
    if (!tempOptions[optionIndex].option) {
      return
    }


    tempOptions[optionIndex].flag = false
    let [selectedOption] = tempOptions.splice(optionIndex, 1)
    tempOptions.splice(results.destination.index, 0, selectedOption)
    setOptions(tempOptions)
  }

  const onOptionsDragStart = (results) => {
    const list = [...options];
    const optionIndex = results.source.index

    // if source index or destination index item values is empty
    if ((!list[optionIndex].option || !list[optionIndex].values[0].value) && list[optionIndex].values.length === 1) {
      return
    }

    list[optionIndex].flag = true
    setOptions(list)

  }

  const onValuesDragEnd = (results, optionIndex) => {
    let tempOptions = [...options]
    const valueIndex = results.source.index

    // if destination index not available
    if (!results.destination) { return }

    console.log(tempOptions[optionIndex].values)
    // if source index or destination index item values is empty
    if (!tempOptions[optionIndex].values[valueIndex].value) {
      return
    }

    let [selectedValue] = tempOptions[optionIndex].values.splice(valueIndex, 1)
    tempOptions[optionIndex].values.splice(results.destination.index, 0, selectedValue)
    setOptions(tempOptions)
  }

  const onValuesDragStart = (results) => {
    // console.log("Results start =", results)
    // console.log("type = ", values)
  }


  return (
    <MainContainer>
      <DragDropContext
        onDragEnd={(results) => onOptionsDragEnd(results)}
        onDragStart={(results) => onOptionsDragStart(results)}
      >
        <Droppable droppableId="options">
          {
            (provided, snapshot) => (
              <div ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {options.map((option, optionIndex) => (
                  <Draggable key={option.id} draggableId={option.id} index={optionIndex}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} >
                        <SubContainer >
                          {/* <Stack direction="row" alignItems="center"> */}

                          <span {...provided.dragHandleProps}><DragIndicatorIcon /></span>
                          {option.flag ? (
                            <ShowCardOption
                              editOption={() => editOption(optionIndex)}
                              index={optionIndex}
                              option={option}
                            />
                          ) : (
                            <Option
                              deleteOption={() => deleteOption(optionIndex)}
                              handleInputField={handleInputField}
                              saveOption={() => saveOption(optionIndex)}
                              clearOption={() => clearOption(optionIndex)}
                              inputValue={option.option}
                              index={optionIndex}
                              error={option.optionError}
                              optionTypes={optionTypes}
                            >
                              <DragDropContext
                                onDragEnd={(results) => onValuesDragEnd(results, optionIndex)}
                                onDragStart={(results) => onValuesDragStart(results)}
                              >
                                <Droppable droppableId="values">
                                  {
                                    (provided, snapshot) => (
                                      <div ref={provided.innerRef}
                                        {...provided.droppableProps}
                                      >
                                        {/* option values */}
                                        {option.values.map((value, valueIndex) => (
                                          <Draggable key={value.id} draggableId={value.id} index={valueIndex}>
                                            {(provided, snapshot) => (
                                              <div ref={provided.innerRef} {...provided.draggableProps} >
                                                <Stack direction="row" alignItems="center">
                                                  <span {...provided.dragHandleProps}><DragIndicatorIcon /></span>
                                                  <OptionValue
                                                    key={valueIndex}
                                                    inputValue={value.value}
                                                    handleInputField={handleInputField}
                                                    index={valueIndex}
                                                    optionIndex={optionIndex}
                                                    error={value.valueError}
                                                  >
                                                    {option.values[valueIndex].value !== "" && (
                                                      <ValueDeleteButton
                                                        deleteOptionValue={() =>
                                                          deleteOptionValue(optionIndex, valueIndex)
                                                        }
                                                      />
                                                    )}
                                                  </OptionValue>
                                                </Stack>
                                              </div>)}</Draggable>
                                        )
                                        )}
                                        {provided.placeholder}
                                      </div>)}
                                </Droppable>
                              </DragDropContext>
                            </Option>
                          )}
                          {/* </Stack> */}
                        </SubContainer></div>
                    )}
                  </Draggable>

                ))}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
      {options.length < 3 && (
        <ButtonComponents>
          <ButtonComponent
            variant="outlined"
            onClick={addNewOption}
            title="Add another option"
          />
        </ButtonComponents>
      )}
    </MainContainer>
  );

};

export default AddNewFieldOnButtonClick_2;

resetServerContext();