import { useState } from 'react';
import { View, Text, Textarea, Button } from '@tarojs/components';
import { saveDiary } from "../../api/journal"
import './journal.scss';

function showSuccessPopup() {
  alert('日记保存成功！');
}

function showErrorPopup(errorMessage) {
  alert(`保存日记失败: ${errorMessage}`);
}

const Journal = () => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const getFormattedDate = () => {
    const date = new Date();
    const options = {year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long'};
    const formattedDate = date.toLocaleDateString('zh-CN', options);
    return formattedDate.replace(/星期(.)/, (_, weekday) => `周${weekday}`);
  };

  const handleContentChange = (e) => {
    const value = e.detail.value;
    setContent(value);
    setWordCount(value.length);
  };

  const handleSave = async () => {
    try {
      // 保存日记内容的逻辑
      const response = await saveDiary(2, content);

      if (response) {
        console.log('日记保存成功:', response);
        // 显示保存成功的弹窗
        showSuccessPopup();

        // 清空内容
        setContent('');
        setWordCount(0);
      }
    } catch (error) {
      console.error('保存日记失败:', error);
      // 显示错误提示
      showErrorPopup(error.message);
    }
  };


  return (
    <View className='container'>
      <View className='header'>
        <Text className='date'>{getFormattedDate()}</Text>
      </View>

      <Textarea
        className='textarea'
        placeholder='写下今日感想，感恩，成长，快乐...'
        value={content}
        onInput={handleContentChange}
        autoHeight
      />

      <View className='footer'>
        <Text className='word-count'>字数: {wordCount}</Text>
        <Button className='save-button' onClick={handleSave}>保存</Button>
      </View>
    </View>
  );
};

export default Journal
