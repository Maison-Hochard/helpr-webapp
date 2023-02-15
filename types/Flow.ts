export interface addActionInput {
  id: number;
  order: number;
  payload: string;
}

export interface createFlowInput {
  name: string;
  triggerId: number;
  actions: addActionInput[];
}

export interface flowBuilderData {
  id: number;
  name: string;
  description: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  actions: Action[];
  triggers: Trigger[];
}

export interface Action {
  id: number;
  title: string;
  description: string;
  endpoint: string;
  name: string;
  providerId: number;
  createdAt: string;
  updatedAt: string;
  variables: Variable[];
}

interface Variable {
  id: number;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  actionId: number;
}

export interface Trigger {
  id: number;
  provider: string;
  name: string;
  description: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  providerId: number;
}
