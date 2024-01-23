import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';
import { AuthService } from 'app/core/auth/auth.service';

export const provideAuth = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ];
};
