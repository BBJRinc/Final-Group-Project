//Brandons Test

import React from 'react';
import Labels from '../components/TaskDetails/Labels'

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Labels />).toJSON();
    expect(tree).toMatchSnapshot();
});


