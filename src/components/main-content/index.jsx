import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import Participationform from "./participate-form";
import PollForm from "../poll-form/form";

class MainContent extends React.Component {
  state = {
    openModal: false,
  };

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
    console.log("toggle modal");
  };

  render() {
    if (Object.keys(this.props.poll).length === 0) {
      return (
        <div>
          <h3>Welcome to my application</h3>
          <p>You can create as many poll as you want</p>
        </div>
      );
    }

    const { poll, getOpinion, updatePoll, deletePoll } = this.props;

    return (
      <div>
        <h3>{poll.title}</h3>
        <p>{poll.description}</p>
        <br />
        <Participationform
          poll={poll}
          getOpinion={getOpinion}
          toggleModal={this.toggleModal}
          deletePoll={deletePoll}
        />
        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
          unmountOnClose={true}
        >
          <ModalHeader toggleModal={this.toggleModal}>Update Poll</ModalHeader>
          <ModalBody>
            <PollForm
              poll={poll}
              isUpdate={true}
              submit={updatePoll}
              buttonValue="Update Poll"
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MainContent;
