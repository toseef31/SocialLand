import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, UntypedFormControl, UntypedFormGroup, NgForm } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { SharedModule } from 'src/app/shared.module';

@Component({
  standalone: false,
  // imports: [SharedModule],
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  percentDone: any = 0;
  uploadFailed = "";

  myForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    file: new UntypedFormControl(''),
    fileSource: new UntypedFormControl('')
  });

  constructor(private http: HttpClient, private fileUploadService: FileUploadService) { }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const files = event.target.files;//[0];
      
      console.log("onFileChange: ", files);
      this.myForm.patchValue({
        'fileSource': files
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource')?.value);
    
    this.fileUploadService.addUser(this.myForm.get('name')?.value, this.myForm.get('fileSource')?.value)
      .subscribe({
        next: (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              console.log("UploadProgress: ", event);
              if (event.total) {
                this.percentDone = Math.round(event.loaded / ((event?.total)) * 100);
                console.log(`Uploaded! ${this.percentDone}%`);
              }

              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              this.percentDone = false;
          }
        },
        error: err => {
          console.log("err: ", err);
        },
        complete: () => {
          console.log('Request complete');
        }
      });
  }

}
