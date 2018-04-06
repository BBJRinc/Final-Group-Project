// Brandons tests

import React, { Component } from 'react';
import AddTask from '../components/TaskDetails/AddTask';


import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<AddTask />).toJSON();
    expect(tree).toMatchSnapshot();
});

const BFunctions = require('../src/utils/BFunctions')
it('should change value', () => {
    let handleChange = renderer.create(<AddTask />).getInstance();
    handleChange.handleTaskName('some_text')
})
