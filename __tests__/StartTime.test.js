//Brandons Test

import React from 'react';
import StartTime from '../components/TaskDetails/StartTime'

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<StartTime />).toJSON();
    expect(tree).toMatchSnapshot();
});