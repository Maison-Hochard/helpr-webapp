import { defineStore } from "pinia";

type Payload = {
  [key: string]: string;
};

type Action = {
  actionId: number;
  id: number;
  name: string;
  payload: Payload;
};

type FlowState = {
  nbActions: number;
  flow: {
    name: string;
    trigger: {};
    actions: Action[];
  };
};

const defaultState: FlowState = {
  nbActions: 1,
  flow: {
    name: "",
    trigger: {},
    actions: [],
  },
};

export const useFlowStore = defineStore({
  id: "flow",
  state: (): FlowState => ({
    nbActions: 1,
    flow: {
      name: "Flow " + Math.floor(Math.random() * 1000),
      trigger: {},
      actions: [],
    },
  }),
  getters: {
    getFlow(): FlowState["flow"] {
      return this.flow;
    },
  },
  actions: {
    addAction() {
      this.flow.actions.push({
        actionId: Math.floor(Math.random() * 1000),
        id: 0,
        name: "",
        payload: {},
      });
    },
    saveAction(actionId: number, actionInput: Action) {
      this.flow.actions = this.flow.actions.map((action) => {
        if (action.actionId === actionId) {
          return actionInput;
        }
        return action;
      });
    },
    removeAction(actionId: number) {
      this.flow.actions = this.flow.actions.filter((action) => action.actionId !== actionId);
    },
    reset() {
      this.$state = defaultState;
    },
  },
});
