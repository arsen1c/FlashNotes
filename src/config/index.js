const DEVELOPMENT = false;

let server = DEVELOPMENT ? 'http://localhost:4000/api' : 'https://react-notes-api.vector2912.repl.co/api';
let client = DEVELOPMENT ? 'http://localhost:3000' : 'https://flashnotes.vercel.app';

export {
  server,
  client
}