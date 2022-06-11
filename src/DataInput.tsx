import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import "./DataInput.css";

function DataInput() {
    const [tableHeader, setTableHeader] = useState([
        "Transaction Date",
        "Post Date",
        "Description",
        "Amount",
        "Category",
    ]);
    const [tableBody, setTableBody] = useState([
        ["1/01/2022", "1/01/2022", "Add CSV Data", "0.00", "Misc"],
    ]);
    const [csvInput, setCsvInput] = useState("");
    const [tableOpen, setTableOpen] = useState(false);

    const parseCSV: any = (data: String) => {
        const arr = data.trim().replaceAll('"', "").split("\n");
        let categories = arr[0].split(",");
        let entries = [];
        for (let i = 1; i < arr.length; i++) {
            entries.push(arr[i].split(","));
        }
        return [categories, entries];
    };

    const renderTableHeader: any = (data: any) => {
        let arr: any = [];
        data.forEach((category: string) => {
            arr.push(<TableCell align="right">{category}</TableCell>);
        });
        return arr;
    };

    const renderTableBody: any = (data: any) => {
        let arr: any = [];
        data.forEach((entry: any) => {
            let cells: any = [];
            entry.forEach((item: any) => {
                cells.push(<TableCell align="right">{item}</TableCell>);
            });
            arr.push(
                <TableRow
                    sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                    }}
                >
                    {cells}
                </TableRow>
            );
        });

        return arr;
    };

    return (
        <div className="wrapper">
            <div className="csvInput">
                <div className="statementLabel">
                    <TextField
                        onChange={(e) => {}}
                        label="Statement Name"
                        variant="filled"
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            let temp = parseCSV(csvInput);
                            setTableBody(temp[1]);
                        }}
                    >
                        Save
                    </Button>
                </div>
                <br />
                <TextField
                    onChange={(e) => {
                        setCsvInput(e.target.value);
                    }}
                    label=".csv data"
                    multiline
                    rows="10"
                    style={{ width: "75%" }}
                />
            </div>
            <div className="csvOutput">
                <Box>
                    <Collapse
                        in={tableOpen}
                        timeout="auto"
                        unmountOnExit
                        onClick={() => {
                            setTableOpen(!tableOpen);
                        }}
                    >
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        {tableHeader &&
                                            tableBody &&
                                            renderTableHeader(tableHeader)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableBody &&
                                        tableHeader &&
                                        renderTableBody(tableBody)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Collapse>
                </Box>
            </div>
        </div>
    );
}

export default DataInput;
