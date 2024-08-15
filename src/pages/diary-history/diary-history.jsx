import { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import './diary-history.scss';
import { queryDiary } from '../../api/journal';
import {getChatSummarize} from "../../api/chat";
// import { getChatSummarize } from '../../api/chat';

export default function DiaryHistory() {
  const [diaries, setDiaries] = useState([]);
  const [summaries, setSummaries] = useState([]);

  // 模拟从后端获取日记数据
  const fetchDiaries = async () => {
    try {
      const start_time = new Date(2024, 7, 15, 0, 0, 0); // 注意月份是从0开始的
      const end_time = new Date(2024, 7, 15, 23, 59, 59);

      const formattedStart = start_time.toISOString().slice(0, 19).replace('T', ' ');
      const formattedEnd = end_time.toISOString().slice(0, 19).replace('T', ' ');

      // 使用这些格式化的日期字符串
      const response = await queryDiary(2, formattedStart, formattedEnd);
      console.log(JSON.stringify(response))

      const processedDiaries = response.map((journal) => ({
        id: journal.user_id,
        date: journal.created_at,
        content: journal.message,
      }));

      setDiaries(processedDiaries);

    } catch (error) {
      console.error('Error fetching diaries:', error);
    }
  };

  // 模拟从后端获取总结数据
  const fetchSummaries = async () => {
    try {
      const summaryString = await getChatSummarize(1, 1);
      const parsedSummary = processSummary(summaryString);

      setSummaries([parsedSummary]); // 假设每次只返回一个总结

    } catch (error) {
      console.error('Error fetching summaries:', error);
    }
  };

  const processSummary = (summary) => {
    // Split summary by newline characters
    const lines = summary.split('\n');
    return (
      <View>
        {lines.map((line, index) => (
          <Text key={index} style={{ marginBottom: index < lines.length - 1 ? 10 : 0 }}>
            {line}
          </Text>
        ))}
      </View>
    );
  };

  // 在组件加载时获取数据
  useEffect(() => {
    (async () => {
      try {
        console.log("fetch diaries");
        await fetchDiaries();
        await fetchSummaries();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <View className='diary-history'>
      <View className='diary-section'>
        <Text className='section-title'>日记</Text>
        {diaries.map((diary) => (
          <View key={diary.id} className='diary-item'>
            <Text className='diary-date'>{diary.date}</Text>
            <Text className='diary-content'>{diary.content}</Text>
          </View>
        ))}
      </View>

      <View className='summary-section'>
        <Text className='section-title'>总结报告</Text>
        {summaries.map((summary) => (
          <View key={summary} className='summary-item'>
            <Text className='summary-content'>{summary}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
