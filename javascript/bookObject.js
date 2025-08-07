function info(author, title, pages, status) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
  // this.bookInfo = function () {
  //   console.log(
  //     this.title +
  //       " by " +
  //       this.author +
  //       ", " +
  //       this.pages +
  //       " pages, " +
  //       this.status
  //   );
  // };
}

info.prototype.bookInfo = function(){
  console.log(
      this.title +
        " by " +
        this.author +
        ", " +
        this.pages +
        " pages, " +
        this.status
    );
}

const book1 = new info('JK Rowling', 'Harry Potter', 300, 'not read yet');

Object.getPrototypeOf(info.prototype) == Object.prototype;

Object.prototype.hasOwnProperty('valueOf');

book1.bookInfo();
book1.valueOf();

