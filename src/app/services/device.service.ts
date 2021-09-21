import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../Models/device';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  apiUrl = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.apiUrl + 'devices');
  }
  createDevice(device: Device): Observable<Device> {
    return this.httpClient.post<Device>(this.apiUrl + 'devices', device);
  }
  updateDevice(id: number, device: Device): Observable<Device> {
    return this.httpClient.put<Device>(this.apiUrl + ':id', device);
  }
  deleteDevice(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + 'devices/' + id);
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrl + 'category');
  }
  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.apiUrl + 'category', category);
  }
  deleteCategory(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + 'category/' + id);
  }
}
