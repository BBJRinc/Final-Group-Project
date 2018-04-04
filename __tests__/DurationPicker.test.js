import React from 'react';
import DurationPicker from '../components/TaskDetails/DurationPicker';

import renderer from 'react-test-renderer';
// import {updateHour} from '../components/TaskDetails/DurationPicker';

test('renders correctly', () => {
    const tree = renderer.create(<DurationPicker />).toJSON();
    expect(tree).toMatchSnapshot();
});

