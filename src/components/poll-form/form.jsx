import React from "react";
import {
  Form,
  FormGroup,
  Input,
  FormFeedback,
  Button,
  Label,
} from "reactstrap";

const FormJsx = ({
  title,
  description,
  options,
  errors,
  buttonValue,
  handleChange,
  handleOptionChange,
  createOption,
  deleteOption,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          name="title"
          id="title"
          placeHnolder="A Dummy Title"
          value={title}
          onChange={handleChange}
          invalid={errors.title ? true : false}
        />
        {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          name="textarea"
          id="description"
          placeHnolder="Descripb Your Poll"
          value={description}
          onChange={handleChange}
          invalid={errors.title ? true : false}
        />
        {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label>
          Enter Option
          <span
            style={{
              marginLeft: "30px",
              background: "green",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={createOption}
          >
            Add Options
          </span>
        </Label>
        {options.map((opt, index) => {
          return (
            <div key={opt.id} className="d-flex my-2">
              <Input
                value={opt.value}
                onChange={(e) => handleOptionChange(e, index)}
                invalid={errors.options && errors.options[index] ? true : false}
              />
              <Button
                color="danger"
                disabled={options.length <= 2}
                className="ml-2"
                onClick={() => deleteOption(index)}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </FormGroup>
      <Button color="primary" tyope="submit">
        {buttonValue}
      </Button>
    </Form>
  );
};

export default FormJsx;
