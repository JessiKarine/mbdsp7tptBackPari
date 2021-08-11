import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute,private spinner: NgxSpinnerService,private equipeService : EquipeService) { }

  ngOnInit(): void {
    this.getEquipeById(this.route.snapshot.paramMap.get('id'));

  }
  getEquipeById(id : string){
    this.spinner.show();
    this.equipeService.getEquipeById(id)
        .subscribe(equipe => {
            this.equipeSelected = equipe as Equipe;
            this.image = "/assets/images/"+this.equipeSelected.image;
            this.spinner.hide();
        })
  }
  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  onUpdate(){

  }
  onDelete() {
    
  }

}
