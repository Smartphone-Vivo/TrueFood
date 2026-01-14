import { Routes } from '@angular/router';
import {MainPage} from './pages/main-page/main-page';
import {AdvertisementsPage} from './pages/advertisements-page/advertisements-page';
import {FeedPage} from './pages/feed-page/feed-page';
import {TaskPage} from './pages/task-page/task-page';
import {FavoritesPage} from './pages/favorites-page/favorites-page';
import {ProfilePage} from './pages/profile-page/profile-page';
import {MyTasksPage} from './pages/my-tasks-page/my-tasks-page';
import {CreateAdvertisementPage} from './pages/create/create-advertisement-page/create-advertisement-page';
import {CreateTaskPage} from './pages/create/create-task-page/create-task-page';
import {Layout} from './common-ui/layout/layout';
import {OneAdvertisementPage} from './pages/one-advertisement-page/one-advertisement-page';
import {LoginPage} from './pages/login-register-page/login-page/login-page';
import {RegisterPage} from './pages/login-register-page/register-page/register-page';
import {canActivateAuth} from './auth/access.guard';
import {EditAdvOrderPage} from './pages/edit-delete/edit-adv-order-page/edit-adv-order-page';
import {EditTask} from './pages/edit-delete/edit-task/edit-task';

export const routes: Routes = [
  {path: "", component: Layout, children:[
      {path: 'main', component: MainPage},
      {path: 'advertisements/:id', component: AdvertisementsPage},
      {path: 'feed', component: FeedPage},
      {path: 'tasks', component: TaskPage},
      {path: 'advertisement/:id', component: OneAdvertisementPage},

      {path: 'newadvertisement', component: CreateAdvertisementPage, canActivate: [canActivateAuth]},
      {path: 'newtask', component: CreateTaskPage, canActivate: [canActivateAuth]},
      {path: 'editadvertisement/:id', component: EditAdvOrderPage, canActivate: [canActivateAuth]},
      {path: 'edittask/:id', component: EditTask, canActivate: [canActivateAuth]},

      {path: 'favorite', component: FavoritesPage, canActivate: [canActivateAuth]},
      {path: 'profile/:id', component: ProfilePage},
      {path: 'mytasks', component: MyTasksPage, canActivate: [canActivateAuth]},

      {path: 'login', component: LoginPage},
      {path: 'register', component: RegisterPage},
    ]},
];
