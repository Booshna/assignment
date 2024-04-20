import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PinComponent } from '../pin/pin.component';
import { CustomerComponent } from '../customer/customer.component';


@Component({
  selector: 'app-pin-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.css']
})

export class PinListComponent {
  pinList: any[];
  dialogRef: MatDialogRef<CustomerComponent>;

  constructor(private storageService: StorageService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getPinList();
  }

  getPinList() {
    this.pinList = this.storageService.getDataFromLocalStorage('pin')
  }

  openCustomer() {
    const dialogRef = this.dialog.open(CustomerComponent, {
      width: '1000px',
      height: '450px',
      data: { name: 'John' }
    });


  }

  openPin() {
    const dialogRef = this.dialog.open(PinComponent, {
      width: '1000px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPinList();
    });
  }


}
