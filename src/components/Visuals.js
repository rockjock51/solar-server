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

import { wattsGraphOptions } from "../options/wattsGraph";
import { socGraphOptions } from "../options/socGraph";
import { ampGraphOptions } from "../options/ampGraph";
import { batteryVoltsGraphOptions } from "../options/batteryVoltsGraph";
import { solarWattsGraphOptions } from "../options/solarWattsGraph";
import { invAdcGraphOptions } from "../options/invAdcGraph";
import { outbackPvVoltsGraphOptions } from "../options/outbackPvVolts";

import "../css/Visuals.css";
import "typeface-roboto";

class Visuals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      wattsOptions: wattsGraphOptions,
      socOptions: socGraphOptions,
      ampOptions: ampGraphOptions,
      batteryVoltsOptions: batteryVoltsGraphOptions,
      solarWattsOptions: solarWattsGraphOptions,
      invAdcOptions: invAdcGraphOptions,
      outbackPvVoltsOptions: outbackPvVoltsGraphOptions
    };
  }

  handleSliderChange(event, value) {
    this.setState({ value: value });
  }

  handleDataRefresh() {
    // Get Watts Graph Data
    fetch("http://solar-cert:3050/api/stats/watts")
      .then(response => response.json())
      .then(newData => {
        this.setState(prevState => ({
          wattsOptions: {
            ...prevState.options,
            series: {
              ...prevState.series,
              data: newData
            }
          }
        }));
      });

    // Get SoC Graph Data
    fetch("http://solar-cert:3050/api/stats/soc")
      .then(response => response.json())
      .then(newData => {
        this.setState(prevState => ({
          socOptions: {
            ...prevState.options,
            series: {
              ...prevState.series,
              data: newData
            }
          }
        }));
      });

    // Get Amp Graph Data
    fetch("http://solar-cert:3050/api/stats/amps")
      .then(response => response.json())
      .then(newData => {
        this.setState(prevState => ({
          ampOptions: {
            ...prevState.options,
            series: {
              ...prevState.series,
              data: newData
            }
          }
        }));
      });

    // Get Battery Volts Graph Data
    fetch("http://solar-cert:3050/api/stats/batteryvolts")
      .then(response => response.json())
      .then(newData => {
        this.setState(prevState => ({
          batteryVoltsOptions: {
            ...prevState.options,
            series: {
              ...prevState.series,
              data: newData
            }
          }
        }));
      });

    // Get Solar Watts Graph Data
    fetch("http://solar-cert:3050/api/stats/solarwatts")
      .then(response => response.json())
      .then(newData => {
        this.setState(prevState => ({
          solarWattsOptions: {
            ...prevState.options,
            series: {
              ...prevState.series,
              data: newData
            }
          }
        }));
      });

    // Get Inverter Amps DC Graph Data
    fetch("http://solar-cert:3050/api/stats/INV_adc")
      .then(response => response.json())
      .then(newData => {
        this.setState(prevState => ({
          invAdcOptions: {
            ...prevState.options,
            series: {
              ...prevState.series,
              data: newData
            }
          }
        }));
      });

    // Get Outback PV Volts Graph Data
    fetch("http://solar-cert:3050/api/stats/outback_pv_volts")
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
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.wattsOptions}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.socOptions}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.ampOptions}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.batteryVoltsOptions}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.invAdcOptions}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.solarWattsOptions}
                />
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
