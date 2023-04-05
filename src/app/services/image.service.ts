import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private error$ = new Subject<string>();
  private searchTerm$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  setError(error: string) {
    this.error$.next(error);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  setSearchTerm(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  getImages(searchTerm: string, imagesPerPage: number, currentPage: number): Observable<any> {
    const KEY = '35068506-912222bc99148adf9bd1aa8be';
    const URL = 'https://pixabay.com/api/?key=' + KEY + '&q=' + searchTerm + '&per_page=' + imagesPerPage + '&page=' + currentPage;
    return this.http.get(URL);
  }

}
