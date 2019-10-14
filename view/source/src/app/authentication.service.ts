import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";


export interface InterfaceLogin {
  username: string;
  password: string;
}


@Injectable({
    providedIn: 'root'
})



export class AuthenticationService {

    constructor(public api: ApiService) {

    }

    public async SupplierLogin(data: InterfaceLogin) {
        return new Promise((resolve, reject) => {
            this.api.post('api/supplier/v1/login', data).subscribe(resolve, reject)
        })
    }
}
