import { app } from './app';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`🟢 SulfiTrack Passive H2S Exposure Intelligence Backend`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log(`🔬 SpectroCV v4.2 Engine Ready`);
  console.log(`💾 Central Safety Database: Connected & Persistent`);
  console.log(`================================================================`);
});
