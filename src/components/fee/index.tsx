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

interface IProps {}

interface IState {}

const Fee: React.FC<IProps> = (props) => {
  const initState: IState = {};
  const [state, setState] = useState<IState>({ ...initState });
  const [info, setInfo] = useState<any>({ 非必要: [], 周期: [], 投资: [] });

  useEffect(() => {
    const getList = () => {
      axios.get("/getFee").then((resp) => {
        console.log(resp);
        setInfo(resp.data);
      });
    };

    getList();

    return () => {};
  }, []);

  return (
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
  );
};

export default Fee;
