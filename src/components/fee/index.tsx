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

interface IProps {}

interface IState {
  total: number;
}

const Fee: React.FC<IProps> = (props) => {
  const initState: IState = { total: 0 };
  const [state, setState] = useState<IState>({ ...initState });
  const [info, setInfo] = useState<any>({ 非必要: [], 周期: [], 投资: [] });

  useEffect(() => {
    const getList = () => {
      axios.get("/getFee").then((resp) => {
        setInfo(resp.data);
        let total = 0;
        for (const key in resp.data) {
          if (Object.prototype.hasOwnProperty.call(resp.data, key)) {
            const element = resp.data[key];
            element.forEach((item) => (total += item.总价));
          }
        }
        setState({ ...state, total });
      });
    };

    getList();

    return () => {};
  }, []);

  return (
    <div>
      <TextField
        name="total"
        label="总计"
        defaultValue=""
        value={state.total}
        InputProps={{
          readOnly: true,
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>商品</TableCell>
              <TableCell align="right">单价</TableCell>
              <TableCell align="right">数量</TableCell>
              <TableCell align="right">总价</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info.非必要.map((record) => (
              <TableRow key={record.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{record.商品}</TableCell>
                <TableCell align="right">{record.单价}</TableCell>
                <TableCell align="right">{record.数量}</TableCell>
                <TableCell align="right">{record.总价}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>商品</TableCell>
              <TableCell align="right">单价</TableCell>
              <TableCell align="right">数量</TableCell>
              <TableCell align="right">总价</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info.周期.map((record) => (
              <TableRow key={record.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{record.商品}</TableCell>
                <TableCell align="right">{record.单价}</TableCell>
                <TableCell align="right">{record.数量}</TableCell>
                <TableCell align="right">{record.总价}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>商品</TableCell>
              <TableCell align="right">单价</TableCell>
              <TableCell align="right">数量</TableCell>
              <TableCell align="right">总价</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info.投资.map((record) => (
              <TableRow key={record.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{record.商品}</TableCell>
                <TableCell align="right">{record.单价}</TableCell>
                <TableCell align="right">{record.数量}</TableCell>
                <TableCell align="right">{record.总价}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Fee;
