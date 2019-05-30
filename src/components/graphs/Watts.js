import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { wattsGraphOptions } from "../../options/wattsGraph";

let interval;
class Watts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wattsOptions: wattsGraphOptions,
      loading: true
    };
  }

  handleDataRefresh() {
    this.setState({ loading: true });
    const url =
      "http://rockjock.io:3050/api/stats/watts/" + this.props.daysHistory;
    fetch(url)
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
      })
      .then(() => this.setState({ loading: false }));
  }

  componentDidMount() {
    Highcharts.setOptions({
      time: {
        timezone: "America/Chicago",
        useUTC: false
      }
    });
    this.handleDataRefresh();
    interval = setInterval(() => {
      this.handleDataRefresh();
    }, 30000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loading) {
      if (prevProps.daysHistory !== this.props.daysHistory) {
        clearInterval(interval);
        this.handleDataRefresh();
        interval = setInterval(() => {
          this.handleDataRefresh();
        }, 30000);
      }
    }
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
