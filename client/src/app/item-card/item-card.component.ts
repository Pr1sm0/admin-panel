import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() item: any;
  image_url: string = "";

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImage(this.item.id);
  }

  getImage(itemId: string): void {
    this.imageService.get(itemId).subscribe(
      (data) => {
        if(data){
          this.image_url = data.image_url;
        } else {
          this.image_url = 'http://localhost:8080/images/default_product_photo.png';
        }
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
