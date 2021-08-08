import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './widgets/menu/menu.component';
import { PariComponent } from './page/pari/pari.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { HeaderComponent } from './widgets/header/header.component';
import { LoginComponent } from './page/login/login/login.component';
import { EquipeComponent } from './page/equipe/equipe/equipe.component';
import { CategorieComponent } from './page/categorie/categorie/categorie.component';
import { DashboardComponent } from './page/dashboard/dashboard/dashboard.component';
import { UtilisateurComponent } from './page/utilisateur/utilisateur/utilisateur.component';
import { PariFicheComponent } from './page/pari/pari-fiche/pari-fiche.component';
import { PariSaisieComponent } from './page/pari/pari-saisie/pari-saisie.component';

const routes:Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path:"",
    component: LoginComponent
  },
  {
     path:"Pari",
    component: PariComponent
  },
  {
    path:"PariFiche",
    component: PariFicheComponent
  },
  {
    path:"PariSaisie",
    component: PariSaisieComponent
  },
  {
      path:"Login",
    component: LoginComponent
  },
  {
    path:"Equipe",
    component: EquipeComponent
  },
  {
    path:"Categorie",
    component: CategorieComponent
  },
  {
    path:"Dashboard",
    component: DashboardComponent
  },
  {
    path:"Utilisateur",
    component: UtilisateurComponent
  },
 /* {
    // idem avec  http://localhost:4200/home
    path:"home",
    component:AssignmentsComponent
  },
  {
    path:"add",
    component:AddAssignmentComponent
  },
  {
    path:"assignment/:id",
    component:AssignmentDetailComponent
  },
  {
    path:"assignment/:id/edit",
    component:EditAssigmentComponent,
    canActivate : [AuthGuard]
  }*/
]
@NgModule({
  declarations: [
    AppComponent,
    PariComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PariFicheComponent,
    PariSaisieComponent,
    UtilisateurComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes), HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
