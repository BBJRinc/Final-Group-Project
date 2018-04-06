const fns = require('./RossFunctions');

describe('testing for returned days', () => {

    test('testing for returned tasks on a day', () => {
        Promise.all(fns.getPreviousDay()).then(result => {
            expect(result[0]).toBe([]);
        })
    })
})

describe('testing for correct id on returned reponses', () => {

    test('submitting a comment by taskid correctly', () => {
        Promise.all(fns.submitComment()).then(result => {
            expect(result[0].taskid).toEqual(18);
            expect(result[0].userid).toEqual(2);
        }).catch(err => console.log(err));
    })

    


})