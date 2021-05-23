import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/_services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/_services/image.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Item } from '../models/item.model';
import { Image } from '../models/image.model';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.sass'],
})
export class ItemPageComponent implements OnInit {
  currentItem: Item = {
    name: '',
    price: 0,
    description: '',
    is_published: false,
  };
  message = '';
  isAdmin = false;
  isLoggedIn = false;
  role = '';
  images: Image[] = [];
  default_image: string = 'http://localhost:8080/images/default_product_photo.png';
  
  constructor(
    private itemService: ItemService,
    private imageService: ImageService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getImages(this.route.snapshot.params.id);
    this.getItem(this.route.snapshot.params.id);
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;
      this.isAdmin = this.role.includes('admin');
    }
  }

  getItem(id: string): void {
    this.itemService.get(id).subscribe(
      (data) => {
        this.currentItem = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImages(itemId: string): void {
    this.imageService.getAll(itemId).subscribe(
      (data) => {
        if(data[0]){
          this.images = data;
        } 
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
