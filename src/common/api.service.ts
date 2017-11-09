import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class ApiService {
    progress$: any;
    progress: any;
    progressObserver: any;
    constructor(private http: Http) {this.progress$ = Observable.create(observer => {
        this.progressObserver = observer
    }).share();

     }

    callApi(url: string, method: string, body: Object) {
        console.log(`Http call to ${url} of method: ${method} with body ${JSON.stringify(body)} `);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (sessionStorage.getItem('token')) {
            headers.append('token', sessionStorage.getItem('token'));
        }

        switch (method) {
            case 'post': return this.http.post(url, body, options).map((response: Response) => response.json());
            case 'get': return this.http.get(url, options).map((response: Response) => response.json());
        }
    }


    makeFileRequest(url: string, params: string, files: File[]): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();
            var length: any = files.length
            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
                formData.append("reg_no", localStorage.getItem('reg_no'));
                formData.append("id", params);
                formData.append("length", length);
                console.log(params[0]);
                console.log(params[1]);
                console.log(localStorage.getItem('reg_no'));
            }

            // xhr.onreadystatechange = () => {
            //     if (xhr.readyState === 4) {
            //         if (xhr.status === 200) {
            //             observer.next(JSON.parse(xhr.response));
            //             observer.complete();
            //         } else {
            //             observer.error(xhr.response);
            //         }
            //     }
            // };



            // xhr.upload.onprogress = (event) => {
            //     this.progress = Math.round(event.loaded / event.total * 100);

            //     this.progressObserver.next(this.progress);
            // };

            xhr.open('POST', url, true);

            var serverFileName = xhr.send(formData);
            return serverFileName;
        });
    }
}