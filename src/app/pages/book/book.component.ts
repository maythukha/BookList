import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  // bookTitle: string | undefined;
  public isCollapsed = true;

  // input data
  newBookTitle: string | undefined;
  newBookCategory: string | undefined;
  newBookAuthor: string | undefined;
  newBookPrice: number = 0;
  newBookDescription: string | undefined;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  searchBook(searchBookTitle: string): void {
    console.log("Search Book Title : ", searchBookTitle);

    if (searchBookTitle == "") {
      this.getBooks();
    } else {
      this.bookService.searchBooks(searchBookTitle)
        .subscribe(books => this.books = books);
    }
  }

  addNewBook(newBook: Book): void {
    this.bookService.addBook(newBook)
      .subscribe(book => {
        this.books.push(book);
      });
    this.isCollapsed = true;
  }

  delete(book: Book): void {
    this.books = this.books.filter(bk => bk !== book);
    this.bookService.deleteBook(book.id).subscribe();
  }

}
