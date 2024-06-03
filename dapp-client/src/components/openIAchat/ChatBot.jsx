import { Component } from 'react';
import axios from 'axios';
import apiKey from './openai';

class ChatBot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.addMessage('Hello! How can I assist you today?');
  }

  addMessage = (text, fromUser = false) => {
    const newMessage = { text, fromUser };
    this.setState((prevState) => ({
      messages: [...prevState.messages, newMessage],
    }));
  };

  handleUserInput = (text) => {
    this.addMessage(text, true);

    // Make a request to the ChatGPT API
    axios
      .post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: text,
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      )
      .then((response) => {
        const botReply = response.data.choices[0].text;
        this.addMessage(botReply);
      })
      .catch((error) => {
        console.error('Error communicating with the ChatGPT API:', error);
        this.addMessage('I apologize, but I am currently experiencing technical difficulties.');
      });
  };

  render() {
    return (
      <div className="chatbot">
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {this.state.messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${message.fromUser ? 'user' : 'bot'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            className="chatbot-input"
            placeholder="Type a message..."
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                this.handleUserInput(event.target.value);
                event.target.value = '';
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default ChatBot;