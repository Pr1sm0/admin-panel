import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/_services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.sass']
})
export class ItemDetailsComponent implements OnInit {
  currentItem: Item = {
    name: '',
    price: 0,
    description: '',
    is_published: false
  };
  message = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getItem(this.route.snapshot.params.id);
  }

  getItem(id: string): void {
    this.itemService.get(id)
      .subscribe(
        data => {
          this.currentItem = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentItem.name,
      price: this.currentItem.price,
      description: this.currentItem.description,
      is_published: status
    };

    this.itemService.update(this.currentItem.id, data)
      .subscribe(
        response => {
          this.currentItem.is_published = status;
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  updateItem(): void {
    this.itemService.update(this.currentItem.id, this.currentItem)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  deleteItem(): void {
    this.itemService.delete(this.currentItem.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/items']);
        },
        error => {
          console.log(error);
        });
  }
}