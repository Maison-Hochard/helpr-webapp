import { H3Event } from "h3";
import { getSomeUsers } from "~/server/api/community/services/communityService";

export default eventHandler(async (event: H3Event) => {
  return await getSomeUsers();
});
