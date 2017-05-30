export class Account {
    id: string;
    slug: string;
    source: {
      id: string;
      slug: string;
      displayName: string;
    }
    displayName: string;
}

export class Address {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}