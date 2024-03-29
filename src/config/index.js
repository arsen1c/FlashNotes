const DEVELOPMENT = false;

let server = DEVELOPMENT ? 'http://localhost:4000/api' : 'https://flashnotes.up.railway.app/api';
let client = DEVELOPMENT ? 'http://localhost:3000' : 'https://flashnotes.vercel.app';

export {
  server,
  client
}
