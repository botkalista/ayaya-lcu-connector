const child_process = require('child_process');

/**
 * Every `delay` ms checks if the client is open. Resolves when finds the client process.
 * 
 * @param {number} [delay=2000]
 */
async function waitForClient(delay = 2000) {
    do {
        await new Promise((res, rej) => {
            setTimeout(res, delay);
        });
    } while (!child_process.execSync('tasklist').toString().includes('LeagueClient.exe'));
}


/**
 * Gets league client connection.
 */
async function getConnection() {
    try {
        const stdout = await child_process.execSync("WMIC PROCESS WHERE name='LeagueClientUx.exe' GET CommandLine");
        const out = stdout.toString();
        const token = out.match(/--remoting-auth-token=(.*?)"/)[1];
        const port = out.match(/--app-port=(.*?)"/)[1];
        return { token, port };
    } catch {
        console.log('Error getting connection.');
        return;
    }
}

module.exports = {
    waitForClient,
    getConnection
}