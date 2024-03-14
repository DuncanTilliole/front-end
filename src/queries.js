import { HttpError } from 'wasp/server'

export const getConversations = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Conversation.findMany({
    where: {
      userId: args.userId
    }
  });
}

export const getMessages = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Message.findMany({
    where: {
      conversationId: args.conversationId
    }
  });
}