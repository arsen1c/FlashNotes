const DEVELOPMENT = true;

let server = DEVELOPMENT ? 'http://localhost:4000/api' : 'https://flashnotes-api.up.railway.app/api';
let client = DEVELOPMENT ? 'http://localhost:3000' : 'https://flashnotes.vercel.app';

export {
  server,
  client
}
