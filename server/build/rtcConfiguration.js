"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var stunServer = process.env.STUN_SERVER || 'stun:stun.1.google.com:19302';
var turnMode = process.env.TURN_MODE || 'default';
var turnServer = process.env.TURN_SERVER || null;
var turnUsername = process.env.TURN_USERNAME || null;
var turnCredential = process.env.TURN_CREDENTIAL || null;
var turnSecret = process.env.TURN_SECRET || null;
var turnExpiry = parseInt(process.env.TURN_EXPIRY) || 3600;
var rtcConfiguration = function (clientId) {
    var iceServers = [];
    iceServers.push({
        urls: stunServer,
    });
    if (turnServer && turnUsername) {
        if (turnMode === 'hmac' && turnSecret) {
            var timestamp = Math.floor(new Date().getTime() / 1000) + turnExpiry;
            var username = timestamp + ':' + clientId;
            var hmac = crypto_1.default.createHmac('sha1', turnSecret);
            hmac.setEncoding('base64');
            hmac.write(username);
            hmac.end();
            iceServers.push({
                urls: turnServer,
                username: username,
                credential: hmac.read(),
            });
        }
        else if (turnCredential) {
            iceServers.push({
                urls: turnServer,
                username: turnUsername,
                credential: turnCredential,
            });
        }
    }
    return {
        iceServers: iceServers,
    };
};
exports.default = rtcConfiguration;
