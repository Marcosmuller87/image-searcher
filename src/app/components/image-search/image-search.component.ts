import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent implements OnInit {
  imageName: string = '';

  constructor(private _imageService: ImageService) { }

  ngOnInit(): void {
  }

  imageSearch() {
    if(this.imageName.length === 0) {
      this._imageService.setError('Please enter an image name');
      return;
    }
    this._imageService.setSearchTerm(this.imageName);
  }

}
