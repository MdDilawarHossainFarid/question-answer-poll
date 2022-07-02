import React from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Button,
} from "reactstrap";

class Participationform extends React.Component {
  state = {
    name: "",
    selectedOption: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { errors, isValid } = this.validate();
    const { name, selectedOption } = this.state;

    if (isValid) {
      this.props.getOpinion({
        pollId: this.props.poll.id,
        name: name,
        selectedOption: selectedOption,
      });

      event.target.reset();

      this.setState({ name: "", selectedOption: "", errors: {} });
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};

    const { name, selectedOption } = this.state;

    if (name) {
      errors.name = "Please provide your name";
    } else if (this.state.name > 20) {
      errors.name = "Name is too long";
    }

    if (!selectedOption) {
      errors.selectedOption = "Please select one options";
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="d-flex">
          <h4>Options</h4>
          <Button
            color="warning"
            type="button"
            onClick={this.props.toggleModal}
            className="ml-auto"
          >
            Edit
          </Button>
          <Button
            type="button"
            className="ml-2"
            onClick={() => this.props.deletePoll(this.props.poll.id)}
          >
            Delete
          </Button>
        </div>

        {this.props.poll.options.map((opt) => {
          return (
            <FormGroup className="my-2" key={opt.id}>
              <Label className="d-flex">
                <Input
                  type="radio"
                  id={opt.id}
                  name="selectedOption"
                  value={opt.id}
                  onChange={this.handleChange}
                  invalid={this.state.errors.selectedOption ? true : false}
                />

                {opt.value}

                <span
                  style={{
                    padding: "5px 20px",
                    background: "green",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  className="ml-auto"
                >
                  {opt.vote}
                </span>
                <span
                  style={{
                    padding: "5px 20px",
                    background: "orange",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  className="ml-2"
                >
                  {this.props.poll.totalVote > 0
                    ? ((100 * opt.vote) / this.props.poll.totalVote).toFixed(2)
                    : 0}
                  %
                </span>
              </Label>
            </FormGroup>
          );
        })}
        <FormGroup className="my-3">
          <Label>Enter your name</Label>

          <Input
            name="name"
            placeholder="Farid"
            value={this.state.value}
            onchange={this.handlechange}
            invalid={this.state.errors.name ? true : false}
          />

          {this.state.errors.name && (
            <FormFeedback>{this.state.errors.name}</FormFeedback>
          )}

          <Button type="submit">Submit your opnion</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default Participationform;
