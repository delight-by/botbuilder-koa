/// <reference types="koa" />
import { ChatConnector, IChatConnectorSettings } from 'botbuilder';
import { Middleware } from 'koa';
export declare class KoaChatConnector extends ChatConnector {
    constructor(settings?: IChatConnectorSettings);
    listen(): Middleware;
}
