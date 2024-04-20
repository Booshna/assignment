import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSelectModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customerForm: FormGroup<any>;
  responseData: { country: string, region: string }[];
  uniqueRegionsArray: string[];
  countryList: { id: string, text: string }[];

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private storageService: StorageService, public dialogRef: MatDialogRef<CustomerComponent>) {

  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group(
      {
        title: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        region: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),

      })
    this.getRegion();
  }

  getRegion() {
    this.httpService.getRegion().subscribe((data) => {
      // @ts-ignore

      this.responseData = Object.values(data.data);
      console.log(this.responseData);

      // Extract unique regions using a Set
      const uniqueRegions = new Set(this.responseData.map(value => value.region));

      // Convert Set to an array
      this.uniqueRegionsArray = Array.from(uniqueRegions);

    });

  }

  filterCountries(regionToFilter: string) {
    console.log(regionToFilter, "REGFION");

    const countryList = this.responseData.filter(country => country.region === regionToFilter);
    this.countryList = countryList.map(item => ({ id: item.country, text: item.country }));

    console.log(this.countryList);


  }

  submit() {
    console.log(this.customerForm);
    // localStorage.setItem('country', JSON.parse(this.customerForm.value));
    this.storageService.setDataInLocalStorage('customers', this.customerForm.value);
    this.dialogRef.close();


  }

  clearForm() {
    this.customerForm.reset();
    this.dialogRef.close();


  }
}
