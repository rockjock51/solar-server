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

import Graph from "./Graph";

import {wattsGraphOptions, wattsGraphUrl} from "../options/wattsGraph";
import {ampGraphOptions, ampGraphUrl} from "../options/ampGraph";
import {batteryVoltsGraphOptions, batteryVoltsGraphUrl} from "../options/batteryVoltsGraph";
import {invAdcGraphOptions, invAdcGraphUrl} from "../options/invAdcGraph";
import {socGraphOptions, socGraphUrl} from "../options/socGraph";
import {solarWattsGraphOptions, solarWattsGraphUrl} from "../options/solarWattsGraph";
import {outbackPvVoltsGraphOptions, outbackPvVoltsGraphUrl} from "../options/outbackPvVolts";

import "../css/Visuals.css";
import "typeface-roboto";

class Visuals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      daysHistory: 2
    };
  }

  handleSliderChange(event, value) {
    this.setState({ daysHistory: value });
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Container maxWidth={false} className={"grid"}>
          <Grid container spacing={1}>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Graph initialOptions={wattsGraphOptions} url={wattsGraphUrl} daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Graph initialOptions={socGraphOptions} url={socGraphUrl} daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Graph initialOptions={ampGraphOptions} url={ampGraphUrl} daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Graph initialOptions={batteryVoltsGraphOptions} url={batteryVoltsGraphUrl} daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Graph initialOptions={invAdcGraphOptions} url={invAdcGraphUrl} daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Graph initialOptions={solarWattsGraphOptions} url={solarWattsGraphUrl} daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12} />
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Graph initialOptions={outbackPvVoltsGraphOptions} url={outbackPvVoltsGraphUrl} daysHistory={this.state.daysHistory} />
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
                    value={this.state.daysHistory}
                    min={1}
                    max={7}
                    step={1}
                    onChange={this.handleSliderChange.bind(this)}
                  />
                </CardContent>
                <CardActions>
                  <Typography
                    variant={"h6"}
                    display="block"
                    color="textSecondary"
                    gutterBottom
                    align="center"
                  >
                    {this.state.daysHistory}
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
