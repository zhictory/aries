import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import "./style.less";
import axios from "axios";
import { FormControlLabel, Input, Radio, RadioGroup } from "@material-ui/core";

type SystemValue = "ERP" | "APP" | "OA3" | "IBS" | "";

interface IProps {}

interface IState {
  filterList: any[];
  search: { key: string; value: string };
}

const prefixClass = "language";
let langList: any[] = [];
let langPackage: any = {};
const url: any = {
  ERP: "/erp/getLangPackage",
  OA3: "/oa3/getLangPackage",
  APP: "/app/getLangPackage",
  IBS: "/ibs/getLangPackage",
};

const Language: React.FC<IProps> = (props) => {
  const initState: IState = {
    filterList: [],
    search: { key: "", value: "" },
  };
  const [state, setState] = useState<IState>({ ...initState });
  const [systemValue, setSystemValue] = useState<SystemValue>("");
  const [loading, setLoading] = useState<boolean>(false);

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
    const value: SystemValue = evt.target.value as SystemValue;

    setSystemValue(value);
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

  useEffect(() => {
    if (systemValue) {
      const getLangPackage = () => {
        if (langPackage[systemValue]) {
          setState((prevState) => ({ ...prevState, filterList: langPackage[systemValue] }));
        } else {
          langList = [];

          setState((prevState) => ({ ...prevState, filterList: langList }));
          setLoading(true);

          axios
            .get(url[systemValue])
            .then((resp) => {
              const data = resp["data"]["response_data"]["langPackage"] || resp["data"]["response_data"]["lang_package"];

              for (const key in data) {
                langList.push({ key, value: data[key] });
              }

              langPackage[systemValue] = langList;

              setState((prevState) => ({ ...prevState, filterList: langList }));
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setState((prevState) => ({ ...prevState }));
              setLoading(false);
            });
        }
      };

      getLangPackage();
    }
  }, [systemValue]);

  return (
    <div className={`${prefixClass}`}>
      <div className="form-control">
        <Input placeholder="key" type="text" className={`${prefixClass}-input`} onChange={onKeyChange} value={state["search"]["key"]} />
        <Input placeholder="key" type="text" className={`${prefixClass}-input`} onChange={onValueChange} value={state["search"]["value"]} />
        <RadioGroup row aria-label="system" name="system" value={systemValue} onChange={onRadioChange}>
          {["ERP", "APP", "OA3", "IBS"].map((system) => (
            <FormControlLabel key={system} value={system} control={<Radio />} label={system} />
          ))}
        </RadioGroup>
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
