// export class Observable<T> {
//     name:string
//   // ... implementation left as an exercise for the reader ...
// }

// // interface Observable<T> {
// //     map<U>(f: (x: T) => U): Observable<U>
// //   }


// observable.ts
export class Observable<T> {
    // ... still no implementation ...
  }
  declare global {
    interface Array<T> {
      toObservable(): Observable<T>;
    }
  }
//   Array.prototype.toObservable = function () {
//     // ...
//   };