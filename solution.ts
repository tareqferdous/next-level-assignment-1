const formatValue = (
  value: string | number | boolean
): string | number | boolean => {
  switch (typeof value) {
    case "string":
      return value.toUpperCase();
    case "number":
      return value * 10;
    case "boolean":
      return !value;
  }
};

const getLength = (input: string | unknown[]): number => {
  if (typeof input === "string") {
    return input.length;
  } else if (Array.isArray(input)) {
    return input.length;
  }
  throw new Error("Invalid input");
};

class Person {
  constructor(public readonly name: string, public readonly age: number) {}

  getDetails(): string {
    return `"Name: ${this.name}, Age: ${this.age}"`;
  }
}

const person1 = new Person("John Doe", 30);
// console.log(person1.getDetails());

type Item = {
  title: string;
  rating: number;
};

const filterByRating = <T extends Item>(items: T[]): T[] => {
  return items.filter((item) => item.rating >= 4 && item.rating <= 5);
};

// console.log(
//   filterByRating([
//     { title: "Book A", rating: 4.5 },
//     { title: "Book B", rating: 3.2 },
//     { title: "Book C", rating: 6.0 },
//   ])
// );

type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

const filterActiveUsers = <T extends User>(users: T[]): T[] =>
  users.filter((user) => user.isActive);

// const users = [
//   { id: 1, name: "Rakib", email: "rakib@example.com", isActive: true },
//   { id: 2, name: "Asha", email: "asha@example.com", isActive: false },
//   { id: 3, name: "Rumi", email: "rumi@example.com", isActive: true },
// ];

// console.log(filterActiveUsers(users));

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

const printBookDetails = ({
  title,
  author,
  publishedYear,
  isAvailable,
}: Book): void => {
  console.log(
    `Title: ${title}, Author: ${author}, Published: ${publishedYear}, Available: ${
      isAvailable ? "Yes" : "No"
    }`
  );
};

// const anotherBook: Book = {
//   title: "1984",
//   author: "George Orwell",
//   publishedYear: 1949,
//   isAvailable: false,
// };

// printBookDetails(anotherBook);

const getUniqueValues = (
  array1: (string | number)[],
  array2: (string | number)[]
): (string | number)[] => {
  const uniqueArray: (string | number)[] = [];
  for (let i = 0; i < array1.length; i++) {
    const currentValue = array1[i];
    let exists = false;

    for (let j = 0; j < uniqueArray.length; j++) {
      if (uniqueArray[j] === currentValue) {
        exists = true;
        break;
      }
    }

    if (!exists && currentValue !== undefined) {
      uniqueArray[uniqueArray.length] = currentValue;
    }
  }

  for (let i = 0; i < array2.length; i++) {
    const currentValue = array2[i];
    let exists = false;

    for (let j = 0; j < uniqueArray.length; j++) {
      if (uniqueArray[j] === currentValue) {
        exists = true;
        break;
      }
    }

    if (!exists && currentValue !== undefined) {
      uniqueArray[uniqueArray.length] = currentValue;
    }
  }

  return uniqueArray;
};

// const array5 = [1, 2, 2, 3];
// const array6 = [3, 4, 4, 5];
// console.log(getUniqueValues(array5, array6));

interface Product {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}

const calculateTotalPrice = (products: Product[]): number => {
  if (products.length === 0) {
    return 0;
  }
  return products.reduce((total, product) => {
    const { price, quantity, discount } = product;
    const subtotal = price * quantity;
    const discountAmount =
      discount && discount >= 0 && discount <= 100
        ? subtotal * (discount / 100)
        : 0;
    const totalCost = subtotal - discountAmount;
    return total + totalCost;
  }, 0);
};

// const products = [
//   { name: "Pen", price: 10, quantity: 2 },
//   { name: "Notebook", price: 25, quantity: 3, discount: 10 },
//   { name: "Bag", price: 50, quantity: 1, discount: 20 },
// ];

// console.log(calculateTotalPrice(products));

