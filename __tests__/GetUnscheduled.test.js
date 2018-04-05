//Jordan's Test

const fn = require('../src/utils/JFunctions');
import axios from 'axios';

it('Gets a users unscheduled tasks', () => {
    Promise.all(fn.getUnscheduled(3)).then(values => {
        expect(values[0].userid).toEqual(3);
    });
});