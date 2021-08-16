import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role/role.service';
import { Role } from '../../../models/role';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roleList = null;
  searchedTerm : String;
  constructor(private roleService:RoleService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllRole();
  }

  //récupération la liste des utilisateur
  getAllRole(){
    this.spinner.show();
    this.roleService.getRole()
        .subscribe(data => {
            this.roleList = data as Role[];
            this.spinner.hide();

        });
  }

  updateSearchFilter(newFilter : string) { 
    this.searchedTerm = newFilter
  }

}
