export interface User {
  id: string;
  firstName: string;
  lastName: string;
  zip: string;
  city: string;
  image: string;
  address?: string;
  email?: string;
  phone?: string;
  interests?: string[];
}
