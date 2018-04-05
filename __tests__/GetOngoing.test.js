//Jordan's Test

const fn = require('../src/utils/JFunctions');
import axios from 'axios';

it('Ongoing task starttime is not null', () => {
    Promise.all(fn.getOngoing(3)).then(values => {
        expect(values[0].starttime).toBeNull();
    });
});