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

// // 定义一个函数来发送POST请求到'/chat接口，并返回结果
// export function sendChatMessage(conversationId, userId, userInput) {
//   const data = {
//     conversation_id: conversationId,
//     user_id: userId,
//     user_input: userInput
//   };
//
//   return apiClient.post('/chat', data)
//     .then(response => {
//       // 定义后端服务器的 base URL
//       const backendBaseUrl = 'http://127.0.0.1:5000';
//
//       // 初始化EventSource 监听服务器发送的实时数据流
//       const eventSource = new EventSource(`${backendBaseUrl}/chat/stream?conversation_id=${conversationId}&user_id=${userId}&user_input=${encodeURIComponent(userInput)}`);
//
//       // 接收到新数据时，eventSource.onmessage会被触发
//       eventSource.onmessage = function(event) {
//         const message = event.data;
//         // 将收到的回复显示在前端界面上
//         console.log('Received message from server:', message);
//
//         // 更新DOM元素，显示消息
//         const messageElement = document.getElementById('message-output');
//         if (messageElement) {
//           messageElement.textContent = message;
//         }
//       };
//       eventSource.onerror = function(error) {
//         console.error('EventSource failed:', error);
//         // 处理错误，例如关闭EventSource连接
//         eventSource.close();
//       };
//     }).catch(error => {
//         console.error('Failed to send chat message:', error);
//       });
// }

export function sendCBTChatMessage(conversationId, userId, userInput) {
  const data = {
    conversation_id: conversationId,
    user_id: userId,
    user_input: userInput
  };

  return apiClient.post('/CBT-chat', data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending chat message:', error);
      return null;
    });
}

export function sendSocratesChatMessage(conversationId, userId, userInput) {
  const data = {
    conversation_id: conversationId,
    user_id: userId,
    user_input: userInput
  };

  return apiClient.post('/Socrates-chat', data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending chat message:', error);
      return null;
    });
}

export function sendMiracleQuestionChatMessage(conversationId, userId, userInput) {
  const data = {
    conversation_id: conversationId,
    user_id: userId,
    user_input: userInput
  };

  return apiClient.post('/miracle-question-chat', data)
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
export function getChatSummarize(conversationId, userId) {
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





// import {apiClient} from "./requests";
//
// export function sendChatMessage(conversationId, userId, userInput) {
//   const data = {
//     conversation_id: conversationId,
//     user_id: userId,
//     user_input: userInput
//   };
//
//   return apiClient.post('/chat/stream', data)
//     .then(response => {
//       // 定义后端服务器的 base URL
//       const backendBaseUrl = 'http://127.0.0.1:5000';
//
//       // 初始化EventSource 监听服务器发送的实时数据流
//       const eventSource = new EventSource(`${backendBaseUrl}/chat/stream?conversation_id=${conversationId}&user_id=${userId}&user_input=${encodeURIComponent(userInput)}`);
//
//       // 接收到新数据时，eventSource.onmessage会被触发
//       eventSource.onmessage = function(event) {
//         const message = event.data;
//         // 将收到的回复显示在前端界面上
//         console.log('Received message from server:', message);
//
//         // 更新DOM元素，显示消息
//         const messageElement = document.getElementById('message-output');
//         if (messageElement) {
//           messageElement.textContent = message;
//         }
//       };
//       eventSource.onerror = function(error) {
//         console.error('EventSource failed:', error);
//         // 处理错误，例如关闭EventSource连接
//         eventSource.close();
//       };
//     }).catch(error => {
//       console.error('Failed to send chat message:', error);
//     });
// }
