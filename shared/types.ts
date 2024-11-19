export interface Contact {
  id: number;
  civil: {
    first: string;
    second: string;
    last: string;
    title: string;
    suffix: string;
  };
  birth: {
    date: string;
    hour: string;
    city: string;
    postcode: string;
    country: string;
  };
  death: {
    date: string;
    hour: string;
    city: string;
    postcode: string;
    country: string;
  };
  location: {
    address: string;
    complement: string;
    city: string;
    postcode: string;
    country: string;
  };
  LGBT: {
    orientation: string;
    gender: string;
    trans: boolean;
  };
  job: {
    company: string;
    title: string;
  };
  mobile: string;
  email: string;
  photos: string[];
  relations: string[][];
}