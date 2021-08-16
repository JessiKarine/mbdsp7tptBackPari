import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTab'
})
export class FilterTabPipe implements PipeTransform {

  
  transform(items : any[] , filter : string): Array<any> {
    if(filter && filter.trim().length>0){
      return items.filter(item => {
        let check = { 
          trouve : false 
        } 
        this.recursiveFind(item,filter,check);
        if(check.trouve) { 
          return item ;
        }
      });
    }
    else {
      return items;
    }
  }
  recursiveFind(itemOfArray : any,filter : string, check : any){
    
      if(check.trouve == true) {
        return 1; 
      }
      if(typeof itemOfArray ==='object' ) {
          for(let i in itemOfArray) { 
            this.recursiveFind(itemOfArray[i],filter,check);
          }
      }
      else if(Array.isArray(itemOfArray)) { 
          for(let i=0 ; i< itemOfArray.length ; i++) { 
            this.recursiveFind(itemOfArray[i],filter,check)
          }
      }
      else { 
        let valueItem = ""+itemOfArray;
        if(valueItem.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || valueItem.toLocaleLowerCase() ===filter.toLocaleLowerCase()) {
            check.trouve = true ;
            return 1; 
        }
      }
  }
}
