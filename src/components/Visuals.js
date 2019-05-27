import React from "react";

import { Container, Paper, Typography, Grid } from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "japan",
    color: "hsl(259, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 295
      },
      {
        x: "helicopter",
        y: 19
      },
      {
        x: "boat",
        y: 111
      },
      {
        x: "train",
        y: 190
      },
      {
        x: "subway",
        y: 82
      },
      {
        x: "bus",
        y: 229
      },
      {
        x: "car",
        y: 42
      },
      {
        x: "moto",
        y: 191
      },
      {
        x: "bicycle",
        y: 163
      },
      {
        x: "horse",
        y: 214
      },
      {
        x: "skateboard",
        y: 12
      },
      {
        x: "others",
        y: 253
      }
    ]
  },
  {
    id: "france",
    color: "hsl(263, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 182
      },
      {
        x: "helicopter",
        y: 80
      },
      {
        x: "boat",
        y: 173
      },
      {
        x: "train",
        y: 88
      },
      {
        x: "subway",
        y: 208
      },
      {
        x: "bus",
        y: 296
      },
      {
        x: "car",
        y: 25
      },
      {
        x: "moto",
        y: 14
      },
      {
        x: "bicycle",
        y: 9
      },
      {
        x: "horse",
        y: 223
      },
      {
        x: "skateboard",
        y: 296
      },
      {
        x: "others",
        y: 163
      }
    ]
  },
  {
    id: "us",
    color: "hsl(323, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 93
      },
      {
        x: "helicopter",
        y: 272
      },
      {
        x: "boat",
        y: 227
      },
      {
        x: "train",
        y: 133
      },
      {
        x: "subway",
        y: 60
      },
      {
        x: "bus",
        y: 40
      },
      {
        x: "car",
        y: 243
      },
      {
        x: "moto",
        y: 148
      },
      {
        x: "bicycle",
        y: 16
      },
      {
        x: "horse",
        y: 137
      },
      {
        x: "skateboard",
        y: 182
      },
      {
        x: "others",
        y: 115
      }
    ]
  },
  {
    id: "germany",
    color: "hsl(76, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 274
      },
      {
        x: "helicopter",
        y: 55
      },
      {
        x: "boat",
        y: 17
      },
      {
        x: "train",
        y: 228
      },
      {
        x: "subway",
        y: 20
      },
      {
        x: "bus",
        y: 268
      },
      {
        x: "car",
        y: 291
      },
      {
        x: "moto",
        y: 213
      },
      {
        x: "bicycle",
        y: 214
      },
      {
        x: "horse",
        y: 262
      },
      {
        x: "skateboard",
        y: 88
      },
      {
        x: "others",
        y: 117
      }
    ]
  },
  {
    id: "norway",
    color: "hsl(73, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 226
      },
      {
        x: "helicopter",
        y: 220
      },
      {
        x: "boat",
        y: 115
      },
      {
        x: "train",
        y: 11
      },
      {
        x: "subway",
        y: 51
      },
      {
        x: "bus",
        y: 67
      },
      {
        x: "car",
        y: 258
      },
      {
        x: "moto",
        y: 294
      },
      {
        x: "bicycle",
        y: 98
      },
      {
        x: "horse",
        y: 192
      },
      {
        x: "skateboard",
        y: 266
      },
      {
        x: "others",
        y: 250
      }
    ]
  }
];

const Visuals = () => {
  return (
    <div>
      <Container maxWidth="false" height={300}>
        <Grid container spacing={3}>
          <Grid item lg={4}>
            <Paper style={{ height: "30em" }}>
              <Typography variant="h6" color="inherit">
                Chart 1!
              </Typography>
              <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  stacked: true,
                  min: "auto",
                  max: "auto"
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "transportation",
                  legendOffset: 36,
                  legendPosition: "middle"
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "count",
                  legendOffset: -40,
                  legendPosition: "middle"
                }}
                colors={{ scheme: "nivo" }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
              />
            </Paper>
          </Grid>
          <Grid item lg={4}>
            <Paper maxWidth="s" style={{ height: "30em" }}>
              <Typography variant="h6" color="inherit">
                Chart 1!
              </Typography>
              <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  stacked: true,
                  min: "auto",
                  max: "auto"
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "transportation",
                  legendOffset: 36,
                  legendPosition: "middle"
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "count",
                  legendOffset: -40,
                  legendPosition: "middle"
                }}
                colors={{ scheme: "nivo" }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
              />
            </Paper>
          </Grid>
          <Grid item lg={4}>
            <Paper maxWidth="s" style={{ height: "30em" }}>
              <Typography variant="h6" color="inherit">
                Chart 1!
              </Typography>
              <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  stacked: true,
                  min: "auto",
                  max: "auto"
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "transportation",
                  legendOffset: 36,
                  legendPosition: "middle"
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "count",
                  legendOffset: -40,
                  legendPosition: "middle"
                }}
                colors={{ scheme: "nivo" }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Visuals;
