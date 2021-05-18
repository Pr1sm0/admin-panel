import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  currentItem?: Item;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
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

    this.itemService.getAll(params)
    .subscribe(
      response => {
        const { items, totalItems } = response;
        this.items = items;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveItems();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveItems();
  }

  refreshList(): void {
    this.retrieveItems();
    this.currentItem = undefined;
    this.currentIndex = -1;
  }

  setActiveItem(item: Item, index: number): void {
    this.currentItem = item;
    this.currentIndex = index;
  }

  removeAllItems(): void {
    this.itemService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchName(): void {
    this.itemService.findByName(this.name)
      .subscribe(
        data => {
          this.items = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}