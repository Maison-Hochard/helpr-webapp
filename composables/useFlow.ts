import { Action, Trigger } from "~/types/Flow";
import { ApiResponse } from "~/composables/useAPI";

interface createFlowInput {
  name: string;
  enabled: boolean;
  trigger: Trigger;
  actions: Action[];
}

export async function addFlow(flowData: createFlowInput) {
  const response = await useAPI<ApiResponse>("/flow", "POST", {
    name: flowData.name,
    enabled: flowData.enabled,
    triggerId: flowData.trigger.id,
    actions: flowData.actions,
  });
  console.log(response);
  if (response.statusCode === 201) {
    useSuccessToast("Flow created successfully");
    useRouter().push("/app/my-flows");
  } else {
    useErrorToast(response.message);
    return;
  }
}

export async function updateFlowStatus(flowId: number, status: boolean) {
  const response = await useAPI<ApiResponse>(`/flow/${flowId}/status`, "PUT", {
    enabled: status,
  });
  if (response.statusCode === 200) {
    useSuccessToast("Flow status updated successfully");
  } else {
    useErrorToast(response.message);
    return;
  }
}

export async function deleteFlow(flowId: number, refresh: () => void) {
  if (confirm("Are you sure you want to delete this flow?")) {
    const response = await useAPI<ApiResponse>(`/flow/${flowId}`, "DELETE");
    if (response.statusCode === 200) {
      useSuccessToast("Flow deleted successfully");
      refresh();
    } else {
      useErrorToast(response.message);
      return;
    }
  }
}

export async function getUserFlows() {
  const response = await useAPI<ApiResponse>("/flow", "GET");
  if (response.statusCode === 200) {
    return response.data;
  } else {
    useErrorToast(response.message);
    return;
  }
}
