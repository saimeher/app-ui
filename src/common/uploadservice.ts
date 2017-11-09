import {Injectable}from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { SharedService } from './common';
@Injectable()
export class UploadService {
progress$: any;
progress: any;
progressObserver: any;
constructor(private _sharedService: SharedService ) {
    this.progress$ = Observable.create(observer => {
        this.progressObserver = observer
    }).share();
    console.log(localStorage.getItem('reg_no'));
    
}

 makeFileRequest(url: string, params: string, files: File[]): Observable<any> {
    return Observable.create(observer => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();
            var length :any = files.length
              for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]",files[i], files[i].name);
            formData.append("reg_no",this._sharedService.reg_no);
             formData.append("id", params);
            formData.append("length", length);
            console.log(files[i],params);
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