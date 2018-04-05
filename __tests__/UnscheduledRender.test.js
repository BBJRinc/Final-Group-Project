//Jordan's test

import React from 'react';
import Unscheduled from '../components/Unscheduled/Unscheduled';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Unscheduled />).toJSON();
    expect(tree).toMatchSnapshot();
});