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
import { NgxSpinnerModule } from "ngx-spinner";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UtilisateurtableaubodyComponent } from './page/utilisateur/utilisateurtableaubody/utilisateurtableaubody.component';
import { UtilisateurdetailComponent } from './page/utilisateur/utilisateurdetail/utilisateurdetail.component';
import { AuthGuard } from './shared/auth.guard';
import { DeconnexionComponent } from './page/deconnexion/deconnexion/deconnexion.component';
import { EquipeFicheComponent } from './page/equipe/equipe-fiche/equipe-fiche/equipe-fiche.component';
import { Equipe } from './models/equipe';
import { EquipeSaisieComponent } from './page/equipe/equipe-saisie/equipe-saisie/equipe-saisie.component';


const routes:Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path:"",
    component: PariComponent,
    canActivate : [AuthGuard]
  },
  {
     path:"Pari",
    component: PariComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"PariFiche",
    component: PariFicheComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"PariSaisie",
    component: PariSaisieComponent,
    canActivate : [AuthGuard]
  },
  {
      path:"Login",
    component: LoginComponent
  },
  {
    path:"Equipe",
    component: EquipeComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"Categorie",
    component: CategorieComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"Dashboard",
    component: DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"Utilisateur",
    component: UtilisateurComponent,
    canActivate : [AuthGuard]
  },
  {
    path: "Utilisateur/:id",
    component : UtilisateurdetailComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"Deconnexion",
    component: DeconnexionComponent
  },{
    path: "Pari/:id",
    component : PariFicheComponent,
    canActivate : [AuthGuard]
  },
  ,{
    path: "Equipe/:id",
    component : EquipeFicheComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"EquipeSaisie",
    component: EquipeSaisieComponent,
    canActivate : [AuthGuard]
  },
 
]
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes), HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    PariComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PariFicheComponent,
    PariSaisieComponent,
    UtilisateurComponent,
    UtilisateurtableaubodyComponent,
    UtilisateurdetailComponent,
    LoginComponent,
    DeconnexionComponent,
    EquipeComponent,
    EquipeFicheComponent,
    EquipeSaisieComponent
    ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
