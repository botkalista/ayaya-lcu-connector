const fetch = require('node-fetch');

/**
 * @param {any} connection
 * @param {string} method 
 * @param {string} endpoint 
 * @param {any|string} [data] 
 * @returns {any|string}
 */
async function makeRequest(connection, method, endpoint, data) {

    let body
    if (data && (method !== 'GET' && method !== 'DELETE')) body = typeof data === 'string' ? data : JSON.stringify(data);


    const response = await fetch(`https://127.0.0.1:${connection.port}${endpoint}`, {
        body: body,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from('riot:' + connection.token).toString('base64')
        }
    });

    const text = await response.text();
    try {
        const json = JSON.parse(text);
        return json;
    } catch {
        return text;
    }

}

module.exports = { makeRequest };