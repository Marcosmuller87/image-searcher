import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent implements OnInit {
  term: string = '';
  subscription: Subscription;
  imagesList: any[] = [];
  isLoading: boolean = false;
  imagesPerPage: number = 32;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private _imageService: ImageService) {
    this.subscription = this._imageService.getSearchTerm().subscribe((data) => {
      this.term = data;
      this.currentPage = 1;
      this.isLoading = true;
      this.displayImages();
    });
  }

  ngOnInit(): void {}

  displayImages() {
    this._imageService.getImages(this.term, this.imagesPerPage, this.currentPage).subscribe((data) => {
      this.isLoading = false;

      if (data.hits.length === 0) {
        this._imageService.setError('We can\'t find any images matching your search');
        return
      }
      this.totalPages = Math.ceil(data.totalHits / this.imagesPerPage);

      this.imagesList = data.hits;
    }, error => {
      this._imageService.setError('Something went wrong');
      this.isLoading = false;
    });
  }

  previousPage() {
    this.currentPage--;
    this.isLoading = true;
    this.imagesList = [];
    this.displayImages();
  }

  nextPage() {
    this.currentPage++;
    this.isLoading = true;
    this.imagesList = [];
    this.displayImages();
  }

  previousPageClass() {
    if(this.currentPage === 1) {
      return false;
    }
    return true;
  }

  nextPageClass() {
    if(this.currentPage === this.totalPages) {
      return false;
    }
    return true;
  }

}
