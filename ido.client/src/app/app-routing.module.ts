import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "authentication",
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (mod) => mod.AuthenticationModule
      ),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(
        (mod) => mod.DashboardModule
      ),
  },
  { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
