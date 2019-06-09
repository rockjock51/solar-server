import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();

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
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loading) {
      if (prevProps.daysHistory !== this.props.daysHistory) {
        this.handleDataRefresh();
      }
    }
  }

  render() {
    return (
      <HighchartsReact highcharts={Highcharts} options={this.state.options} constructorType={'stockChart'} ref={this.chart} />
    );
  }
}

export default Graph;
