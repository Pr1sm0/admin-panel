import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { environment } from '../../environments/environment';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: any;
  image_url: string = '';
  localServerUrl = environment.LOCAL_SERVER_URL;
  role = '';
  isAdmin = false;
  isLoggedIn = false;

  constructor(private imageService: ImageService, private itemService: ItemService, private tokenStorageService: TokenStorageService,) {}

  ngOnInit(): void {
    this.getImage(this.item.id);
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;
      this.isAdmin = this.role.includes('admin');
    }
  }

  getImage(itemId: string): void {
    this.imageService.get(itemId).subscribe(
      (data) => {
        if (data) {
          this.image_url = `${this.localServerUrl}${data.image_url}`;
        } else {
          this.image_url = `${this.localServerUrl}/images/default_product_photo.png`;
        }
      },
      (error) => error
    );
  }

  updatePublished(status: boolean): void {
    const data: Item = {
      name: this.item.name,
      price: this.item.price,
      description: this.item.description,
      is_published: status,
    };

    this.itemService.update(this.item.id, data).subscribe(
      (response) => {
        this.item.published = status;
        window.location.reload();
      },
      (error) => error
    );
  }
}
