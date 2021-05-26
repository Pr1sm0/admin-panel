import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute} from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Item } from '../models/item.model';
import { Image } from '../models/image.model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
  providers: [NgbCarouselConfig]
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
  localServerUrl = environment.LOCAL_SERVER_URL;
  default_image: string = `${this.localServerUrl}/images/default_product_photo.png`;
  
  constructor(
    private itemService: ItemService,
    private imageService: ImageService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    config: NgbCarouselConfig
  ) {
    config.interval = 0;
  }

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
      },
      (error) => error
    );
  }

  getImages(itemId: string): void {
    this.imageService.getAll(itemId).subscribe(
      (data) => {
        if(data[0]){
          this.images = data;
        } 
      },
      (error) => error
    );
  }
}
