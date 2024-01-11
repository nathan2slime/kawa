export type NewClient = {
  phone: string;
  document: string;
  name: string;
  email: string;
};

export type Client = {
  id: string;
} & NewClient;

export type ClientState = {
  data: Client[];
};
