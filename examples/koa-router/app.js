const { UniversalBot } = require("botbuilder");
const { KoaChatConnector } = require("../../");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const connector = new KoaChatConnector();
const bot = new UniversalBot(connector, (session) => {
    session.send(`You said: ${session.message.text}`)
});

const router = new Router();
router.post("/api/messages", connector.listen());

const server = new Koa();

server.use(bodyParser());
server.use(router.routes());
server.use(router.allowedMethods());

server.listen(3000, () => {
    console.log("Started listening on port 3000");
});
