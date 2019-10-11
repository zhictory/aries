import React, { Component } from "react";

import "./style.css";

class Record extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      event: "Hello World",
      predict: "0",
      start: "09:00",
      end: "09:00",
      developSystem: "fee",
      developRemark: "",
      publishContent: "测试，fee前端，master，432902d，全量",
      system: "fee",
      sha: "",
      publishTitle: "",
      appVersion: ""
    };
    this.systems = [
      "fee",
      "sbsm",
      "app",
      "aries",
      "blog",
      "snippet",
      "katana",
      "dagger",
      "spider",
      "any"
    ];
    this.startEveryDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      9,
      0,
      0
    ).getTime();
    this.endEveryDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      22,
      0,
      0
    ).getTime();
  }

  addTODO = e => {
    if (e.charCode === 13) {
      const date = new Date();
      this.setState({
        start: `${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${
          date.getMinutes() < 10 ? "0" : ""
        }${date.getMinutes()}`
      });
    }
  };

  updateTODO = e => {
    this.setState({ event: e.target.value });
  };

  renderTimeBlock(currentBlock, type) {
    let startEveryDay = this.startEveryDay;
    const endEveryDay = this.endEveryDay;
    let date = new Date(startEveryDay);
    const { start } = this.state;
    const startTime = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      start.split(":")[0],
      start.split(":")[1],
      0
    );
    const blocks = [];
    // 生成可选择的时间块
    while (date.getTime() <= endEveryDay) {
      blocks.push(
        `${(date.getHours() < 10 ? "0" : "") +
          date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") +
          date.getMinutes()}`
      );
      startEveryDay += 15 * 60 * 1000;
      date = new Date(startEveryDay);
    }
    return blocks.map((block, index) => {
      let disabledClass = "";
      const blockTime = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        block.split(":")[0],
        block.split(":")[1],
        0
      );
      if (type === "end") {
        disabledClass = blockTime <= startTime ? "disabled" : "";
      }
      const blockOnClass = block === currentBlock ? " time-block_on " : " ";
      return (
        <li
          key={index}
          className={"time-block" + blockOnClass + disabledClass}
          onClick={
            disabledClass !== "disabled" ? this.handleChooseTime : undefined
          }
          data-block={block}
        >
          {block}
        </li>
      );
    });
  }

  handleChooseTime = e => {
    const { end } = this.state;
    const type = e.target.parentElement.getAttribute("data-time");
    const block = e.target.getAttribute("data-block");
    const isCanceled = e.target.classList.contains("time-block_on");
    const endTime = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      end.split(":")[0],
      end.split(":")[1],
      0
    );
    const blockTime = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      block.split(":")[0],
      block.split(":")[1],
      0
    );
    if (isCanceled) {
      this.setState({
        [type]: "0:00"
      });
    } else if (type === "start" && blockTime > endTime) {
      this.setState({
        start: block,
        end: "0:00"
      });
    } else {
      this.setState({
        [type]: block
      });
    }
  };

  copy = (content, e) => {
    const input = document.createElement("input");
    const check = e.target.nextElementSibling;
    input.setAttribute("readonly", "readonly");
    input.setAttribute("value", content);
    document.body.appendChild(input);
    input.select(); // 兼容 pc
    input.setSelectionRange(0, 9999); // 兼容 ios
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      check.style.display = "inline";
      setTimeout(() => {
        check.style.display = "none";
      }, 1000);
    } else {
      check.style.display = "none";
    }
    document.body.removeChild(input);
  };

  copyElement = (selector, e) => {
    const check = e.target.nextElementSibling;
    const ele = document.querySelector(selector);
    const newEle = document.createElement("div");
    newEle.innerHTML = ele.outerHTML;
    document.body.appendChild(newEle);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(newEle);
    selection.removeAllRanges();
    selection.addRange(range);
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      check.style.display = "inline";
      setTimeout(() => {
        check.style.display = "none";
      }, 1000);
    } else {
      check.style.display = "none";
    }
    document.body.removeChild(newEle);
  };

  getDuring = () => {
    const { start, end } = this.state;
    const startTime = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      start.split(":")[0],
      start.split(":")[1],
      0
    );
    const endTime = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      end.split(":")[0],
      end.split(":")[1],
      0
    );
    return endTime - startTime > 0
      ? ((endTime - startTime) / 1000 / 60 / 60).toFixed(2)
      : "0.00";
  };

  renderSystem = () => {
    return this.systems.map((system, index) => (
      <option key={index} value={system}>
        {system}
      </option>
    ));
  };

  handlePublish = () => {
    const { system, sha, publishTitle, appVersion } = this.state;
    this.setState({
      publishContent: `${publishTitle +
        (publishTitle ? "，" : "")}${system}前端，master，${sha +
        (sha ? "，" : "")}全量${system === "app" ? "，" + appVersion : ""}`
    });
  };

  handleSelectDevelopSystem = e => {
    this.setState({ developSystem: e.target.value });
  };

  handleInputRemark = e => {
    this.setState({
      developRemark: e.target.value
    });
  };

  handleSelectSystem = e => {
    this.setState({ system: e.target.value }, this.handlePublish);
  };

  handleInputSHA = e => {
    this.setState({ sha: e.target.value }, this.handlePublish);
  };

  handleInputTitle = e => {
    this.setState({ publishTitle: e.target.value }, this.handlePublish);
  };

  handleInputVersion = e => {
    this.setState({ appVersion: e.target.value }, this.handlePublish);
  };

  renderPredictTimeBlock = () => {
    const { predict } = this.state;
    const blocks = [];
    for (let block = 0.25; block <= 2; block += 0.25) {
      const blockOnClass =
        block.toFixed(2) === predict ? " time-block_on " : "";
      blocks.push(
        <li
          key={block.toFixed(2)}
          className={"time-block" + blockOnClass}
          onClick={this.handleChoosePredictTime}
          data-block={block.toFixed(2)}
        >
          {block.toFixed(2)}
        </li>
      );
    }
    return blocks;
  };

  handleChoosePredictTime = e => {
    const isCanceled = e.target.classList.contains("time-block_on");
    isCanceled
      ? this.setState({ predict: "0.00" })
      : this.setState({ predict: e.target.getAttribute("data-block") });
  };

  render() {
    const {
      event,
      start,
      predict,
      end,
      developSystem,
      developRemark,
      publishContent,
      publishTitle,
      sha,
      system,
      appVersion
    } = this.state;
    const during = this.getDuring();
    return (
      <div className="app-record">
        <header>
          <h1>开发时间模板</h1>
        </header>
        <div className="app-record__todo">
          <div>
            <input
              type="text"
              onChange={this.updateTODO}
              onKeyPress={this.addTODO}
              value={event}
              placeholder="需求内容"
            />
          </div>
          <div>
            <h6>系统</h6>
            <select name="" id="" onChange={this.handleSelectDevelopSystem}>
              {this.renderSystem()}
            </select>
          </div>
        </div>
        <h6 className="mv20">预计开发时长</h6>
        <ul className="time-blocks" data-time="predict">
          {this.renderPredictTimeBlock()}
        </ul>
        <h6 className="mv20">开始时间</h6>
        <ul className="time-blocks" data-time="start">
          {this.renderTimeBlock(start, "start")}
        </ul>
        <h6 className="mv20">结束时间</h6>
        <ul className="time-blocks" data-time="end">
          {this.renderTimeBlock(end, "end")}
        </ul>
        <div className="mv20">
          <textarea
            name=""
            id=""
            cols="30"
            rows="4"
            placeholder="备注"
            onChange={this.handleInputRemark}
            value={developRemark}
          ></textarea>
        </div>
        <table className="app-record__table" id="developContent">
          <tbody>
            <tr>
              <td>{event}</td>
              <td>{developSystem}</td>
              <td>{predict}</td>
              <td>{start}</td>
              <td>{during}</td>
              <td
                dangerouslySetInnerHTML={{
                  __html: developRemark.replace(/[\r\n]/g, "<br/>")
                }}
              />
            </tr>
          </tbody>
        </table>
        <div
          className="app-record__copy"
          onClick={this.copyElement.bind(this, "#developContent")}
        >
          <span role="img" aria-label="check">
            📋
          </span>{" "}
          <span role="img" aria-label="check">
            ✔️
          </span>
        </div>
        <div style={{ clear: "both" }}></div>
        <header>
          <h1>发布模板</h1>
        </header>
        <div className="app-record__publish">
          <input
            type="text"
            value={publishTitle}
            onChange={this.handleInputTitle}
            placeholder="版本名称"
          />
          <select name="" id="" onChange={this.handleSelectSystem}>
            {this.renderSystem()}
          </select>
          <input
            type="text"
            value={sha}
            onChange={this.handleInputSHA}
            placeholder="SHA"
          />
          {system === "app" && (
            <input
              type="text"
              value={appVersion}
              onChange={this.handleInputVersion}
              placeholder="APP 版本号"
            />
          )}
        </div>
        <table className="app-record__table" id="publishContent">
          <tbody>
            <tr>
              <td>{publishContent}</td>
            </tr>
          </tbody>
        </table>
        <div
          className="app-record__copy"
          // onClick={this.copy.bind(this, publishContent)}
          onClick={this.copyElement.bind(this, "#publishContent")}
        >
          <span role="img" aria-label="check">
            📋
          </span>{" "}
          <span role="img" aria-label="check">
            ✔️
          </span>
        </div>
      </div>
    );
  }
}

export default Record;
