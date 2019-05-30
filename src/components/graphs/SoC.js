import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { socGraphOptions } from "../../options/socGraph";

let interval;
class SoC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: socGraphOptions,
      loading: true
    };
  }

  handleDataRefresh() {
    this.setState({ loading: true });
    const url =
      "http://rockjock.io:3050/api/stats/soc/" + this.props.daysHistory;
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
    setInterval(() => {
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
      <HighchartsReact highcharts={Highcharts} options={this.state.options} />
    );
  }
}

export default SoC;
