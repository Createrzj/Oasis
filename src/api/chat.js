import { apiClient } from "./requests"


// 定义一个函数来发送POST请求到'/chat接口，并返回结果
export function sendChatMessage(conversationId, userId, userInput) {
  const data = {
    conversation_id: conversationId,
    user_id: userId,
    user_input: userInput
  };

  return apiClient.post('/chat', data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending chat message:', error);
      return null;
    });
}

// 定义一个函数来查询聊天历史，并返回结果
export function queryChatHistory(conversationId, userId) {
  const data = {
    conversation_id: conversationId,
    user_id: userId
  };

  return apiClient.post('/query-chat-history', data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error querying chat history:', error);
      return null;
    });
}

// 定义一个函数来获取聊天摘要，并返回结果
function getChatSummarize(conversationId, userId) {
  const data = {
    conversation_id: conversationId,
    user_id: userId
  };

  return apiClient.post('/get-summarize', data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error getting chat summarize:', error);
      return null;
    });
}


