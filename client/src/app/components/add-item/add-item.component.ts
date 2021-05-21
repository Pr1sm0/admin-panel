import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/_services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit {
  item: Item = {
    name: '',
    price: 0,
    description: '',
    is_published: false
  };
  submitted = false;
  message = '';

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.message = '';
  }

  saveItem(): void {
    const data = {
      name: this.item.name,
      price: this.item.price,
      description: this.item.description,
      is_published: this.item.is_published
    };

    this.itemService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
          this.submitted = true;
          this.router.navigate(['/items'])
        },
        error => {
          console.log(error);
          this.message = error.error;
        });
  }

  newItem(): void {
    this.submitted = false;
    this.message = '';
    this.item = {
      name: '',
      price: 0,
      description: '',
      is_published: false
    };
  }
}