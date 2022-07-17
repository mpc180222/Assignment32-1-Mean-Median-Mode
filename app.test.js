const { mean, median, mode }  = require("./app");



test('mean should return mean', function(){

let mean2 = mean([5,10,15]);
expect(mean2).toEqual(10);
})

test('median should return median', function(){

    let median2 = median([5,10,15]);
    expect(median2).toEqual(10);
    })

 test('mode should return mode', function(){

        let mode2 = mode([5,10,10,15]);
        expect(mode2).toEqual(10);
        })