import React from "react";
import shortid from "shortid";
import { Container, Row, Col } from "reactstrap";

import MainContent from "./components/main-content";
import Sidebar from "./components/sidebar";

import POLLS from "./data/polls";

class App extends React.Component {
  state = {
    polls: [],
    selectedPoll: {},
    searchTerm: "",
  };

  componentDidMount() {
    this.setState({ polls: POLLS });
  }

  addNewPoll = (poll) => {
    poll.id = shortid.generate();
    poll.created = new Date();
    poll.totalVote = 0;
    poll.opinions = [];

    this.setState({ polls: this.state.polls.concat(poll) });
  };

  updatePoll = (updatedPoll) => {
    const polls = [...this.state.polls];
    const poll = polls.find((p) => p.id === updatedPoll.id);

    poll.title = updatedPoll.title;
    poll.description = updatedPoll.description;
    poll.options = updatedPoll.options;

    this.setState({ polls });
  };

  deletePoll = (pollId) => {
    const polls = this.state.polls.filter((p) => p.id !== pollId);

    this.setState({ polls, selectPoll: {} });
  };

  selectPoll = (pollId) => {
    const poll = this.state.polls.find((p) => p.id === pollId);

    this.setState({ selectedPoll: poll });
  };

  getOpinion = (response) => {
    const { polls } = this.state;

    const poll = polls.find((p) => p.id === response.pollId);
    const option = poll.options.find((o) => o.id === response.selectedOption);

    poll.totalVote++;
    option.vote++;

    const opinion = {
      id: shortid.generate(),
      name: response.name,
      selectedOption: response.selectedOption,
    };

    poll.opinions.push(opinion);

    this.setState({ polls });
  };

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm });
  };

  performSearch = () => {
    return this.state.polls.filter((poll) =>
      poll.title
        .toLowerCase()
        .includes(this.state.searchTerm.toLocaleLowerCase())
    );
  };

  render() {
    // const polls = this.performSearch();
    return (
      <Container>
        <Row>
          <Col md={4}>
            <Sidebar
              polls={this.state.polls}
              searchTerm={this.state.searchTerm}
              handleSearch={this.handleSearch}
              selectPoll={this.selectPoll}
              addNewPoll={this.addNewPoll}
            />
          </Col>
          <Col md={8}>
            <MainContent
              poll={this.state.selectedPoll}
              getOpinion={this.getOpinion}
              updatePoll={this.updatePoll}
              deletePoll={this.deletePoll}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
