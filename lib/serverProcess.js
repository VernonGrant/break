'use babel';

import path from 'path';
import http from 'http';
import childProcess from 'child_process';

const serverScriptPath = path.normalize(path.join(__dirname, '/server', '/main.js'));

export default class ServerProcess{

    constructor(port, host = '0.0.0.0'){
        this.port = port;
        this.host = host;
        this.childProcess = null;
    }

    startServer(){
        this.childProcess = childProcess.spawn('node', [serverScriptPath], {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        });
        return this.childProcess;
    }

    checkRunningState(){
        return new Promise((resolve, reject) => {
            http.get(this.getUrl(), (response) =>{
                response.resume();
                resolve(response.statusCode);
            }).on('error', (err) => {
                reject(err);
            });
        });
    }

    getUrl(){
        return `http://${this.host}:${this.port}`;
    }

}
