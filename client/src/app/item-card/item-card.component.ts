import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: any;
  image_url: string = '';
  localServerUrl = environment.LOCAL_SERVER_URL;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImage(this.item.id);
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
}
