process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const ClientManager = require('./components/ClientManager');
const Requester = require('./components/Requester');
const EventListener = require('./components/EventListener');

class AyayaLcuConnector {

    constructor() {
        /** @private */
        this.connection = undefined;
        /** @private */
        this.ws = undefined;
    }

    async connect() {
        await ClientManager.waitForClient();
        const conn = await ClientManager.getConnection();
        this.connection = conn;
    }

    /**
    * @param {string} method 
    * @param {string} endpoint 
    * @param {any|string} [data] 
    * @returns {any|string}
    */
    async makeRequest(method, endpoint, data) {
        return await Requester.makeRequest(this.connection, method, endpoint, data);
    }

    /**
     * @param {(data,eventType,uri)=>void} onEvent 
     */
    async listenForEvents(onEvent) {
        this.ws = await EventListener.listenForEvents(this.connection, onEvent);
    }

}


module.exports = AyayaLcuConnector;
