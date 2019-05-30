import React from "react";

import {
  Container,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";
import Slider from "@material-ui/lab/Slider";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import Amps from "./graphs/Amps";
import BatteryVolts from "./graphs/BatteryVolts";
import InvADC from "./graphs/InvADC";
import SoC from "./graphs/SoC";
import SolarWatts from "./graphs/SolarWatts";
import Watts from "./graphs/Watts";
import { outbackPvVoltsGraphOptions } from "../options/outbackPvVolts";

import "../css/Visuals.css";
import "typeface-roboto";

class Visuals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      outbackPvVoltsOptions: outbackPvVoltsGraphOptions
    };
  }

  handleSliderChange(event, value) {
    this.setState({ value: value });
  }

  handleDataRefresh() {
    // Get Outback PV Volts Graph Data
    fetch("http://rockjock.io:3050/api/stats/outback_pv_volts")
      .then(response => response.json())
      .then(newData => {
        this.setState(prevState => ({
          outbackPvVoltsOptions: {
            ...prevState.options,
            series: {
              ...prevState.series,
              data: newData
            }
          }
        }));
      });
  }

  componentDidMount() {
    Highcharts.setOptions({
      time: {
        timezone: "America/Chicago",
        useUTC: false
      }
    });
    this.handleDataRefresh();
    setInterval(() => {
      this.handleDataRefresh();
    }, 30000);
  }

  render() {
    return (
      <div>
        <Container maxWidth={false} className={"grid"}>
          <Grid container spacing={1}>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Watts />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <SoC />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Amps />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <BatteryVolts />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <InvADC />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <SolarWatts />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12} />
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.outbackPvVoltsOptions}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12} />
            <Grid item lg={4} xs={12} />
            <Grid item lg={4} xs={12}>
              <Card className={"root"}>
                <CardContent>
                  <Typography
                    variant={"h6"}
                    color="textSecondary"
                    gutterBottom
                    align="center"
                  >
                    # of Days to Display in Graphs.
                  </Typography>
                  <Slider
                    className={"slider"}
                    value={this.state.value}
                    min={1}
                    max={7}
                    step={1}
                    onChange={this.handleSliderChange.bind(this)}
                  />
                </CardContent>
                <CardActions>
                  <Typography
                    variant="h6"
                    display="block"
                    color="textSecondary"
                    gutterBottom
                    align="center"
                  >
                    {this.state.value}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
            <Grid item lg={4} xs={12} />
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Visuals;
