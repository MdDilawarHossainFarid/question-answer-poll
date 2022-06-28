import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const PollList = (porps) => {
  if (porps.polls.length === 0) {
    return <p>There is no poll</p>;
  }

  return (
    <ListGroup>
      {porps.polls.map((poll) => {
        return (
          <ListGroupItem
            key={poll.id}
            onClick={() => porps.selectPoll(poll.id)}
            style={{ cursor: "pointer" }}
          >
            {poll.title.length > 30
              ? poll.title.substr(0, 30) + "...."
              : poll.title}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default PollList;
