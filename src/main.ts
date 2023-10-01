import './style.css';
import { checkNotNull } from './utils/preconditions.ts';
import { init as initEngine } from './core/init.ts';
import { init as initSpaceDagger } from './dagger/init.ts';

const RENDER_TIME_MILLIS = 10;

(async () => {
  const container = checkNotNull(document.getElementById('app'));
  const engine = await initEngine(container);
  await initSpaceDagger(engine);
  engine.startGameLoop(RENDER_TIME_MILLIS);
})().catch(e => {
  console.error(e);
  alert(e);
});
