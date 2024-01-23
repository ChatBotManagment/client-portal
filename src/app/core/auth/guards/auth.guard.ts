import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';
import { AuthGuard as Auth0Guard , AuthService as Auth0Service } from '@auth0/auth0-angular';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);
    const auth0Guard: Auth0Guard = inject(Auth0Guard);
    // return auth0Guard.canActivate(route, state);
    // Check the authentication status
    return inject(Auth0Service).isAuthenticated$.pipe(
        switchMap((authenticated) =>
        {
            // If the user is not authenticated...
            if ( !authenticated )
            {
                // Redirect to the sign-in page with a redirectUrl param
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                return of(urlTree);
            }

            // Allow the access
            return of(true);
        }),
    );
};
