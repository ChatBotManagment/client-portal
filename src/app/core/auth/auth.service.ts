import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {
    catchError,
    firstValueFrom,
    map,
    Observable,
    of,
    switchMap,
    tap,
    throwError
} from 'rxjs';
import {AuthService as Auth0Service, PopupConfigOptions, PopupLoginOptions} from "@auth0/auth0-angular";

@Injectable({providedIn: 'root'})
export class AuthService {
    private _authenticated: boolean = false;
    get user() {
        return this._userService.user;
    }

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _auth0Service: Auth0Service
    ) {
    }

    get isAuthenticated$() {
        if (this.accessToken)
            return of(true);
        else
            return this._auth0Service.isAuthenticated$.pipe(tap((isAuthenticated) => {
                if (isAuthenticated) {
                    this._authenticated = true;
                }
            }));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        console.log('signIn(credentials: { email: string; password: string }): Observable<any>');
        // Throw error, if the user is already logged in

        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        this._auth0Service.loginWithRedirect();


        /*        return this._httpClient.post('api/auth/sign-in', credentials).pipe(
                    switchMap((response: any) =>
                    {
                        // Store the access token in the local storage
                        this.accessToken = response.accessToken;

                        // Set the authenticated flag to true
                        this._authenticated = true;

                        // Store the user on the user service
                        this._userService.user = response.user;

                        // Return a new observable with the response
                        return of(response);
                    }),
                );*/
    }


    loginWithPopup(options?: PopupLoginOptions, config?: PopupConfigOptions) {
        return this._auth0Service.loginWithPopup(options, config).pipe(
            map(() => {
                return firstValueFrom(
                    this._auth0Service.idTokenClaims$.pipe(
                        tap((token) => {
                            console.log(token)
                            // Store the access token in the local storage
                            this.accessToken = token.__raw;

                            // Set the authenticated flag to true
                            this._authenticated = true;

                            // Store the user on the user service
                            this._userService.user = token as any;

                            // Return a new observable with the response
                            return of(token);
                        })
                    )
                )

            })
        );
    }


    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {

        console.log('signInUsingToken(): Observable<any>');
        // this._auth0Service.loginWithPopup()


        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(
            catchError(() =>

                // Return false
                of(false),
            ),
            switchMap((response: any) => {
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            }),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<boolean> {

        // Remove the access token from the local storage
        return this._auth0Service.logout({logoutParams: {returnTo: document.location.origin}}).pipe(
            map(() => {
                localStorage.removeItem('accessToken');
                console.log('logged out')
                // Set the authenticated flag to false
                this._authenticated = false;
                this._userService.user = null;
                return true;
            })
        )


        // Return the observable
        // return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        console.log('check(): Observable<boolean>');
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }


}
