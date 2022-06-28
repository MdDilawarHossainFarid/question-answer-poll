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
    // (poll.totalVote = 0),
    //   (poll.opinions = []),
    this.setState({ polls: this.state.polls.concat(poll) });
  };

  updatePolll = (updatedPoll) => {
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
    this.setState({ selectPoll: poll });
  };

  handleSearch = (searchTerm) => {};

  render() {
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
            <MainContent />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
