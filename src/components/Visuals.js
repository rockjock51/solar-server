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

import "../css/Visuals.css";
import "typeface-roboto";

class Visuals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      options: {
        chart: {
          zoomType: "x"
        },
        title: {
          text: "Watts"
        },
        tooltip: {
          formatter: function() {
            return (
              "Date: " +
              Highcharts.dateFormat("%b %e %Y %H:%M:%S ", new Date(this.x)) +
              "<br />Volts: " +
              this.point.Volts +
              "<br />Amps: " +
              this.point.Amps
            );
          }
        },
        subtitle: {
          text:
            document.ontouchstart === undefined
              ? "Click and drag in the plot area to zoom in"
              : "Pinch the chart to zoom in"
        },
        xAxis: {
          type: "datetime"
        },
        yAxis: {
          title: {
            text: "Watts"
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.Color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get("rgba")
                ]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: 0,
            negativeColor: "#800000",
            negativeFillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#FFFFFF"], [1, "#F08080"]]
            }
          }
        },
        series: [
          {
            connectNulls: true,
            turboThreshold: 0,
            parseDate: function(val) {
              console.log(val);
              console.log("Date", Date.parse(val));
              return Date.parse(val);
            },
            type: "area",
            name: "Watts",
            data: null
          }
        ]
      }
    };
  }

  handleSliderChange(event, value) {
    this.setState({ value: value });
  }

  handleDataRefresh() {
    fetch("http://solar-cert:3050/api/stats/watts")
      .then(response => response.json())
      .then(newData => {
        this.setState(prevState => ({
          options: {
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
              <Paper style={{ height: "30em", maxWidth: "90vw" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.options}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em", maxWidth: "90vw" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.options}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: "30em", maxWidth: "90vw" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.options}
                />
              </Paper>
            </Grid>
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
                    variant="subtitle"
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
