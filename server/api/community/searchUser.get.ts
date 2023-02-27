import { H3Event } from "h3";
import { searchUsers } from "~/server/api/community/services/communityService";

export default eventHandler(async (event: H3Event) => {
  const query = getQuery(event);
  if (!query.search)
    throw createError({
      statusCode: 400,
      statusMessage: "Missing search query",
    });
  return await searchUsers(query.search as string);
});
