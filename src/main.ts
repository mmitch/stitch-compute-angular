import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { getTranslations, getBrowserLang, ParsedTranslationBundle } from '@locl/core';

if (environment.production) {
  enableProdMode();
}

const browserLang = getBrowserLang();
const defaultLang = 'en';

const pathToLang = (lang: string) => `/assets/locale/${lang}.json`;

getTranslations(pathToLang(browserLang))
  .then((data: ParsedTranslationBundle) => startup())
  .catch(() =>
    getTranslations(pathToLang(defaultLang))
      .then((data: ParsedTranslationBundle) => startup())
      .catch((err) => console.error(err))
  );

const startup = () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
};
