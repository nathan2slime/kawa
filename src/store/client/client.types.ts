export type NewClient = {
  phone: string;
  document: string;
  name: string;
  email: string;
};

export type Client = {
  id: string;
  created_at: string;
} & NewClient;

export type ClientState = {
  data: Client[];
};
