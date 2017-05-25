export class Account {
    id: string;
    slug: string;
    name: string;
    businessEntity: {
      legalName: string;
      registrationNumber: string;
      address: Address;
      billing: {
        accountant: {
          legalName: string;
        };
        address: Address;
      };
    };
    contact: {
      email: string;
      phone: string;
    }
}

export class Address {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}