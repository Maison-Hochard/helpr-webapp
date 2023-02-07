export type createActionInput = {
  name: string;
  title: string;
  payload: string;
}

export type createFlowInput = {
  name: string;
  description: string;
  trigger: string;
  actions: createActionInput[];
}

export async function addFlow(flowData: createFlowInput) {
  const url = "/flow";
  const res = await useAPI(url, "POST", flowData);
  console.log(res);
}