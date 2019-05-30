import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { solarWattsGraphOptions } from "../../options/solarWattsGraph";

let interval;
class SolarWatts extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();

    this.state = {
      options: solarWattsGraphOptions,
      loading: true
    };
  }

  handleDataRefresh() {
    this.setState({ loading: true });
    this.chart.current.chart.showLoading();
    const url =
      "http://rockjock.io:3050/api/stats/solarwatts/" + this.props.daysHistory;
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
        constructorType={"chart"}
        highcharts={Highcharts}
        options={this.state.options}
        ref={this.chart}
      />
    );
  }
}

export default SolarWatts;
