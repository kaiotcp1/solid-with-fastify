import fastify from "fastify";
import { appRoute } from "./http/routers";

export const app = fastify({});
app.register(appRoute);

