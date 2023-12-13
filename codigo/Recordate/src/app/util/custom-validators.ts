import { AbstractControl } from "@angular/forms";


export class customValidators{

static machValues(toCompare:AbstractControl){
    return (control: AbstractControl)=>{
        if(control.value !== toCompare.value) return { notMach : true}
    return null
    }
}

}
