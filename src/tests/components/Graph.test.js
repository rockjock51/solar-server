import React from 'react';
import {shallow} from 'enzyme';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import {wattsGraphOptions, wattsGraphUrl} from "../../options/wattsGraph";

import Graph from '../../components/Graph';



test('should render Graph correctly', () => {
    const wrapper = shallow(<Graph initialOptions={wattsGraphOptions} url={wattsGraphUrl} daysHistory={2}/>);
    expect(wrapper).toMatchSnapshot();
});