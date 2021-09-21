import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './device/home-page/home-page.component';
import { DevicesComponent } from './device/devices/devices.component';
import { CategoriesComponent } from './device/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  { path: 'devices', component: DevicesComponent },
  { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
