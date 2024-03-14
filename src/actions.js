import { HttpError } from 'wasp/server'

export const sendMessage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const { userId, conversationId, text } = args;
  const conversation = await context.entities.Conversation.findUnique({
    where: { id: conversationId }
  });
  if (!conversation || conversation.userId !== context.user.id) { throw new HttpError(403) };
  return context.entities.Message.create({
    data: {
      text,
      conversation: { connect: { id: conversationId } }
    }
  });
}

export const getBotResponse = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  // Call chatbot backend with message text and get response
  const botResponse = await callChatbotBackend(args.messageText);

  // Create a new Message with the received response
  const newMessage = await context.entities.Message.create({
    data: {
      text: botResponse,
      isBot: true,
      conversation: { connect: { id: args.conversationId } }
    }
  });

  return newMessage;
}