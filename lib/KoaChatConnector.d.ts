/// <reference types="koa" />
import { ChatConnector } from 'botbuilder';
import { Middleware } from 'koa';
export declare class KoaChatConnector extends ChatConnector {
    listen(): Middleware;
}
