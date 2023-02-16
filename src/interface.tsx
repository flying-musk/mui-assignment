export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export interface Comment {
  name: string;
  email: string;
  id: number;
  body: string;
  postId: number;
}
export interface User {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  address: Address;
  company: Company;
}
interface Geo {
  lat: string;
  lng: string;
}
interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}
interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}
