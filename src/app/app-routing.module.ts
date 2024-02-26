import { PostComponent } from './components/posts/post/post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreateComponent } from './components/posts/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'create', component: CreateComponent, pathMatch: 'full' },
  { path: 'post/:id', component: PostComponent, pathMatch: 'full' },
  { path: 'edit/:id', component: CreateComponent, pathMatch: 'full' },
  { path: 'user/:id', component: UserComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'prefix' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
