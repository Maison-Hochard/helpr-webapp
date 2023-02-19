import { defineStore } from "pinia";

type ActionPayload = {
  [key: string]: string;
};

type FlowAction = {
  id: number;
  name: string;
  payload: ActionPayload;
};

type FlowState = {
  name: string;
  triggerId: number;
  nbActions: number;
  actions: FlowAction[];
};

const defaultState: FlowState = {
  name: "",
  triggerId: 0,
  nbActions: 0,
  actions: [],
};

export const useFlowStore = defineStore({
  id: "flow",
  state: (): FlowState => ({
    name: "",
    triggerId: 0,
    nbActions: 0,
    actions: [],
  }),
  getters: {
    getFlowData(): FlowState {
      return {
        name: this.name,
        triggerId: this.triggerId,
        nbActions: this.nbActions,
        actions: this.actions,
      };
    },
  },
  actions: {
    setName(name: string) {
      this.name = name;
    },
    setTriggerId(triggerId: number) {
      this.triggerId = triggerId;
    },
    addAction(action: FlowAction) {
      this.actions.push(action);
      this.nbActions++;
    },
    removeAction(actionId: number) {
      this.actions = this.actions.filter((action) => action.id !== actionId);
    },
    reset() {
      this.name = defaultState.name;
      this.triggerId = defaultState.triggerId;
      this.nbActions = defaultState.nbActions;
      this.actions = defaultState.actions;
    },
  },
});
