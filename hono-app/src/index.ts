import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

async function middleware(c: any, next: Function) {
  setTimeout(() => {
    console.log('Middleware 1');    
  }, 1000);
  await next();
}

// app.use('/hello', async (c, next) => {
//   setTimeout(() => {
//     console.log('Middleware 1');    
//   }, 1000);
//   await next();
// })

app.get('/hello', middleware, async (c) => {
  console.log('Hello Hono!');  
  return c.json({ message: 'Hello Hono!' });
});

app.get('/auth', async (c) => {
  // getting body
  // const req = await c.req.json();
  // const { username, password } = req;
  // console.log(username, password);  

  // if (username === 'admin' && password === 'admin') {
  //   return c.json({ message: 'Login Success!' });
  // }
  // return c.json({ message: 'Login Failed!' });

  // Getting params
  // const req = await c.req.param('id');
  // console.log(req);
  
  // return c.json({ message: 'Hello Hono!' });

  // Getting query
  const id = await c.req.query("id");
  const name = await c.req.query("name");
  console.log(id, name);
  return c.json({ message: 'Hello Hono!' });

  // Getting header
  // const token = c.req.header('authorization');
  // console.log(token);
  // return c.json({ message: 'Hello Hono!' });
  
});

export default app
