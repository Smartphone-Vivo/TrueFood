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

export const routes: Routes = [
  {path: "", component: Layout, children:[
      {path: 'main', component: MainPage},
      {path: 'advertisements', component: AdvertisementsPage},
      {path: 'feed', component: FeedPage},
      {path: 'tasks', component: TaskPage},

      {path: 'newadvertisement', component: CreateAdvertisementPage},
      {path: 'newtask', component: CreateTaskPage},

      {path: 'favorite', component: FavoritesPage},
      {path: 'profile', component: ProfilePage},
      {path: 'mytasks', component: MyTasksPage},
    ]},

  //логин авторизация
];
