import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Feedback.css';

class Feedback extends Component {
  state = {
    vote: null,
    comments: 'Any comments?',
  }

  handleVote = ({ target }) => {
    const { name } = target;
    this.setState({
      vote: name === 'thumbs-up' ? true : false,
    })
  }

  handleCommentsChange = ({ target }) => {
		this.setState({
			comments: target.value
		});
	};

	render() {
		return (
			<div className="Feedback-feedback-container">
				<div className="Feedback-header-container">
					<div className="Feedback-empty-button" />
					<div className="Feedback-feedback-button">Feedback</div>
					<div className="Feedback-send-button">
						<Link to="/">Send</Link>
					</div>
				</div>
				<div className="Feedback-options-container">
					<div className="Feedback-vote-container">
						<div>
							<h3>How was your experience?</h3>
						</div>
						<div className="Feedback-thumbs-container">
              <img
                name="thumbs-up"
                className="Feedback-thumbs-up"
                onClick={this.handleVote}
                src={require('./../assets/thumbs-up.png')}
                alt="thumbs-up"
              />
							<img
                name="thumbs-down"
                onClick={this.handleVote}
								className="Feedback-thumbs-down"
								src={require('./../assets/thumbs-down.png')}
								alt="thumbs-down"
							/>
						</div>
					</div>
					<div className="Feedback-comment-container">
            <input
              name="comments"
              type="text"
              value={this.state.comments}
              onChange={this.handleCommentsChange}
            />
          </div>
				</div>
			</div>
		);
	}
}

export default Feedback;
