import React from 'react';
// import PropTypes from "prop-types";
import './style.css';
import axios from 'axios';

class Language extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      filterList: [],
      search: { key: '', value: '' },
    };
    this.langList = [];
    this.langPackage = {};
  }

  componentDidMount() {}

  getLangPackage = type => {
    const url = {
      erp: '/erp/getLangPackage',
      oa3: '/oa3/getLangPackage',
      app: '/app/getLangPackage',
      ibs: '/ibs/getLangPackage',
    };

    if (this.langPackage[type]) {
      this.setState({ filterList: this.langPackage[type] });
    } else {
      this.langList = [];
      this.setState({ filterList: this.langPackage[type] });
      axios
        .get(url[type])
        .then(resp => {
          const data =
            resp['data']['response_data']['langPackage'] ||
            resp['data']['response_data']['lang_package'];
          for (const key in data) {
            this.langList.push({ key, value: data[key] });
          }
          this.langPackage[type] = this.langList;
          this.setState({ filterList: this.langPackage[type] });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  onKeyChange = evt => {
    const value = evt.target.value.toLowerCase();
    const filterList = this.langList.filter(item => {
      const key = item['key'].toLowerCase();
      return key.includes(value);
    });
    this.setState({ filterList, search: { key: value, value: '' } });
  };

  onValueChange = evt => {
    const value = evt.target.value.toLowerCase();
    const filterList = this.langList.filter(item => {
      const key = item['value'].toLowerCase();
      return key.includes(value);
    });
    this.setState({ filterList, search: { key: '', value } });
  };

  onRadioChange = evt => {
    const value = evt.target.value;
    this.getLangPackage(value);
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
          <input
            placeholder="key"
            type="text"
            onChange={this.onKeyChange}
            value={this.state['search']['key']}
          />
          <input
            placeholder="value"
            type="text"
            onChange={this.onValueChange}
            value={this.state['search']['value']}
          />
          <ul>
            <li>
              <input type="radio" name="langType" value="erp" onChange={this.onRadioChange} />
              <span>ERP</span>
            </li>
            <li>
              <input type="radio" name="langType" value="app" onChange={this.onRadioChange} />
              <span>APP</span>
            </li>
            <li>
              <input type="radio" name="langType" value="oa3" onChange={this.onRadioChange} />
              <span>OA3</span>
            </li>
            <li>
              <input type="radio" name="langType" value="ibs" onChange={this.onRadioChange} />
              <span>IBS</span>
            </li>
          </ul>
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
