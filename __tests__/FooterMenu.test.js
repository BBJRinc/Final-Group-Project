//Jordan's test

import React from 'react';
import FooterMenu from '../components/Footer/FooterMenu';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<FooterMenu />).toJSON();
    expect(tree).toMatchSnapshot();
});