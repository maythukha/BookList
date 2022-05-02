import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  bookDetail: Book | undefined;
  bookId: number = 0;
  errorMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(this.bookId).subscribe(book => this.bookDetail = book);
    
  }

  goBack(): void {
    this.location.back();
  }

  reset(): void{
    this.errorMessage = "";
    this.getBook();
  }

  update(): void {
    let isValid: boolean = false;

    if(this.bookDetail){
    if (this.bookDetail.title?.trim().length == 0 || this.bookDetail.title == "") {
      this.errorMessage = "Please Enter Title.";
      isValid = false;
    } else if (this.bookDetail.category?.trim().length == 0 || this.bookDetail.category == "") {
      this.errorMessage = "Please Enter Category."
      isValid = false;
    } else if (this.bookDetail.author?.trim().length == 0 || this.bookDetail.author == "") {
      this.errorMessage = "Please Enter Author."
      isValid = false;
    } else if (this.bookDetail.price == 0) {
      this.errorMessage = "Please Enter Price. eg. 1000.00"
      isValid = false;
    } else {
      isValid = true;
    }

    if (!isValid) return;
    
    this.errorMessage = "";
    this.bookService.updateBook(this.bookDetail)
        .subscribe(() => this.goBack());
    
  }
}

}
