import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  text: string = '';
  visible: boolean = false;
  subscription: Subscription;

  constructor(private _imageService: ImageService) {
    this.subscription = this._imageService.getError().subscribe((error) => {
      this.displayError(error);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayError(error: string) {
    this.text = error;
    this.visible = true;

    setTimeout(() => {
      this.text = '';
      this.visible = false;
    }, 3000);
  }
}
