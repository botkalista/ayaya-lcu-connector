const ws = require('ws');

/**
 * 
 * @param {(data,eventType,uri)=>void} handleEvent 
 * @returns {ws}
 */
async function listenForEvents(connection, handleEvent) {
    try {

        const listener = new ws(`https://riot:${connection.token}@127.0.0.1:${connection.port}`, 'wamp', {});

        listener.on('open', () => listener.send('[5,"OnJsonApiEvent"]'));
        listener.on('message', data => {
            const payload = JSON.parse(data.toString());
            const resNum = payload[0];
            const content = payload[2];
            if (resNum == 8) {
                const { data, eventType, uri } = content;
                handleEvent(data, eventType, uri);
            }
        });

        return listener;
    } catch (ex) {
        console.log('Error listening events.');
        console.log(ex);
        return;
    }

}

module.exports = { listenForEvents }