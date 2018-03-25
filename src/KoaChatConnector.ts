import { ChatConnector, IChatConnectorSettings } from 'botbuilder';
import { Middleware } from 'koa';

export class KoaChatConnector extends ChatConnector {

    constructor(settings?: IChatConnectorSettings) {
        super(settings);
    }

    public listen(): Middleware {
        const _listen = super.listen();

        return async (ctx, next) => {
            if (!(ctx.request as any).body) {
                // todo: properly handle erroneous requests with empty bodies (allow ChatConnector to log them)
                throw new Error("Please use a body parser middleware to parse request bodies.");
            }

            await new Promise(resolve => {
                const req = ctx.request;
                const res = {
                    send(status: number, body?: any) {
                        ctx.status = status;
                        ctx.body = body;
                    },
                    status(code: number) {
                        ctx.status = code;
                    },
                    end() {
                        resolve();
                    }
                };

                _listen(req, res);
            })
            
            await next();
        };
    }

}
