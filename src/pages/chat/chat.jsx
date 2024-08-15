import Taro from '@tarojs/taro';
import { View, Textarea, Button, Image } from '@tarojs/components'
import { useState } from 'react'
import './chat.scss'
import {sendChatMessage, queryChatHistory} from "../../api/chat";

export default function Chat() {
  const [value, setValue] = useState('')
  const [conversation, setConversation] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleOpenModal = () => {
    setIsModalOpen(true); // 打开弹窗
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 关闭弹窗
  };

  // Function to handle navigation to the "meditation" page
  const handleMeditationNavigation = () => {
    setIsModalOpen(false); // 关闭弹窗
    Taro.navigateTo({
      url: '/pages/meditation/meditation' // Update with the path to your journal page
    });
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
              autoHeight
            />
            <Textarea
              value={item.output}
              disabled
              className='message-output'
              autoHeight
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
      <Button className='meditation-button' onClick={handleOpenModal}>放松训练</Button>
      <Button className='CBT-button'>CBT认知重塑</Button>
      <Button className='miracle-button'>奇迹问题</Button>

      {isModalOpen && (
        <View className='custom-modal'>
          <Image
          className='me_back'
          src={require("../../asserts/me_back.png")}
          mode='aspectFit'
          />
          <View className='modal-content'>
            <View className='modal-body'>
              嗨! 感到身体因为心情而紧张不适吗？来试一试放松训练吧。
              我们会通过深呼吸和提供特定的身体放松动作帮助你重新集中注意力，放松全身。
            </View>
            <View className='modal-actions'>
              <Button className='modal-open-button' onClick={handleMeditationNavigation}>
                进入
              </Button>
              <Button className='modal-close-button' onClick={handleCloseModal}>
                返回
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
