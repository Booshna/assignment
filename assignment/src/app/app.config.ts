import { ApplicationConfig } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideAnimations(),
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule), provideAnimations()]
};
