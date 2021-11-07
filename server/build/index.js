"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_flow_1 = __importDefault(require("dotenv-flow"));
dotenv_flow_1.default.config();
var ws_1 = __importDefault(require("ws"));
var WSClient_1 = require("./WSClient");
var ClientManager_1 = require("./ClientManager");
var typeChecking_1 = require("./types/typeChecking");
// Configuration
var host = process.env.WS_HOST || '0.0.0.0';
var port = parseInt(process.env.WS_PORT) || 5000;
var wss = new ws_1.default.Server({ host: host, port: port });
var clientManager = new ClientManager_1.ClientManager();
wss.on('connection', function (ws, req) {
    var client = new WSClient_1.WSClient(ws, req);
    clientManager.addClient(client);
    ws.on('error', function (error) {
        console.log('[ERROR (Handled)]', error.message);
    });
    ws.on('message', function (data) {
        // Prevents DDoS and abuse.
        if (!data || data.length > ClientManager_1.maxSize)
            return;
        try {
            var message = JSON.parse(data);
            if (typeChecking_1.isMessageModel(message)) {
                clientManager.handleMessage(client, message);
            }
        }
        catch (e) { }
    });
    ws.on('close', function () {
        clientManager.removeClient(client);
    });
});
setInterval(function () {
    clientManager.removeBrokenClients();
}, 1000);
// Ping clients to keep the connection alive (when behind nginx)
setInterval(function () {
    clientManager.pingClients();
}, 5000);
setInterval(function () {
    clientManager.removeInactiveClients();
}, 10000);
console.log('Server running');
