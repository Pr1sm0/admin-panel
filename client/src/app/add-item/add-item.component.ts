import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  item: Item = {
    name: '',
    price: 0,
    description: '',
    is_published: false,
  };
  submitted = false;
  message = '';
  isSubmitFailed = false;
  isSuccessful = false;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.message = '';
  }

  saveItem(): void {
    const data = {
      name: this.item.name,
      price: this.item.price,
      description: this.item.description,
      is_published: this.item.is_published,
    };

    this.itemService.create(data).subscribe(
      (response) => {
        this.message = response.message;
        this.submitted = true;
        this.isSubmitFailed = false;
        this.isSuccessful = true;
        this.router.navigate(['/items']);
      },
      (error) => {
        this.isSubmitFailed = true;
        this.message = error.error;
      }
    );
  }
}
