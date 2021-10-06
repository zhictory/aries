import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.less";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

interface IProps {}

interface IState {
  total: number;
  headers: string[];
}

const columns: GridColDef[] = [
  { field: "商品", headerName: "商品", width: 200 },
  { field: "单价", headerName: "单价", width: 200 },
  { field: "数量", headerName: "数量", width: 200 },
  { field: "总价", headerName: "总价", width: 200 },
];

const Fee: React.FC<IProps> = (props) => {
  const initState: IState = { total: 0, headers: [] };
  const [state, setState] = useState<IState>({ ...initState });
  const [info, setInfo] = useState<any>({ 非必要: [], 周期: [], 投资: [] });

  useEffect(() => {
    const getList = () => {
      axios.get("/getFee").then((resp) => {
        let total = 0;
        let headers: string[] = [];

        for (const key in resp.data) {
          headers.push(key);

          if (Object.prototype.hasOwnProperty.call(resp.data, key)) {
            let element = resp.data[key];

            element.forEach((item, index) => (item.id = `${key}_${index}`));

            element.forEach((item) => (total += item.总价));
          }
        }

        setInfo(resp.data);
        setState({ ...state, total, headers });
      });
    };

    getList();

    return () => {};
  }, []);

  return (
    <div>
      <Box mt={2} mb={2}>
        <TextField
          name="total"
          label="总计"
          defaultValue=""
          value={state.total}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      {state.headers.map((header) => (
        <Box mt={2}>
          <h2>{header}</h2>
          <Box mt={2} style={{ height: "400px" }}>
            <DataGrid rows={info[header]} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </Box>
        </Box>
      ))}
    </div>
  );
};

export default Fee;
