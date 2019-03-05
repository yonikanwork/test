import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationsService } from '../notifications/notifications.service';
import { MatSidenav } from '@angular/material';
import { SearchService } from '../search/search.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() quickpanel: MatSidenav; // for the sidebar omnipanel

  isAuthenticated = false;
  private authStatusSub: Subscription;

  notificationsList: Notification[] = [];
  private notificationsListSub: Subscription;

  userProfile = null;
  private userProfileSub: Subscription;

  isUserMenuOpen = false;
  isNotificationsMenuOpen = false;

  // for searchbar
  focused: boolean;
  isSearchDropdownOpen = false;
  input: string;
  searchResults: any;
  searchTerm$ = new Subject<string>();

  // tslint:disable-next-line: max-line-length
  constructor(public authService: AuthService, private notificationsService: NotificationsService, private searchService: SearchService) {}

  ngOnInit() {
    this.userProfile = this.authService.getUserProfile();
    this.userProfileSub = this.authService.getUserProfileListener()
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
      });

    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });

    this.notificationsList = this.notificationsService.getNotificationsList();
    this.notificationsListSub = this.notificationsService.getNotificationsUpdateListener()
      .subscribe((notifications) => {
        this.notificationsList = notifications;
      });


    this.searchService.search(this.searchTerm$)
      .pipe(
        tap(result => {
          // this.isLoading = true;
          // console.log(this.isLoading);
        })
      )
      .subscribe(results => {
        // @ts-ignore
        this.searchResults = results.results.slice(0, 20);
        // this.isLoading = false;
      });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  // quick panel
  // openQuickpanel() {
  //   this.quickpanel.open();
  // }

  onLogout() {
    this.authService.logout();
    this.onClickOutsideUserMenu();
  }

  // notifications
  onDeleteNotification(id: number) {
    this.notificationsService.deleteNotification(id);
  }

  onDeleteAllNotifications() {
    this.notificationsService.onDeleteAllNotifications();
  }

  // dropdowns
  toggleDropdownUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onClickOutsideUserMenu() {
    this.isUserMenuOpen = false;
  }

  toggleDropdownUserNotifications() {
    this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
  }

  onClickOutsideUserNotifications() {
    this.isNotificationsMenuOpen = false;
  }

  // search
  openDropdown() {
    this.focused = true;
  }

  closeDropdown() {
    this.focused = false;
    this.closeDropdownSearch();
  }

  closeDropdownSearch() {
    this.isSearchDropdownOpen = false;
  }
  toggleDropdownSearch() {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.userProfileSub.unsubscribe();
    this.notificationsListSub.unsubscribe();
  }
}
