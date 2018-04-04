import 'react-native';
import React from 'react';
import DayViewHeader from '../components/DayViewHeader/DayViewHeader';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <DayViewHeader />
  ).toJSON();
  expect(tree).toMatchSnapshot();;
});

// Ross Test