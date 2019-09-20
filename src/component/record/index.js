import React, { Component } from "react";

import "./style.css";

class Record extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      event: "Hello World",
      start: `${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${
        date.getMinutes() < 10 ? "0" : ""
      }${date.getMinutes()}`,
      during: 0
    };
    this.startTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      9,
      0,
      0
    ).getTime();
    this.endTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      18,
      0,
      0
    ).getTime();
  }

  addTODO(e) {
    if (e.charCode === 13) {
      const date = new Date();
      this.setState({
        start: `${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${
          date.getMinutes() < 10 ? "0" : ""
        }${date.getMinutes()}`
      });
    }
  }

  updateTODO(e) {
    this.setState({ event: e.target.value });
  }

  renderTimeBlock() {
    let start = this.startTime;
    let end = this.endTime;
    let date = new Date(start);
    const blocks = [];
    while (date.getTime() <= end) {
      blocks.push(
        `${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${
          (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
        }`
      );
      start += 15 * 60 * 1000;
      date = new Date(start);
    }
    return blocks.map((block, index) => <li key={index} className="time-block">{block}</li>);
  }

  render() {
    const { event, start, during } = this.state;
    return (
      <div className="app-record">
        <p>
          <input
            type="text"
            onChange={this.updateTODO.bind(this)}
            onKeyPress={this.addTODO.bind(this)}
            value={event}
          />
        </p>
        <ul className="time-blocks">{this.renderTimeBlock()}</ul>
        <table border="true">
          <tbody>
            <tr>
              <td>{event}</td>
              <td>{start}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Record;
