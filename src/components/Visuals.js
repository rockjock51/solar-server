import React from "react";

import { Container, Paper, Grid } from "@material-ui/core";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../css/Visuals.css";

class Visuals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.handleDataRefresh();
    setInterval(() => {
      this.handleDataRefresh();
    }, 30000);
  }

  render() {
    return (
      <div>
        <Container maxwidth="false" height={300} className={"grid"}>
          <Grid container spacing={1}>
            <Grid item lg={4}>
              <Paper style={{ height: "30em" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.options}
                />
              </Paper>
            </Grid>
            <Grid item lg={4}>
              <Paper style={{ height: "30em" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.options}
                />
              </Paper>
            </Grid>
            <Grid item lg={4}>
              <Paper style={{ height: "30em" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.options}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Visuals;
