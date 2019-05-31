import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.interval = null;

    this.state = {
      options: this.props.initialOptions,
      loading: true
    };
  }

  handleDataRefresh() {
    this.setState({ loading: true });
    this.chart.current.chart.showLoading();
    const url =
      this.props.url + this.props.daysHistory;
    fetch(url)
      .then(response => response.json())
      .then(newData => {
        console.log(newData + this.props.url);
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
        console.log("Updating!" + this.props.url);
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

export default Graph;
