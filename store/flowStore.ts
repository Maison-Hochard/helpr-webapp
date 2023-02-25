import { defineStore } from "pinia";
import { Action, Trigger } from "~/types/Flow";

type FlowState = {
  flow: {
    name: string;
    description: string;
    enabled: boolean;
    public: boolean;
    trigger: Trigger | object;
    actions: Action[];
  };
};

const defaultState: FlowState = {
  flow: {
    name: "Flow " + Math.floor(Math.random() * 1000),
    description: "",
    enabled: false,
    public: false,
    trigger: {},
    actions: [],
  },
};

export const useFlowStore = defineStore({
  id: "flow",
  state: (): FlowState => ({
    flow: {
      name: "Flow " + Math.floor(Math.random() * 1000),
      description: "",
      enabled: false,
      public: false,
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
      if (confirm("Are you sure you want to reset?")) {
        this.$state = defaultState;
      }
    },
    saveTrigger(trigger: Trigger) {
      this.flow.trigger = trigger;
    },
    saveAction(index: number, action: Action) {
      this.flow.actions[index] = {
        index,
        ...action,
      };
    },
    addAction() {
      this.flow.actions.push({
        index: this.flow.actions.length,
        id: this.flow.actions.length + 1,
        title: "Empty action",
        endpoint: "",
        name: "empty",
        payload: {},
        variables: [],
      });
    },
    moveAction(currentIndex: number, newIndex: number) {
      const currentAction = this.flow.actions[currentIndex];
      const targetAction = this.flow.actions[newIndex];
      this.flow.actions[currentIndex] = targetAction;
      this.flow.actions[newIndex] = currentAction;
      currentAction.index = newIndex;
      targetAction.index = currentIndex;
    },
    deleteAction(index: number) {
      this.flow.actions.splice(index, 1);
    },
  },
});
