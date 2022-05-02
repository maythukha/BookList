import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  title: string = "";
  category: string = "";
  author: string = "";
  price: number = 0;
  description: string = "";
  errorMessage: string = "";

  newBook: Book = {} as Book;
  @Output() addBookEvent = new EventEmitter<Book>();

  constructor() { }

  ngOnInit() {
  }

  clear() {
    this.title = "";
    this.category = "";
    this.author = "";
    this.price = 0;
    this.description = "";
    this.errorMessage = "";
  }

  addNewBook() {
    let isValid: boolean = false;

    if (this.title?.trim().length == 0 || this.title == "") {
      this.errorMessage = "Please Enter Title.";
      isValid = false;
    } else if (this.category?.trim().length == 0 || this.category == "") {
      this.errorMessage = "Please Enter Category."
      isValid = false;
    } else if (this.author?.trim().length == 0 || this.author == "") {
      this.errorMessage = "Please Enter Author."
      isValid = false;
    } else if (this.price == 0) {
      this.errorMessage = "Please Enter Price. eg. 1000.00"
      isValid = false;
    } else {
      isValid = true;
    }

    if (!isValid) return;

    this.errorMessage = "";
    this.newBook.title = this.title;
    this.newBook.category = this.category;
    this.newBook.author = this.author;
    this.newBook.price = this.price;
    this.newBook.description = this.description;

    this.addBookEvent.emit(this.newBook);
  }

}
