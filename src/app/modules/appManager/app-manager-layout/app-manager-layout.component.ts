import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {
    FuseNavigationItem,
    FuseNavigationService,
    FuseVerticalNavigationComponent
} from "../../../../@fuse/components/navigation";
import {Navigation} from "../../../core/navigation/navigation.types";
import {Subject, takeUntil} from "rxjs";
import {NavigationService} from "../../../core/navigation/navigation.service";
import {FuseMediaWatcherService} from "../../../../@fuse/services/media-watcher";
import {ClientsService} from "../../clientsManager/clients.service";

@Component({
    selector: 'app-app-manager-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FuseVerticalNavigationComponent],
    templateUrl: './app-manager-layout.component.html',
    styleUrls: ['./app-manager-layout.component.scss']
})
export class AppManagerLayoutComponent {
    isScreenSmall: boolean;
    navigation: FuseNavigationItem[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private clientsService: ClientsService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        const clientId =  this._activatedRoute.snapshot.params.clientId;
        this.clientsService.selectedClient$ub.next(clientId);
        this.navigation  = [
            {
                id: 'app',
                title: 'Applications',
                subtitle: 'App Id: ' + clientId,
                type: 'group',
                icon: 'heroicons_outline:home',
                children: [
                    {
                        id: 'app.people',
                        title: 'People',
                        type: 'basic',
                        icon: 'heroicons_outline:banknotes',
                        link: `/app/${clientId}/people`,
                    },
                    {
                        id: 'app.roomTemplates',
                        title: 'Room Templates',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: `/app/${clientId}/room-templates`,
                    },

                    {
                        id: 'app.rooms',
                        title: 'Rooms',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-check',
                        link: `/app/${clientId}/rooms`,
                    },
                    {
                        id: 'app.roomsConversation',
                        title: 'Rooms Conversation',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-check',
                        link: `/app/${clientId}/Conversation`,
                    },

                ],
            }

        ];



        // Subscribe to navigation data
        /*  this._navigationService.navigation$
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe((navigation: Navigation) =>
              {
                  this.navigation = navigation;
              });*/

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
