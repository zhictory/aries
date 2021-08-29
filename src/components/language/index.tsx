import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import "./style.less";
import axios from "axios";

interface IProps {}

interface IState {
  filterList: any[];
  search: { key: string; value: string };
  loading: boolean;
}

let langList: any[] = [];
let langPackage: any = {};

const Language: React.FC<IProps> = (props) => {
  const initState: IState = {
    filterList: [],
    search: { key: "", value: "" },
    loading: false,
  };
  const [state, setState] = useState<IState>({ ...initState });

  const getLangPackage = (type: string) => {
    if (state["loading"]) {
      return false;
    }

    const url: any = {
      erp: "/erp/getLangPackage",
      oa3: "/oa3/getLangPackage",
      app: "/app/getLangPackage",
      ibs: "/ibs/getLangPackage",
    };

    if (langPackage[type]) {
      setState({ ...state, filterList: langPackage[type] });
    } else {
      langList = [];
      setState({ ...state, filterList: langList, loading: true });
      axios
        .get(url[type])
        .then((resp) => {
          const data = resp["data"]["response_data"]["langPackage"] || resp["data"]["response_data"]["lang_package"];
          for (const key in data) {
            langList.push({ key, value: data[key] });
          }
          langPackage[type] = langList;
          setState({ ...state, filterList: langList, loading: false });
        })
        .catch((error) => {
          console.log(error);
          setState({ ...state, loading: false });
        });
    }
  };

  const onKeyChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.toLowerCase();
    const filterList = langList.filter((item) => {
      const key = item["key"].toLowerCase();
      return key.includes(value);
    });
    setState({ ...state, filterList, search: { key: value, value: "" } });
  };

  const onValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.toLowerCase();
    const filterList = langList.filter((item) => {
      const key = item["value"].toLowerCase();
      return key.includes(value);
    });
    setState({ ...state, filterList, search: { key: "", value } });
  };

  const onRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    getLangPackage(value);
  };

  const copy = (content: string, evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const input = document.createElement("input");
    const target = evt.target;
    (target as any).style.borderColor = "green";
    setTimeout(() => ((target as any).style.borderColor = ""), 500);
    input.setAttribute("readonly", "readonly");
    input.setAttribute("value", content);
    document.body.appendChild(input);
    input.select(); // 兼容 pc
    input.setSelectionRange(0, 9999); // 兼容 ios
    if (document.execCommand("copy")) {
      document.execCommand("copy");
    }
    document.body.removeChild(input);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="language">
      <div className="form-control">
        <input placeholder="key" type="text" onChange={onKeyChange} value={state["search"]["key"]} />
        <input placeholder="value" type="text" onChange={onValueChange} value={state["search"]["value"]} />
        <ul>
          <li>
            <input type="radio" name="langType" value="erp" onChange={onRadioChange} />
            <span>ERP</span>
          </li>
          <li>
            <input type="radio" name="langType" value="app" onChange={onRadioChange} />
            <span>APP</span>
          </li>
          <li>
            <input type="radio" name="langType" value="oa3" onChange={onRadioChange} />
            <span>OA3</span>
          </li>
          <li>
            <input type="radio" name="langType" value="ibs" onChange={onRadioChange} />
            <span>IBS</span>
          </li>
        </ul>
      </div>
      <ul>
        {state["filterList"].map((item) => (
          <li key={item["key"]}>
            <span onClick={(evt) => copy(item["key"], evt)}>{item["key"]}</span>
            <span onClick={(evt) => copy(item["value"], evt)}>{item["value"]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Language;
