export type TOProduct = {
  pid: string;
  oquantity: number;
};

export type TOrder = {
  userName: string;
  userEmail: string;
  products: TOProduct[];
  oprice: number;
};
