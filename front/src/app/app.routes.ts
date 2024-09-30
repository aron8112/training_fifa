import { Routes } from '@angular/router';
import { MainComponent } from './components/layout/main/main.component';
import { PageNotFoundComponent } from './components/utils/page-not-found/page-not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: MainComponent,
  },
  {
    path: 'players',
    loadComponent: () =>
      import('./components/players/player-main/player-main.component').then(
        (mod) => mod.PlayerMainComponent
      ),
    canActivate: [authGuard],
    data: { title: 'List of players' },
  },
  {
    path: 'players/listcards',
    loadComponent: () =>
      import('./components/players/player-list/player-list.component').then(
        (mod) => mod.PlayerListComponent
      ),
    canActivate: [authGuard],
    data: { title: 'List of players' },
  },
  {
    path: 'players/profile',
    loadComponent: () =>
      import(
        './components/players/player-profile/player-profile.component'
      ).then((mod) => mod.PlayerProfileComponent),
    canActivate: [authGuard],
    data: { title: 'Player Profile' },
  },
  {
    path: 'players/search',
    loadComponent: () =>
      import(
        './components/players/players-search-table/players-search-table.component'
      ).then((mod) => mod.PlayersSearchTableComponent),
    canActivate: [authGuard],
    data: { title: 'Player Profile' },
  },
  {
    path: 'players/create',
    loadComponent: () =>
      import('./components/forms/create-player/create-player.component').then(
        (mod) => mod.CreatePlayerComponent
      ),
    canActivate: [authGuard],
    data: { title: 'Player Profile' },
  },
  {
    path: 'players/update',
    loadComponent: () =>
      import('./components/forms/update-player/update-player.component').then(
        (mod) => mod.UpdatePlayerComponent
      ),
    data: { title: 'Player Profile' },
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./components/user/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
    data: { title: 'Log In' },
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./components/user/signup/signup.component').then(
        (mod) => mod.SignupComponent
      ),
    data: { title: 'Sign Up' },
  },
  {
    path: 'user/profile',
    loadComponent: () =>
      import('./components/user/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
    canActivate: [authGuard],
    data: { title: 'User Profile' },
  },
  {
    path: 'user/upload',
    loadComponent: () =>
      import('./components/user/upload/upload.component').then(
        (mod) => mod.UploadComponent
      ),
    canActivate: [authGuard],
    data: { title: 'Upload File' },
  },
  { path: '**', component: PageNotFoundComponent },
];
