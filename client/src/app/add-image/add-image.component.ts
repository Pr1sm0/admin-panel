import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/_services/image.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.sass']
})
export class AddImageComponent implements OnInit {
  image = {
    size: 'large',
    item_id: this.route.snapshot.params.itemId,
    image_url: '',
  };
  selectedFile: any;
  submitted = false;
  message = '';

  constructor(private imageService: ImageService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.message = '';
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0]
  }

  saveImage(): void {
    const uploadData = new FormData();
    uploadData.append('itemImage', this.selectedFile, this.selectedFile.name);
    uploadData.append('size', this.image.size);
    uploadData.append('item_id', String(this.image.item_id));
    uploadData.append('image_url', this.image.image_url);
    console.log(uploadData);

    this.imageService.create(uploadData)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
          this.submitted = true;
        },
        error => {
          console.log(error);
          this.message = error.error;
        });
  }
}