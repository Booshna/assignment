import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploadModule } from 'ng2-file-upload';
import { StorageService } from '../services/storage.service';
import { MatDialogRef } from '@angular/material/dialog';

const URL = 'http://localhost:3000/fileupload/';

@Component({
  selector: 'app-pin',
  standalone: true,
  imports: [
    NgxSelectModule,
    ReactiveFormsModule,
    CommonModule,
    FileUploadModule,
  ],
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css'],
})
export class PinComponent {
  pinForm: FormGroup<any>;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true,
    allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
  });

  public hasAnotherDropZoneOver: boolean = false;

  fileObject: any;
  customerList: { id: any; text: any }[];
  fileName: any;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<PinComponent>
  ) {
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.convertToBase64(fileItem);
    };
  }

  ngOnInit() {
    this.pinForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      collaborators: new FormControl(null, [Validators.required]),
      privacy: new FormControl('', [Validators.required]),
    });
    const customerList =
      this.storageService.getDataFromLocalStorage('customers');
    //format data as key and value pair for ngx-select dropdown.
    this.customerList = customerList.map((item) => ({
      id: item.title,
      text: item.title,
    }));
  }

  convertToBase64(fileItem: any) {
    this.fileName = fileItem.file.name;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const base64String = event.target.result;
      console.log(base64String);
      this.pinForm.patchValue({ image: base64String });
    };
    reader.readAsDataURL(fileItem._file);
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  submit() {
    this.storageService.setDataInLocalStorage('pin', this.pinForm.value);
    this.dialogRef.close();
  }

  clearForm() {
    this.dialogRef.close();
    this.pinForm.reset();
  }
}
