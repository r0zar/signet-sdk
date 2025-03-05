"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internal = exports.initializeSignetSDK = void 0;
// Public API exports
var api_injector_1 = require("./core/api-injector");
Object.defineProperty(exports, "initializeSignetSDK", { enumerable: true, get: function () { return api_injector_1.initializeSignetSDK; } });
// Internal namespace for extension use
const message_handlers_1 = require("./core/message-handlers");
exports.internal = {
    setupMessageHandlers: message_handlers_1.setupMessageHandlers
};
