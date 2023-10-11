import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { ApiService } from './services/api.service';

const routes: Routes = [
  // { path: '', redirectTo: 'workspace/', pathMatch: 'full' },
  { path: '', component: BodyComponent},
  { path: 'workspace/:id', component: BodyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private api: ApiService){}


 }
