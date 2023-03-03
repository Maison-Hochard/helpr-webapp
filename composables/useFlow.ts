import { Action, Trigger } from "~/types/Flow";
import { ApiResponse } from "~/composables/useAPI";

interface createFlowInput {
  name: string;
  description: string;
  enabled: boolean;
  public: boolean;
  trigger: Trigger;
  actions: Action[];
}

// create webhook if flowData.trigger.webhook is true

// 9ee6881b-3afa-4cca-9b23-fc14c78181a3 Cooperantis
// 34b08c67-0366-4cc0-8a32-07d481c045f1 Area

async function createWebhook(provider: string, flowName: string) {
  const response = await useAPI<ApiResponse>(`/${provider}/create-webhook`, "POST", {
    name: "Helpr - " + flowName,
    teamId: "34b08c67-0366-4cc0-8a32-07d481c045f1",
  });
  if (response.statusCode === 201) {
    return response.data;
  } else {
    useErrorToast(response.message);
    return;
  }
}

export async function addFlow(flowData: createFlowInput) {
  const response = await useAPI<ApiResponse>("/flow", "POST", {
    name: flowData.name,
    description: flowData.description,
    enabled: flowData.enabled,
    public: flowData.public,
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

export async function updateFlowPublicStatus(flowId: number, status: boolean) {
  const response = await useAPI<ApiResponse>(`/flow/${flowId}/public`, "PUT", {
    public: status,
  });
  if (response.statusCode === 200) {
    useSuccessToast("Flow public status updated successfully");
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

export async function getUserFlowsById(userId: number) {
  const response = await useAPI<ApiResponse>(`/flow/user/${userId}`, "GET");
  if (response.statusCode === 200) {
    return response.data;
  } else {
    useErrorToast(response.message);
    return;
  }
}
