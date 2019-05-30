import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { invAdcGraphOptions } from "../../options/invAdcGraph";

let interval;
class InvADC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: invAdcGraphOptions,
      loading: true
    };
  }

  handleDataRefresh() {
    this.setState({ loading: true });
    const url =
      "http://rockjock.io:3050/api/stats/INV_adc/" + this.props.daysHistory;
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
        this.interval = setInterval(() => {
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

export default InvADC;
