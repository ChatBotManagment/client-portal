import {inject} from '@angular/core';
import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {AuthService} from 'app/core/auth/auth.service';
import {of, switchMap} from 'rxjs';
import {UserService} from "../../user/user.service";


export const SuperAdminAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    // Check the authentication status
    const authService = inject(AuthService)

    return authService.isAuthenticated$.pipe(
        switchMap((authenticated) => {
            // If the user is not authenticated...
            if (!authenticated) {
                // const authService = inject(AuthService);

                // Redirect to the sign-in page with a redirectUrl param
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                return of(urlTree);
            }

            if (!authService.user.user_roles.includes('superAdmin')) {
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`500-error?${redirectURL}`);
                return of(urlTree);
            }


            // Allow the access
            return of(true);
        }),
    );
};
