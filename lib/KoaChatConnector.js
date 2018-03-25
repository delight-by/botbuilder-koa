"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
class KoaChatConnector extends botbuilder_1.ChatConnector {
    constructor(settings) {
        super(settings);
    }
    listen() {
        const _listen = super.listen();
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            if (!ctx.request.body) {
                // todo: properly handle erroneous requests with empty bodies (allow ChatConnector to log them)
                throw new Error("Please use a body parser middleware to parse request bodies.");
            }
            yield new Promise(resolve => {
                const req = ctx.request;
                const res = {
                    send(status, body) {
                        ctx.status = status;
                        ctx.body = body;
                    },
                    status(code) {
                        ctx.status = code;
                    },
                    end() {
                        resolve();
                    }
                };
                _listen(req, res);
            });
            yield next();
        });
    }
}
exports.KoaChatConnector = KoaChatConnector;
