import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Equipe } from 'src/app/models/equipe';
import { EquipeService } from 'src/app/services/equipe/equipe.service';

@Component({
  selector: 'app-equipe-fiche',
  templateUrl: './equipe-fiche.component.html',
  styleUrls: ['./equipe-fiche.component.css']
})
export class EquipeFicheComponent implements OnInit {
  image;
  nom;
  equipeSelected : Equipe;
  file;
  constructor(private router: Router,private route: ActivatedRoute,private spinner: NgxSpinnerService,private equipeService : EquipeService) { }

  ngOnInit(): void {
    this.getEquipeById(this.route.snapshot.paramMap.get('id'));

  }
  getEquipeById(id : string){
    this.spinner.show();
    this.equipeService.getEquipeById(id)
        .subscribe(equipe => {
            this.equipeSelected = equipe as Equipe;
            this.image = "/assets/images/"+this.equipeSelected.image;
            this.nom = this.equipeSelected.nom;
            this.spinner.hide();
        })
  }
  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  onUpdate(){
      this.spinner.show();
      this.equipeSelected.nom = this.nom;
      this.equipeService.updateEquipeById(this.equipeSelected, this.file)
      .subscribe(data => {
        this.spinner.hide();
    });
  }
  onDelete() {
    this.spinner.show();
      this.equipeService.deleteEquipeById(this.equipeSelected.id)
          .subscribe(() => {
              console.log("utilisateur deleted");
              this.spinner.hide();
              this.router.navigate(["/Equipe"]);
          })
  }

}
