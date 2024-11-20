import { Network } from "inspector";

export interface Job {
  company: string;
  title: string;
}

type RelType = string;
type Target = string;
export type Relation = [RelType, Target];

type Network = string;
type Username = string;
export type Connexion = [Network, Username];

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
  location: string; // foyer
  LGBT: {
    orientation: string;
    gender: string;
    trans: boolean;
  };
  job: Job[];
  mobile: string;
  email: string;
  photos: string[];
  relations: Relation[];
  socials: Connexion[];
}