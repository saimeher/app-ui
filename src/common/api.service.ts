import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';


@Injectable()
export class ApiService {
    constructor(private http: Http) { }

    callApi(url: string, method: string, body: Object) {
        console.log(`Http call to ${url} of method: ${method} with body ${JSON.stringify(body)} `);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (sessionStorage.getItem('token')) {
            headers.append('token', sessionStorage.getItem('token'));
          }
        
        switch(method) {
            case 'post': return this.http.post(url, body, options).map((response: Response) => response.json());
            case 'get': return this.http.get(url, options).map((response: Response) => response.json());
        }   
    }
}