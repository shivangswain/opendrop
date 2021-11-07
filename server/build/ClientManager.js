"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientManager = exports.noticeUrl = exports.noticeText = exports.maxSize = void 0;
var rtcConfiguration_1 = __importDefault(require("./rtcConfiguration"));
var typeChecking_1 = require("./types/typeChecking");
var MessageType_1 = require("./types/MessageType");
exports.maxSize = parseInt(process.env.WS_MAX_SIZE) || 65536;
exports.noticeText = process.env.NOTICE_TEXT;
exports.noticeUrl = process.env.NOTICE_URL;
var ClientManager = /** @class */ (function () {
    function ClientManager() {
        this.clients = [];
        this.sendNetworkMessage = this.sendNetworkMessage.bind(this);
    }
    ClientManager.prototype.addClient = function (client) {
        var localClients = this.getLocalClients(client);
        var suggestedName = null;
        if (localClients.length > 0) {
            suggestedName = localClients[0].networkName;
        }
        this.clients.push(client);
        client.send(JSON.stringify({
            type: MessageType_1.MessageType.WELCOME,
            clientId: client.clientId,
            clientColor: client.clientColor,
            suggestedName: suggestedName,
            rtcConfiguration: rtcConfiguration_1.default(client.clientId),
            maxSize: exports.maxSize,
            noticeText: exports.noticeText,
            noticeUrl: exports.noticeUrl,
        }));
    };
    ClientManager.prototype.handleMessage = function (client, message) {
        client.lastSeen = new Date();
        if (typeChecking_1.isNameMessageModel(message)) {
            client.publicKey = message.publicKey;
            client.setNetworkName(message.networkName.toUpperCase(), this.sendNetworkMessage);
        }
        else if (typeChecking_1.isActionMessageModel(message) ||
            typeChecking_1.isRTCDescriptionMessageModel(message) ||
            typeChecking_1.isRTCCandidateMessageModel(message) ||
            typeChecking_1.isEncryptedMessageModel(message)) {
            this.sendMessage(client.clientId, message);
        }
        else if (typeChecking_1.isTransferMessageModel(message)) {
            // Ensure all previews are data URLs for safety.
            if (message.preview &&
                (typeof message.preview !== 'string' ||
                    !message.preview.startsWith('data:'))) {
                return;
            }
            this.sendMessage(client.clientId, message);
        }
    };
    ClientManager.prototype.sendMessage = function (fromClientId, message) {
        if (!message.targetId || message.targetId === fromClientId) {
            return;
        }
        var data = JSON.stringify(__assign(__assign({}, message), { clientId: fromClientId }));
        var targets = this.clients.filter(function (c) { return c.clientId === message.targetId; });
        targets.forEach(function (client) { return client.send(data); });
    };
    ClientManager.prototype.sendNetworkMessage = function (networkName) {
        var networkClients = this.clients.filter(function (client) { return client.networkName === networkName; });
        var network = networkClients
            .sort(function (a, b) { return b.firstSeen.getTime() - a.firstSeen.getTime(); })
            .map(function (client) {
            return {
                clientId: client.clientId,
                clientColor: client.clientColor,
                publicKey: client.publicKey,
            };
        });
        var networkMessage = JSON.stringify({
            type: MessageType_1.MessageType.NETWORK,
            clients: network,
        });
        networkClients.forEach(function (client) {
            try {
                client.send(networkMessage);
            }
            catch (_a) { }
        });
    };
    ClientManager.prototype.getLocalClients = function (client) {
        return this.clients
            .filter(function (c) { return c.remoteAddress === client.remoteAddress && c.networkName; })
            .sort(function (a, b) { return b.lastSeen.getTime() - a.lastSeen.getTime(); });
    };
    ClientManager.prototype.pingClients = function () {
        var _this = this;
        var pingMessage = JSON.stringify({
            type: MessageType_1.MessageType.PING,
            timestamp: new Date().getTime(),
        });
        this.clients.forEach(function (client) {
            if (client.readyState !== 1)
                return;
            try {
                client.send(pingMessage);
            }
            catch (_a) {
                _this.removeClient(client);
                client.close();
            }
        });
    };
    ClientManager.prototype.removeClient = function (client) {
        client.setNetworkName(null, this.sendNetworkMessage);
        this.clients = this.clients.filter(function (c) { return c !== client; });
    };
    ClientManager.prototype.removeBrokenClients = function () {
        var _this = this;
        this.clients = this.clients.filter(function (client) {
            if (client.readyState <= 1) {
                return true;
            }
            else {
                client.setNetworkName(null, _this.sendNetworkMessage);
                return false;
            }
        });
    };
    ClientManager.prototype.removeInactiveClients = function () {
        var _this = this;
        var minuteAgo = new Date(Date.now() - 1000 * 20);
        this.clients.forEach(function (client) {
            if (client.readyState !== 1)
                return;
            if (client.lastSeen < minuteAgo) {
                _this.removeClient(client);
                client.close();
            }
        });
    };
    return ClientManager;
}());
exports.ClientManager = ClientManager;
