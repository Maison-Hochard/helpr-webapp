interface Payload {
  [key: string]: string;
}

export interface createActionInput {
  id: number;
  payload: Action;
}

export interface flowBuilderData {
  id: number;
  name: string;
  description: string;
  logo: string;
  actions: Action[];
  triggers: Trigger[];
}

export interface Action {
  index: number;
  id: number;
  title: string;
  description?: string;
  endpoint: string;
  name: string;
  providerId?: number;
  variables: Variable[];
  payload?: Payload;
}

interface Variable {
  id: number;
  title: string;
  name: string;
  value: string;
  actionId?: number;
  triggerId?: number;
}

export interface Trigger {
  id: number;
  provider: string;
  name: string;
  description: string;
  value: string;
  providerId: number;
  variables: Variable[];
}
