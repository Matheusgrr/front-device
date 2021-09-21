import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../Models/device';
import { Category } from '../../Models/category';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  devices: Device[] = [];
  categories: Category[] = [];
  formDevice: FormGroup;
  showCreateDevice: boolean = false;

  constructor(
    private deviceService: DeviceService,
    private formBuilder: FormBuilder
  ) {
    this.formDevice = formBuilder.group({
      color: new FormControl('', Validators.maxLength(16)),
      partNumber: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getAllDevices();
    this.getAllCategories();
  }

  getAllDevices() {
    this.deviceService.getAllDevices().subscribe((data) => {
      this.devices = data;
      console.log(data);
    });
  }
  getAllCategories() {
    this.deviceService.getAllCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }
  toggleNewDevice() {
    this.showCreateDevice = !this.showCreateDevice;
  }
  submitNewDevice() {
    console.log(this.formDevice.getRawValue());
    const getValue = this.formDevice.getRawValue();
    const device: Device = {
      id: 0,
      color: getValue.color,
      partNumber: getValue.partNumber,
      category: { id: getValue.category, name: '' },
    };
    this.deviceService.createDevice(device).subscribe((data) => {
      console.log(data);
      this.getAllDevices();
      this.toggleNewDevice();
    });
  }
  showEditDevice(id: number) {}
  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id).subscribe((data) => {
      this.getAllDevices();
      window.location.reload();
    });
  }
}
