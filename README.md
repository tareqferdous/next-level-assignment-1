## Blog 1: Interface vs Type: TypeScript-এ কোনটি কখন ব্যবহার করবেন?

TypeScript শিখতে গেলে সবচেয়ে বেশি যে জিনিসটা নিয়ে কনফিউশন হয়, তা হলো interface আর type—দুটোরই কাজে মিল আছে, আবার পার্থক্যও আছে।
এখানে আমরা ভালোভাবে বুঝে নেয়ার চেষ্টা করবো, কোনটা কখন ব্যবহার করলে ভালো হয়। এই পার্থক্যগুলো বুঝে ফেললে কোড আরও পরিষ্কার, স্কেলেবল এবং মেইনটেইনেবল হবে।

### Interface vs Type: Key Differences

যদি ডেটার ধরন কোনো অবজেক্ট-স্ট্রাকচারের মতো হয়, তাহলে ইন্টারফেস ব্যবহার করাই ভালো, কারণ এটি অবজেক্ট স্ট্রাকচারের সাথে খুব সুন্দরভাবে মিলে যায়। Interface হলো TypeScript এ একটি object এর structure declare করার সবচেয়ে উপযোগী উপায়। এর মাধ্যমে typescript বুঝতে পারে যে এই object এ কোন কোন property থাকবে এবং property type কী হবে।

**For example:**

```ts
interface User {
  name: string;
  age: number;
}

const person: User = {
  name: "Tareq",
  age: 28,
};
```

অনেক সময় আমাদের এমন ধরনের টাইপ দরকার হয় যেগুলো অবজেক্টের মতো নয়—যেমন ইউনিয়ন (|), লিটারেল টাইপ, বা প্রিমিটিভ টাইপ, ফাংশন টাইপ, টিউপল। এইসব ক্ষেত্রে interface কাজ করে না। এসব ক্ষেত্রে আমরা **type** ব্যবহার করবো

**For example:**

```ts
// Union
type Status = "ok" | "error";

// Literal + Primitive
type ID = number;
type Role = "admin" | "user";

// Function type
type Multiply = (a: number, b: number) => number;

// Tuple
type Point = [number, number];
```

### Union এবং Literal টাইপের ব্যবহারের পার্থক্য

এমনকি interface A এবং interface B তৈরি করে এগুলোকে মিলিয়ে নতুন তৈরী করা যায় কিন্তু এই ফ্লেক্সিবিলিটি ইন্টারফেস দিয়ে করা যায় না।
Interface এ Union (|) ব্যবহার করে নতুন ইন্টারফেস তৈরী করা যায় না।ইন্টারফেস সবসময় অবজেক্টের মতো কাঠামো অনুসরণ করে।

**For example:**

```ts
interface A {
  x: number;
}
interface B {
  y: string;
}

// Type দিয়ে union করা যায়
type AB = A | B;

const a: AB = { x: 10 };
const b: AB = { y: "hi" };
```

### নতুন property যোগ করার পার্থক্য

আরেকটি পার্থক্য হলো interface হলে সেটিকে আবার "খুলে" নতুন প্রপার্টি যোগ করা বা extend করা যায়, কিন্তু type সরাসরি extend করা যায় না। টাইপে নতুন কিছু যোগ করতে চাইলে intersection (&) ব্যবহার করে নতুন টাইপ বানাতে হয়।

**For example:**

```ts
// Interface

interface User {
  name: string;
}

interface User {
  age: number;
}

// User = { name: string; age: number }

interface A {
  x: number;
}

interface B {
  y: string;
}

// B কে extend করে নতুন interface C
interface C extends A, B {
  z: boolean;
}
```

```
// Type এর ক্ষেত্রে

type A = { x: number };
type B = { y: string };

type C = A & B & { z: boolean };
```

<!-- Blog 1 end -->

## Blog 2 : **TypeScript-এ `keyof` কীওয়ার্ড এবং এর ব্যবহার — উদাহরণসহ সহজ ব্যাখ্যা**

TypeScript-এ অনেক সময় আমাদের object-এর keys নিয়ে কাজ করতে হয়। ভুল key ব্যবহার করলে runtime-এ সমস্যা হতে পারে। `keyof` keyword ব্যবহার করলে এই ঝুঁকি কমে। এটি একটি object এর সব key কে union type হিসেবে বের করে দেয়। ফলে, আমরা শুধু valid key ব্যবহার করতে পারবো, আর ভুল key দিলে compile-time error দেখাবে।

**উদাহরণ:**

```ts
type Vehicle = { car: string; bike: string; cng: string };
type VehicleKeys = keyof Vehicle; // "car" | "bike" | "cng"

const myVehicle: VehicleKeys = "bike"; // ✔️ valid
// const wrong: VehicleKeys = "truck"; // ❌ Error
```

### Generics + keyof দিয়ে type-safe value access

`keyof`এর সাথে Generics ব্যবহার করলে object থেকে value access করা safe হয়। একই function বিভিন্ন object-এর জন্য reusable হয়, আর ভুল key হলে TypeScript সঙ্গে সঙ্গে ধরতে পারে।

**Structure:**

```ts
const getValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
```

**Example:**

```ts
const user = { id: 1, name: "Karim" };
const userName = getValue(user, "name"); // string
// getValue(user, "email"); // ❌ Error
```

