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

type Item = {
  title: string;
  rating: number;
};

const filterByRating = <T extends Item>(items: T[]): T[] => {
  return items.filter((item) => item.rating >= 4 && item.rating <= 5);
};

type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

const filterActiveUsers = <T extends User>(users: T[]): T[] =>
  users.filter((user) => user.isActive);

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

