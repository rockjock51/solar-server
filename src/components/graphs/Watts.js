import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { wattsGraphOptions } from "../../options/wattsGraph";

class Watts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wattsOptions: wattsGraphOptions
    };
  }

  handleDataRefresh() {
    fetch("http://rockjock.io:3050/api/stats/watts")
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
      <HighchartsReact
        highcharts={Highcharts}
        options={this.state.wattsOptions}
      />
    );
  }
}

export default Watts;
