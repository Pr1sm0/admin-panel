import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit {
  item: Item = {
    name: '',
    description: '',
    is_published: false
  };
  submitted = false;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  saveItem(): void {
    const data = {
      name: this.item.name,
      description: this.item.description
    };

    this.itemService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newItem(): void {
    this.submitted = false;
    this.item = {
      name: '',
      description: '',
      is_published: false
    };
  }

}