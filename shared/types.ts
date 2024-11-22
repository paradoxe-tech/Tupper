type Datestring = string;

export interface Organization {
  name: string;
  title: string;
  from: Datestring;
  to: Datestring;
  childs: Organization[];
}

type RelType = string;
type Target = string;
type Relation = [RelType, Target];

type Network = string;
type Username = string;
type Connexion = [Network, Username];

type Group = string; // 'G' + str(int)

type PlaceId = string; // '#' + str(int)
export interface Place {
  id: PlaceId;
  address: string;
  complement: string;
  city: string;
  postcode: string;
  country: string;
  latitude: number;
  longitude: number;
}

type ContactId = string; // '@'+ str(int)
export interface Contact {
  id: ContactId;
  civil: {
    first: string;
    second: string;
    last: string;
    title: string;
    suffix: string;
  };
  birth: {
    date: Datestring;
    location: PlaceId;
  };
  death: {
    date: Datestring;
    location: PlaceId;
  };
  location: PlaceId[];
  LGBT: {
    orientation: string;
    gender: string;
    trans: boolean;
  };
  job: Organization[];
  mobile: string;
  email: string;
  photos: string[];
  relations: Relation[];
  socials: Connexion[];
  groups: Group[];
}