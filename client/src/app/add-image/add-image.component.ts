import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss'],
})
export class AddImageComponent implements OnInit {
  image = {
    size: 'original',
    item_id: this.route.snapshot.params.itemId,
    image_url: '',
  };
  selectedFile: any;
  message = '';
  imageSrc: any;

  constructor(
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.message = '';
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.message = '';
    if (this.selectedFile) {
      const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(this.selectedFile);
    }
  }

  saveImage(): void {
    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('itemImage', this.selectedFile, this.selectedFile.name);
      uploadData.append('size', this.image.size);
      uploadData.append('item_id', String(this.image.item_id));
      uploadData.append('image_url', this.image.image_url);

      this.imageService.create(uploadData).subscribe(
        (response) => {
          this.message = response.message;
          this.selectedFile = null;
          this.imageSrc = '';
        },
        (error) => {
          this.message = error.error;
        }
      );
    } else {
      this.message = 'Please, select an image to upload!';
    }
  }
}
