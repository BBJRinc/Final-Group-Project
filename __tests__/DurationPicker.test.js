// Brandons tests

import React from 'react';
import DurationPicker from '../components/TaskDetails/DurationPicker';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<DurationPicker />).toJSON();
    expect(tree).toMatchSnapshot();
});

