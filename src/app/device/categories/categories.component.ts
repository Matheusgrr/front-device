import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../../Models/category';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  showCreateCategory: boolean = false;
  formCategory: FormGroup;

  constructor(
    private deviceService: DeviceService,
    private formBuilder: FormBuilder
  ) {
    this.formCategory = formBuilder.group({
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  toggleNewCategory() {
    this.showCreateCategory = !this.showCreateCategory;
  }

  getAllCategories() {
    this.deviceService.getAllCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }
  deleteCategory(id: number) {
    this.deviceService.deleteCategory(id).subscribe((data) => {
      this.getAllCategories();
      window.location.reload();
    });
  }

  submitNewCategory() {
    console.log(this.formCategory.getRawValue());
    const newCategory: Category = {
      id: 0,
      name: this.formCategory.getRawValue().name,
    };
    this.deviceService.createCategory(newCategory).subscribe((data) => {
      console.log(data);
      this.getAllCategories();
      this.toggleNewCategory();
    });
  }
}
