import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  Divider,
  ListItemIcon,
  Typography,
  Grid,
  Chip,
  ListItemText,
  LinearProgress,
  Dialog,
  Paper,
  Modal,
} from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { getConfig } from "../authConfig";

const FuelQuoteHistory = () => {
  const [quotes, setQuotes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9000/fuel_quote/all_quotes", getConfig())
      .then((res) => {
        console.log(res);
        setQuotes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? null : (
        <>
          {quotes.length == 0 ? (
            <Typography>No Quotes</Typography>
          ) : (
            <TableContainer component={Paper} style={{ width: 1200 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Quote Number</TableCell>
                    <TableCell align="center">Gallons Requested</TableCell>
                    <TableCell align="center">Delivery Address</TableCell>
                    <TableCell align="center">Delivery Date</TableCell>
                    <TableCell align="center">Suggested Price/Gallon</TableCell>
                    <TableCell align="center">Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quotes.map((quote) => (
                    <TableRow key={quote.quote_id}>
                      <TableCell align="center" component="th" scope="row">
                        {quote.quote_id}
                      </TableCell>
                      <TableCell align="center">{quote.gallons}</TableCell>
                      <TableCell align="center">{quote.address}</TableCell>
                      <TableCell align="center">
                        {quote.delivery_date}
                      </TableCell>
                      <TableCell align="center">{`$${quote.suggested_price}`}</TableCell>
                      <TableCell align="center">{`$${quote.total_amount}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
};

export default FuelQuoteHistory;
