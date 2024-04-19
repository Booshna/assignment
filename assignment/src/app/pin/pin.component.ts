import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';


@Component({
  selector: 'app-pin',
  standalone: true,
  imports: [NgxSelectModule, ReactiveFormsModule, CommonModule, FileUploadModule],
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent {
  collaboratoryList: { id: number; name: string; }[];
  pinForm: FormGroup<any>;

  constructor(private formBuilder: FormBuilder,
  ) {
    this.collaboratoryList = [
      { id: 1, name: "AAA" },
      { id: 1, name: "BBB" },
      { id: 1, name: "CCC" },
      { id: 1, name: "DDD" },

    ]
    this.pinForm = this.formBuilder.group(
      {
        title: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
        collaborators: new FormControl('', [Validators.required]),
        privacy: new FormControl('', [Validators.required]),

      })

  }

  ngOninit() {

  }

}
