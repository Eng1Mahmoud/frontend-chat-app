export const isUserOnline = (userId: string, onlineUsers: Set<string>) => {
  return onlineUsers?.has(userId);
};
