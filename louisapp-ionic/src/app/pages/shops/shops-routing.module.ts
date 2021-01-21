import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsPage } from './shops-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShopsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsRoutingModule {}
