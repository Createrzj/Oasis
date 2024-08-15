import { apiClient } from "./requests"

// 定义一个函数来保存日记，并返回结果
export function saveDiary(userId, diaryContent) {
  const data = {
    user_id: userId,
    diary_content: diaryContent
  };

  return apiClient.post('/save-diary', data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error saving diary:', error);
      return null;
    });
}

// 定义一个函数来查询日记，并返回结果
function queryDiary(userId, startTime, endTime) {
  const data = {
    user_id: userId,
    start_time: startTime,
    end_time: endTime
  };

  return apiClient.get('/query-diary', { params: data })
    .then(response => response.data)
    .catch(error => {
      console.error('Error querying diary:', error);
      return null;
    });
}
