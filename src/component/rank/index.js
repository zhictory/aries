import React, { Component } from "react";
// import PropTypes from "prop-types";
import { DynamicBarChart } from "react-dynamic-charts";
import "react-dynamic-charts/dist/index.css"; // Don't forget to import the styles
import data from "./data";

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data
    };
  }
  componentDidMount() {}
  updateData = () => {};
  render() {
    const { data } = this.state;
    for (let i = 0; i < 10; i++) {
      const values = data[data.length - 1].values.map(item => {
        item.value += Math.round(Math.random() * 100);
        return item;
      });
      data.push({
        name: "Rank",
        values
      });
    }
    return (
      <DynamicBarChart barHeight={20} iterationTimeout={100} data={data} />
    );
  }
}

Rank.propTypes = {};

export default Rank;
