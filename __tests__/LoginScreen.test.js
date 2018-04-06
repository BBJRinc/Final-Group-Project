import 'react-native';
import React from 'react';
import LoginScreen from '../components/LoginScreen/LoginScreen';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <LoginScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});



// Ross Test