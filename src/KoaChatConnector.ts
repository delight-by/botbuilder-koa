import { ChatConnector } from 'botbuilder';
import { Middleware } from 'koa';

export class KoaChatConnector extends ChatConnector {

    public listen(): Middleware {
        const _listen = super.listen();

        return async (ctx, next) => {
            if (!(ctx.request as any).body) {
                throw new Error("Request body is missing. Please make sure you have a body parsing middleware properly configured.");
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
