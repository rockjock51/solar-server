import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { ampGraphOptions } from "../../options/ampGraph";

class Amps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: ampGraphOptions
    };
  }

  handleDataRefresh() {
    fetch("http://rockjock.io:3050/api/stats/amps")
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
      <HighchartsReact highcharts={Highcharts} options={this.state.options} />
    );
  }
}

export default Amps;
