const LCU = require('../src/index');

const lcu = new LCU();

lcu.connect().then(() => {

    lcu.listenForEvents((data, type, uri) => {
        console.log(type + ' ' + uri);
    })

});