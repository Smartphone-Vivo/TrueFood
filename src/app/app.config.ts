import { provideEventPlugins } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor} from './auth/auth.interceptor';
import {provideYConfig, YConfig} from 'angular-yandex-maps-v3';

const config: YConfig = {
  apikey: '439ecfcd-85a3-4bbc-93ca-9f7d72faf9f6',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideYConfig(config),
        provideAnimations(),
        provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideEventPlugins()
    ]
};
