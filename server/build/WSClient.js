"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSClient = void 0;
var uuid_1 = require("uuid");
var randomcolor_1 = __importDefault(require("randomcolor"));
var acceptForwardedFor = process.env.WS_BEHIND_PROXY === 'true' ||
    process.env.WS_BEHIND_PROXY === 'yes';
var WSClient = /** @class */ (function () {
    function WSClient(ws, req) {
        this.ws = ws;
        this.clientId = uuid_1.v4();
        this.clientColor = randomcolor_1.default({ luminosity: 'light' });
        this.firstSeen = new Date();
        this.lastSeen = new Date();
        var address = acceptForwardedFor && req.headers['x-forwarded-for']
            ? req.headers['x-forwarded-for']
            : req.connection.remoteAddress;
        this.remoteAddress = typeof address === 'string' ? address : address[0];
    }
    WSClient.prototype.setNetworkName = function (networkName, networkMessage) {
        var previousName = this.networkName;
        this.networkName = networkName;
        if (previousName) {
            networkMessage(previousName);
        }
        if (networkName) {
            networkMessage(networkName);
        }
    };
    WSClient.prototype.send = function (data) {
        if (this.ws.readyState !== 1) {
            return;
        }
        this.ws.send(data);
    };
    Object.defineProperty(WSClient.prototype, "readyState", {
        get: function () {
            return this.ws.readyState;
        },
        enumerable: false,
        configurable: true
    });
    WSClient.prototype.close = function () {
        this.ws.close();
    };
    return WSClient;
}());
exports.WSClient = WSClient;
