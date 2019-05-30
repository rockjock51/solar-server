import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { batteryVoltsGraphOptions } from "../../options/batteryVoltsGraph";

class BatteryVolts extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.interval = null;

    this.state = {
      options: batteryVoltsGraphOptions,
      loading: true
    };
  }

  handleDataRefresh() {
    this.setState({ loading: true });
    this.chart.current.chart.showLoading();
    const url =
      "http://rockjock.io:3050/api/stats/batteryvolts/" +
      this.props.daysHistory;
    fetch(url)
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
      })
      .then(() => {
        this.setState({ loading: false });
        this.chart.current.chart.hideLoading();
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
    this.interval = setInterval(() => {
      this.handleDataRefresh();
    }, 30000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loading) {
      if (prevProps.daysHistory !== this.props.daysHistory) {
        clearInterval(this.interval);
        this.handleDataRefresh();
        this.interval = setInterval(() => {
          this.handleDataRefresh();
        }, 30000);
      }
    }
  }

  render() {
    return (
      <HighchartsReact highcharts={Highcharts} options={this.state.options} ref={this.chart} />
    );
  }
}

export default BatteryVolts;
