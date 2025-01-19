import 'dotenv/config';
import log from './log.js';
import Config from './config/index.js'
import Application from './app.js';
import DB from './db/index.js';
import registerModels from './model/register.js';

async function start() {
  try {
    const app = Application({ log: Config.LOG });
    await DB.init(Config.DB_URI, registerModels);

    app.listen(Config.PORT, (err) => {
      if (err)
        throw err;
      log.info(`Server started sucessfully on port ${Config.PORT}`);
    });
  }
  catch (err) {
    log.error('Failed to start server');
    log.error(err);
  }
}

start()