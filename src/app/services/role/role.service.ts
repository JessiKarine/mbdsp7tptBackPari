import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { Config } from 'src/app/utilitaire/config.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  uri = Config.getBaseUrlOracle()+"/";
  constructor(private http:HttpClient,private router:Router) { }

  getRole():Observable<Role[]> {
    return this.http.get<Role[]>(this.uri+"Roles");
  }
  getRoleById(id : String):Observable<Role> {
    return this.http.get<Role>(this.uri+"Roles/"+id);
  }
 

  updateRoleById(roleToUpdated: Role):Observable<Role>{
      return this.http.put<Role>(this.uri + "Roles",roleToUpdated);
  }
  deleteRoleById(id:String):Observable<any>{
    return this.http.delete<any>(this.uri + "Roles/Delete/" + id);
  }

  createRole(roleToSelected: Role){
    return this.http.post<Role>(this.uri + "Roles",roleToSelected);
  }
}
