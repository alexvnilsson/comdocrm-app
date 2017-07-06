export class Product {
    id: string;
    alias: string;
    productName: string;
    skuCode: string;
    price: string;
    priceUnit: {
        name: string;
        abbreviation: string;
    }
    currency: {
        name: string;
        abbreviation: string;
    }
}