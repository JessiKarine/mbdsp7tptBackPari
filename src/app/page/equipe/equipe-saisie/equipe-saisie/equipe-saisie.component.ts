import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Equipe } from 'src/app/models/equipe';
import { EquipeService } from 'src/app/services/equipe/equipe.service';

@Component({
  selector: 'app-equipe-saisie',
  templateUrl: './equipe-saisie.component.html',
  styleUrls: ['./equipe-saisie.component.css']
})
export class EquipeSaisieComponent implements OnInit {
  image;
  nom;
  file;
  equipeSelected : Equipe;
  constructor(private spinner: NgxSpinnerService,private equipeService : EquipeService) { }

  ngOnInit(): void {
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

  onCreate(){
    console.log("fileee",this.file);
      this.spinner.show();
      this.equipeSelected = new Equipe();
      this.equipeSelected.nom = this.nom;
      this.equipeService.createEquipe(this.equipeSelected, this.file)
      .subscribe(data => {
        this.spinner.hide();
    });
  }

}
