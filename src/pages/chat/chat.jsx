import { View, Textarea, Button, Image } from '@tarojs/components'
import { useState } from 'react'
import './chat.scss'
import {sendChatMessage, queryChatHistory} from "../../api/chat";

export default function Chat() {
  const [value, setValue] = useState('')
  const [conversation, setConversation] = useState([])

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async () => {
    if (value.trim()) {
      const newMessage = { input: value, output: '' }; // 初始输出为空
      setConversation([...conversation, newMessage]); // 添加新消息到会话列表
      setValue(''); // 清空输入框

      try {
        // 调用API接口发送消息，并等待响应
        const response = await sendChatMessage(1, 1, value);
        if (response) {
          // 如果API调用成功，更新会话列表中的输出
          setConversation(prevConversation =>
            prevConversation.map(msg =>
              msg.input === value ? { ...msg, output: response } : msg
            )
          );
        }
      } catch (error) {
        console.error('Error sending chat message:', error);
        // 这里可以添加错误处理逻辑，比如显示错误消息给用户
      }
    }
  };

  return (
    <View className='container'>
      <Image
        className='cat'
        src={require("../../asserts/chat_cat.png")}
        mode='aspectFit'
      />
      <View className='conversation'>
        {conversation.map((item, index) => (
          <View key={index} className='message'>
            <Textarea
              value={item.input}
              disabled
              className='message-input'
            />
            <Textarea
              value={item.output}
              disabled
              className='message-output'
            />
          </View>
        ))}
      </View>
      <View className='footer'>
        <View className='input-container'>
          <Textarea
            value={value}
            onInput={handleInputChange}
            className='input-textarea'
            maxlength={-1}
          />
          <Button className='confirm-button' onClick={handleSubmit}></Button>
        </View>
      </View>
    </View>
  )
}
