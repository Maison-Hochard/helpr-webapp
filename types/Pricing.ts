export type Plan = {
  id: string;
  name: string;
  price: number;
  priceId: string;
  description: string;
  features: string[];
};

export const Plans = {
  TRIAL: {
    id: "trial",
    name: "Trial",
    priceId: "price_1MY5DVCk9AfBe7l2XxB83AfK",
  },
  PRO: {
    id: "pro",
    name: "Pro",
    priceId: "price_1MVgP9Ck9AfBe7l2bMuF95xP",
  },
  PREMIUM: {
    id: "premium",
    name: "Premium",
    priceId: "price_1MVgP9Ck9AfBe7l2bMuF95xP",
  }
};