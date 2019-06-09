import Highcharts from "highcharts";
import HighchartsBoost from "highcharts/modules/boost";

HighchartsBoost(Highcharts);

export const solarWattsGraphOptions = {
  boost: {
    enabled: false,
    seriesThreshold: 1
  },
  chart: {
    animation: false,
    zoomType: "x"
  },
  title: {
    text: "Solar Panel Watts"
  },
  // tooltip: {
  //   formatter: function() {
  //     return (
  //       "Date: " +
  //       Highcharts.dateFormat("%b %e %Y %H:%M:%S ", new Date(this.x)) +
  //       "<br />Solar Panel Volts: " +
  //       this.point.Volts +
  //       "<br />Solar Panel Amps: " +
  //       this.point.Amps +
  //       "<br />Solar Charger Watts: " +
  //       this.point.SolarWatts +
  //       "<br />Solar Charger Status: " +
  //       this.point.Solar_Charger_Status
  //     );
  //   }
  // },
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
    },
    series: {
      animation: false
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
};

export const solarWattsGraphUrl = "http://rockjock.io:3050/api/stats/solarwatts/";