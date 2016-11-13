'use babel';

import path from 'path';
import http from 'http';
import childProcess from 'child_process';

const serverScriptPath = path.normalize(path.join(__dirname, '/server', '/main.js'));
const hostname = 'localhost';

export default class ServerProcess{

    constructor(port, host = hostname){
        this.port = port;
        this.host = host;
    }

    /**
     * Starts the external server process.
     */
    startServer(socket){
        return childProcess.fork(serverScriptPath, [], {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        });
    }

    /**
     * Checks if the server is running.
     *
     * @returns {Promise}
     */
    checkRunningState(){
        return new Promise((resolve, reject) => {
            http.get(this.getUrl(), (response) =>{
                response.resume();
                resolve(response);
            }).on('error', (err) => {
                reject(err);
            });
        });
    }

    /**
     * Returns the url of the server
     *
     * @returns {String}
     */
    getUrl(){
        return `http://${this.host}:${this.port}`;
    }

}
