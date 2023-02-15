import { createFlowInput } from "~/types/Flow";

export async function addFlow(flowData: createFlowInput) {
  const url = "/flow";
  const res = await useAPI(url, "POST", flowData);
  console.log(res);
}
