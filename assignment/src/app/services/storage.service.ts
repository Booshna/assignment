import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Function to fetch data from local storage
  getDataFromLocalStorage(key: string): any[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  // Function to store data in local storage
  setDataInLocalStorage(key: string, newData: any): void {
    let existingData = this.getDataFromLocalStorage(key);


    if (!existingData.some(item => item === newData)) {

      existingData.push(newData);
      localStorage.setItem(key, JSON.stringify(existingData));
    }
  }
}
