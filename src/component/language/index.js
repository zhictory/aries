import React from 'react';
// import PropTypes from "prop-types";
import lang from './lang.json';
import './style.css';

class Language extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      filterList: [],
    };
    this.langList = [];
    for (const key in lang) {
      this.langList.push({ key, value: lang[key] });
    }
  }

  componentDidMount() {
    this.setState({ filterList: this.langList });
  }

  onKeyChange = evt => {
    const value = evt.target.value.toLowerCase();
    const filterList = this.langList.filter(item => {
      const key = item['key'].toLowerCase();
      return key.includes(value);
    });
    this.setState({ filterList });
  };

  onValueChange = evt => {
    const value = evt.target.value.toLowerCase();
    const filterList = this.langList.filter(item => {
      const key = item['value'].toLowerCase();
      return key.includes(value);
    });
    this.setState({ filterList });
  };

  copy = (content, evt) => {
    const input = document.createElement('input');
    const target = evt.target;
    target.style.borderColor = 'green';
    setTimeout(() => (target.style.borderColor = ''), 500);
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', content);
    document.body.appendChild(input);
    input.select(); // 兼容 pc
    input.setSelectionRange(0, 9999); // 兼容 ios
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    document.body.removeChild(input);
  };

  render() {
    return (
      <div className="language">
        <div className="form-control">
          <input placeholder="key" type="text" onChange={this.onKeyChange} />
          <input placeholder="value" type="text" onChange={this.onValueChange} />
        </div>
        <ul>
          {this.state.filterList.map(item => (
            <li key={item['key']}>
              <span onClick={evt => this.copy(item['key'], evt)}>{item['key']}</span>
              <span onClick={evt => this.copy(item['value'], evt)}>{item['value']}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Language;
