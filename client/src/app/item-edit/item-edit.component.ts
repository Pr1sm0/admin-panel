import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit {
  currentItem: Item = {
    name: '',
    price: 0,
    description: '',
    is_published: false,
  };
  message = '';
  isUpdateFailed = false;
  isSuccessful = false;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getItem(this.route.snapshot.params.id);
  }

  getItem(id: string): void {
    this.itemService.get(id).subscribe(
      (data) => {
        this.currentItem = data;
      },
      (error) => error
    );
  }

  updateItem(): void {
    this.itemService.update(this.currentItem.id, this.currentItem).subscribe(
      (response) => {
        this.isUpdateFailed = false;
        this.isSuccessful = true;
        this.message = response.message;
      },
      (error) => {
        this.isUpdateFailed = true;
        this.message = error.error;
      }
    );
  }

  deleteItem(): void {
    this.itemService.delete(this.currentItem.id).subscribe(
      (response) => {
        this.router.navigate(['/items']);
      },
      (error) => {
        this.message = error.error;
      }
    );
  }

  backClicked() {
    this._location.back();
  }
}
