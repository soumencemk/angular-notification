import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {RoleGuard} from "./role.guard";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
