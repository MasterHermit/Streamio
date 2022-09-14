import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderAction() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui negative button"
        >
          Delete
        </button>
        <Link to="/" className="ui positive button">
          cancel
        </Link>
        ,
      </React.Fragment>
    );
  }
  renderContent() {
    if (!this.props.stream) {
      return "Are You Sure!";
    }
    return `Are You Sure You Want To Delete This Stream: ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderAction()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
