import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import data from "../../data.json";
import _ from "lodash";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

import "./style.css";

export default function GroupedTable() {
  const groupDataFunction = (
    groupByField,
    groupPeriod,
    startDT,
    endDT,
    arrData
  ) => {
    let dict = {};
    arrData = _.groupBy(arrData, groupByField);

    Object.keys(arrData).forEach((item) => {
      arrData[item] = _.groupBy(arrData[item], (date) => {
        var dateParts = date.Date.split("/");
        return groupPeriod === "Day"
          ? new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
          : new Date(dateParts[2], dateParts[1] - 1);
      });
    });

    Object.keys(arrData).forEach((item) => {
      let groupedByFieldNameArray = arrData[item];
      let groupedByPeriodArray = [];
      var dateParts = endDT.split("-");
      var endDate =
        groupPeriod === "Day"
          ? new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
          : new Date(dateParts[0], dateParts[1] - 1);
      dateParts = startDT.split("-");

      for (
        var d =
          groupPeriod === "Day"
            ? new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
            : new Date(dateParts[0], dateParts[1] - 1);
        d <= endDate;
        groupPeriod === "Day"
          ? d.setDate(d.getDate() + 1)
          : d.setMonth(d.getMonth() + 1)
      ) {
        let totalHours = _.sumBy(groupedByFieldNameArray[d], "TotalHours");
        groupedByPeriodArray.push({
          PeriodStr:
            groupPeriod === "Day"
              ? `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
              : `${d.getMonth() + 1}/${d.getFullYear()}`,
          Value: totalHours,
        });
      }

      dict[item] = groupedByPeriodArray;
    });
    return dict;
  };

  const [groupByFieldName, setGroupByFieldName] = useState();
  const [groupByDate, setGroupByDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [groupedData, setGroupedData] = useState();

  return (
    <Grid className="container">
      <form className="formContainer">
        <FormControl className="form-field">
          <InputLabel id="demo-simple-select-label">
            Group by field name
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={groupByFieldName}
            label="Group by field name"
            onChange={(e) => setGroupByFieldName(e.target.value)}
          >
            <MenuItem value="GroupName">By Group</MenuItem>
            <MenuItem value="UserDisplayName">By User</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="form-field">
          <InputLabel id="demo-simple-select-label">Group by date</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={groupByDate}
            label="Group by date"
            onChange={(e) => setGroupByDate(e.target.value)}
          >
            <MenuItem value="Day">By Day</MenuItem>
            <MenuItem value="Month">By Month</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="startDate"
          label="Start Date"
          type="date"
          defaultValue={startDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(newValue) => {
            setStartDate(newValue.target.value);
          }}
        />
        <TextField
          id="endDate"
          label="End Date"
          type="date"
          defaultValue={endDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(newValue) => {
            setEndDate(newValue.target.value);
          }}
        />
        <Button
          size="large"
          onClick={() =>
            setGroupedData(
              groupDataFunction(
                groupByFieldName,
                groupByDate,
                startDate,
                endDate,
                data
              )
            )
          }
        >
          Display
        </Button>
      </form>
      {groupedData && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Group by {groupByFieldName}</TableCell>
                {groupedData[Object.keys(groupedData)[0]].map((item) => (
                  <TableCell align="right">{item.PeriodStr}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(groupedData).map((row) => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                  {groupedData[row].map((item) => (
                    <TableCell align="right">{item.Value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
}
