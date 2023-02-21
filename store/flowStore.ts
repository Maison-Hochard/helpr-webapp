import { defineStore } from "pinia";
import { Trigger } from "~/types/Flow";

type Payload = {
  [key: string]: string;
};

type Variable = {
  key: string;
  value: string;
};

type Action = {
  index: number;
  id: number;
  title: string;
  endpoint: string;
  name: string;
  payload: Payload;
  variables: Variable[];
};

type FlowState = {
  flow: {
    name: string;
    trigger: Trigger;
    actions: Action[];
  };
};

const defaultState: FlowState = {
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
    getFlowVariables(): string[] {
      const variables: string[] = [];
      if (!this.flow.trigger || !Array.isArray(this.flow.trigger.variables)) {
        return variables;
      }
      const triggerVariables = this.flow.trigger.variables.map((variable) => variable.value);
      variables.push(...triggerVariables);
      if (this.flow.actions.length === 0) {
        return variables;
      }
      const actionsVariables = this.flow.actions.flatMap((action) => {
        if (!Array.isArray(action.variables) || action.variables.length === 0) {
          return [];
        }
        return action.variables.map((variable) => variable.value);
      });
      variables.push(...actionsVariables);
      console.log(variables);
      return variables;
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
        variables: [],
      });
    },
    moveAction(currentIndex: number, newIndex: number) {
      console.log("moveAction", currentIndex, newIndex);
      const action = this.flow.actions[currentIndex];
      this.flow.actions.splice(currentIndex, 1);
      this.flow.actions.splice(newIndex, 0, action);
      this.flow.actions.forEach((action, index) => {
        action.index = index;
      });
    },
    deleteAction(actionId: number) {
      this.flow.actions.splice(actionId, 1);
    },
  },
});
