const jwt = require("jsonwebtoken");
const z = require("zod");

function zodCheck(username, password) {
  const nameSchema = z.string().email();
  const pwdSchema = z.string().min(6);
  return nameSchema.safeParse(username).success && pwdSchema.safeParse(password).success;
}

function getJwt(username, password) {
  const check = zodCheck(username, password);
  console.log(check);
  if (!check) return null;
  const token = jwt.sign({username}, 'harsh-harsh', {expiresIn: '1h'});
  return token;
}

const res1 = getJwt("Harsh", 'ashy1gh');
const res2 = getJwt("Harsh@gmail.com", '14nb');
const res3 = getJwt("Harsh@gmail.com", '14nb1bb#');

console.log(res1, res2, res3);

