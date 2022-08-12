export const MessageConverter = (data: any) => {
  try {
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
  } catch (error) {
    return data;
  }

  if (data.hasOwnProperty("message") && typeof data?.message === "string") {
    return data?.message;
  }
  if (Array.isArray(data?.message)) {
    return Object.values(data?.message)
      .map((d: any) => {
        return Object.values(d).join("\n");
      })
      .join("\n");
  }

  return Object.values(data?.message).join("\n");
};
