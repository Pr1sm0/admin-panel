import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  isAdmin = false;
  isLoggedIn = false;
  role = '';
  items: Item[] = [];
  currentItem?: Item;
  name = '';

  page = 1;
  count = 0;
  pageSize = 6;

  constructor(
    private itemService: ItemService,
    private tokenStorageService: TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;
      this.isAdmin = this.role.includes('admin');
    }
    this.retrieveItems();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveItems(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    if(this.isAdmin){
      this.itemService.getAll(params).subscribe(
        (response) => {
          const { items, totalItems } = response;
          this.items = items;
          this.count = totalItems;
        },
        (error) => error
      );
    } else {
      this.itemService.getAllPublished(params).subscribe(
        (response) => {
          const { items, totalItems } = response;
          this.items = items;
          this.count = totalItems;
        },
        (error) => error
      );
    }
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveItems();
  }
}
