import 'react-native';
import React from 'react';
import SideBar from '../components/DrawerMenu/SideBar';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <SideBar />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});



// Ross Test