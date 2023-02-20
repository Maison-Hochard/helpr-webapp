import { defineStore } from "pinia";
import { Trigger } from "~/types/Flow";

type Payload = {
  [key: string]: string;
};

type Action = {
  index: number;
  id: number;
  title: string;
  endpoint: string;
  name: string;
  payload: Payload;
};

type FlowState = {
  nbActions: number;
  flow: {
    name: string;
    trigger: Trigger;
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
    reset() {
      this.$state = defaultState;
    },
    saveTrigger(trigger: Trigger) {
      this.flow.trigger = trigger;
    },
    saveAction(index: number, action: Action) {
      this.flow.actions[index] = {
        index,
        ...action,
      };
      console.log(this.flow.actions);
    },
    addAction() {
      this.flow.actions.push({
        index: this.flow.actions.length,
        id: this.flow.actions.length + 1,
        title: "Empty action",
        endpoint: "",
        name: "empty",
        payload: {},
      });
    },
    deleteAction(actionId: number) {
      this.flow.actions.splice(actionId, 1);
    },
  },
});
