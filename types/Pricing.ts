export type Plan = {
  id: string;
  name: string;
  price: number;
  priceId: string;
  description: string;
  features: string[];
}

export enum AvailablePlans {
  PRO = "price_1MVgP9Ck9AfBe7l2bMuF95xP",
  PREMIUM = "price_1MVgP9Ck9AfBe7l2bMuF95xP",
}