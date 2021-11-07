"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionMessageActionType = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["WELCOME"] = "welcome";
    MessageType["NAME"] = "name";
    MessageType["TRANSFER"] = "transfer";
    MessageType["ACTION"] = "action";
    MessageType["NETWORK"] = "network";
    MessageType["PING"] = "ping";
    MessageType["RTC_DESCRIPTION"] = "rtcDescription";
    MessageType["RTC_CANDIDATE"] = "rtcCandidate";
    MessageType["ENCRYPTED"] = "encrypted";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var ActionMessageActionType;
(function (ActionMessageActionType) {
    ActionMessageActionType["ACCEPT"] = "accept";
    ActionMessageActionType["REJECT"] = "reject";
    ActionMessageActionType["CANCEL"] = "cancel";
})(ActionMessageActionType = exports.ActionMessageActionType || (exports.ActionMessageActionType = {}));
