import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { GameListPageComponent } from './app/views/game-list-page/game-list-page.component';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
