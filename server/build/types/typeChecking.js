"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEncryptedMessageModel = exports.isRTCCandidateMessageModel = exports.isRTCDescriptionMessageModel = exports.isActionMessageModel = exports.isTransferMessageModel = exports.isNameMessageModel = exports.isMessageModel = void 0;
var MessageType_1 = require("./MessageType");
function isMessageModel(message) {
    return message && 'type' in message && typeof message['type'] === 'string';
}
exports.isMessageModel = isMessageModel;
function isNameMessageModel(message) {
    return (message.type === MessageType_1.MessageType.NAME &&
        'networkName' in message &&
        typeof message['networkName'] === 'string');
}
exports.isNameMessageModel = isNameMessageModel;
function isTransferMessageModel(message) {
    return (message.type === MessageType_1.MessageType.TRANSFER &&
        'transferId' in message &&
        typeof message['transferId'] === 'string' &&
        'fileName' in message &&
        typeof message['fileName'] === 'string' &&
        'fileSize' in message &&
        typeof message['fileSize'] === 'number' &&
        'fileType' in message &&
        typeof message['fileType'] === 'string' &&
        'targetId' in message &&
        typeof message['targetId'] === 'string');
}
exports.isTransferMessageModel = isTransferMessageModel;
function isActionMessageModel(message) {
    return (message.type === MessageType_1.MessageType.ACTION &&
        'transferId' in message &&
        typeof message['transferId'] === 'string' &&
        'action' in message &&
        typeof message['action'] === 'string' &&
        'targetId' in message &&
        typeof message['targetId'] === 'string' &&
        Object.values(MessageType_1.ActionMessageActionType).includes(message['action']));
}
exports.isActionMessageModel = isActionMessageModel;
function isRTCDescriptionMessageModel(message) {
    return (message.type === MessageType_1.MessageType.RTC_DESCRIPTION &&
        'data' in message &&
        typeof message['data'] === 'object' &&
        'type' in message['data'] &&
        typeof message['data']['type'] === 'string' &&
        'sdp' in message['data'] &&
        typeof message['data']['sdp'] === 'string' &&
        'targetId' in message &&
        typeof message['targetId'] === 'string' &&
        'transferId' in message &&
        typeof message['transferId'] === 'string');
}
exports.isRTCDescriptionMessageModel = isRTCDescriptionMessageModel;
function isRTCCandidateMessageModel(message) {
    return (message.type === MessageType_1.MessageType.RTC_CANDIDATE &&
        'data' in message &&
        typeof message['data'] === 'object' &&
        'targetId' in message &&
        typeof message['targetId'] === 'string' &&
        'transferId' in message &&
        typeof message['transferId'] === 'string');
}
exports.isRTCCandidateMessageModel = isRTCCandidateMessageModel;
function isEncryptedMessageModel(message) {
    return (message.type === MessageType_1.MessageType.ENCRYPTED &&
        'payload' in message &&
        typeof message['payload'] === 'string' &&
        'targetId' in message &&
        typeof message['targetId'] === 'string');
}
exports.isEncryptedMessageModel = isEncryptedMessageModel;
