import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from 'app/core/user/user.types';
import {BehaviorSubject, map, Observable, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        debugger
        if (value)
            localStorage.setItem('user', JSON.stringify(value));
        else localStorage.removeItem('user');
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    get user(): User {
        try {
            return JSON.parse(localStorage.getItem('user') ?? '{}') as User;
        } catch (error) {
            return null;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        if (this.user) {
            this._user.next(this.user);
            return of(this.user);
        } else
            return this._httpClient.get<User>('api/common/user').pipe(
                tap((user) => {
                    this._user.next(user);
                }),
            );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            }),
        );
    }
}
