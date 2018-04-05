//Jordan's test

import React from 'react';
import Ongoing from '../components/Ongoing/Ongoing';

import renderer from 'react-test-renderer';

test('Ongoing displays correctly', () => {
    const tree = renderer.create(<Ongoing />).toJSON();
    expect(tree).toMatchSnapshot();
});