class Booking {
  constructor(user) {
    this.user = user;
    this.bookingDate = new Date();
    this.setReturnDate();
    this.booksList = [];
    this.penalty = 0;
  }

  setReturnDate() {
    this.returnDate = new Date();
    this.returnDate.setDate(this.bookingDate.getDate() + 7);
    this.returnDate.setHours(24);
    this.returnDate.setMinutes(59);
    this.returnDate.setSeconds(59);
    this.returnDate.setMilliseconds(999);
  }

  bookABook(book) {
    this.booksList.push(book);
    book.changeQuantity(-1);
  }

  returnBook(book) {
    this.countPenalty();
    this.booksList.splice(this.booksList.indexOf(book), 1);
    book.changeQuantity(1);
  }

  countPenalty() {
    const currentDate = new Date(2022, 1, 18);
    const numberOfDelayDays = Math.trunc(
      (currentDate - this.returnDate) / 1000 / 60 / 60 / 24 + 1
    );
    if (numberOfDelayDays >= 0) {
      for (let i = 0; i < numberOfDelayDays; i++) {
        this.penalty = this.penalty * 1.001 + 10;
      }
    }
  }
}

module.exports = Booking;

// Booking dostaje użytkownika w constructorze

// Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara

// Ma umożliwiać:
// - usuwanie i dodawanie książki do listy wyporzyczonych książek
// - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
// każdy dzień zwłoki to naliczenie jakiejś kary.
