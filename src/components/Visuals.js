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

import Amps from "./graphs/Amps";
import BatteryVolts from "./graphs/BatteryVolts";
import InvADC from "./graphs/InvADC";
import SoC from "./graphs/SoC";
import SolarWatts from "./graphs/SolarWatts";
import Watts from "./graphs/Watts";
import OutbackPvVolts from "./graphs/OutbackPvVolts";

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
                <Watts daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <SoC daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <Amps daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <BatteryVolts daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <InvADC daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <SolarWatts daysHistory={this.state.daysHistory} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12} />
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em" }}>
                <OutbackPvVolts daysHistory={this.state.daysHistory} />
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
