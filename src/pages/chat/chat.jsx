import Taro from '@tarojs/taro';
import { View, Textarea, Button, Image } from '@tarojs/components'
import { useState } from 'react'
import './chat.scss'

export default function Chat() {
  const [value, setValue] = useState('')
  const [conversation, setConversation] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    if (value.trim()) {
      setConversation([...conversation, { input: value, output: value }])
      setValue('') // 清空输入框
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true); // 打开弹窗
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 关闭弹窗
  };

  // Function to handle navigation to the "meditation" page
  const handleMeditationNavigation = () => {
    setIsModalOpen(false); // 关闭弹窗
    Taro.redirectTo({
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
