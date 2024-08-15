import Taro from '@tarojs/taro';
import { View, Textarea, Button, Image } from '@tarojs/components'
import {useState} from 'react'
import './chat.scss'
import {sendCBTChatMessage, sendChatMessage, sendMiracleQuestionChatMessage} from "../../api/chat";

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
  // const handleSubmit = async () => {
  //   if (value.trim()) {
  //     const newMessage = { input: value, output: '' }; // 初始输出为空
  //     setConversation([...conversation, newMessage]); // 添加新消息到会话列表
  //     setValue(''); // 清空输入框
  //
  //     // 发送消息
  //     await sendChatMessage(1, 1, value);
  //   }
  // };
  //
  // useEffect(() => {
  //   if (value.trim()) {
  //     // 监听流式数据
  //     const eventSource = new EventSource('/chat/stream');
  //     eventSource.onmessage = (event) => {
  //       const message = event.data;
  //       setConversation(prev => {
  //         return prev.map(msg =>
  //           msg.input === value ? { ...msg, output: msg.output + message } : msg
  //         );
  //       });
  //     };
  //     eventSource.onerror = (error) => {
  //       console.error('EventSource failed:', error);
  //       eventSource.close();
  //     };
  //
  //     // 组件卸载时关闭EventSource
  //     return () => eventSource.close();
  //   }
  // }, [value]); // 依赖数组中包含value，确保每次value变化时都会重新创建EventSource

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


  const handleCBT = async () => {
    if (value.trim()) {
      const newMessage = { input: value, output: '' }; // 初始输出为空
      setConversation([...conversation, newMessage]); // 添加新消息到会话列表
      setValue(''); // 清空输入框

      try {
        // 调用API接口发送消息，并等待响应
        const response = await sendCBTChatMessage(2, 2, value);
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


  const handleMaricle = async () => {
    if (value.trim()) {
      const newMessage = { input: value, output: '' }; // 初始输出为空
      setConversation([...conversation, newMessage]); // 添加新消息到会话列表
      setValue(''); // 清空输入框

      try {
        // 调用API接口发送消息，并等待响应
        const response = await sendMiracleQuestionChatMessage(2, 2, value);
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
              style={{ width: '150px', height: '50px' }}
              className='message-input'
              autoHeight
            />
            <Textarea
              value={item.output}
              disabled
              style={{ width: '150px', height: '50px' }}
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
      <Button className='CBT-button' onClick={handleCBT}>CBT认知重塑</Button>
      <Button className='miracle-button' onClick={handleMaricle}>奇迹问题</Button>

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
