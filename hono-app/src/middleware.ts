import {Hono, Next} from 'hono'

const app = new Hono();

app.use(async (c, next) => {
    if (c.req.header("Authorization")) await next();
    return c.json({message: "Unauthorized"});
})

app.get('/', async(c) => {
    const body = await c.req.json();
    const token = c.req.header("Authorization");
    console.log(body, token);
    return c.json({message: "Hello Authorized!"});
});

export default app;