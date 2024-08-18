import Taro from '@tarojs/taro';
import { View, Text, Textarea, Button, Image } from '@tarojs/components'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './chat.scss'
import { sendCBTChatMessage, sendChatMessage, sendMiracleQuestionChatMessage } from "../../api/chat";

export default function Chat() {
  const [value, setValue] = useState('')
  const [conversation, setConversation] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSocratesModalOpen, setIsSocratesModalOpen] = useState(false)
  const [isCBTModalOpen, setIsCBTModalOpen] = useState(false)
  const [flag, setFlag] = useState(true)

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async () => {
    if (value.trim()) {
      const newMessage = { input: value, output: '' }; // 初始输出为空
      setConversation([...conversation, newMessage]); // 添加新消息到会话列表
      setValue(''); // 清空输入框

      try {
        const response = await sendChatMessage(1, 1, value);

        console.log("get response", response)

        setConversation(prevConversation =>
          prevConversation.map(msg =>
            msg.input === value ? { ...msg, output: response } : msg
          )
        );
      } catch (error) {
        console.error('Error sending chat message:', error);
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // 打开弹窗
    setFlag(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 关闭弹窗
  };

  const handleOpenSocratesModal = () => {
    setIsSocratesModalOpen(true); // 打开苏格拉底弹窗
    setFlag(false);
  };

  const handleCloseSocratesModal = () => {
    setIsSocratesModalOpen(false); // 关闭苏格拉底弹窗
  };

  const handleOpenCBTModal = () => {
    setIsCBTModalOpen(true); // 打开CBT弹窗
    setFlag(false);
  };

  const handleCloseCBTModal = () => {
    setIsCBTModalOpen(false); // 关闭CBT弹窗
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

        setConversation(prevConversation =>
          prevConversation.map(msg =>
            msg.input === value ? { ...msg, output: response } : msg
          )
        );

      } catch (error) {
        console.error('Error sending chat message:', error);
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
            <Text className='message-input'>
              {item.input}
            </Text>
            {item.output && (
              <View className='message-output'>
                <ReactMarkdown>{item.output}</ReactMarkdown>
              </View>
            )}
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
      {flag &&
      <>
        <Button className='meditation-button' onClick={handleOpenModal}>放松训练</Button>
        <Button className='CBT-button' onClick={handleOpenCBTModal}>CBT认知重塑</Button>
        <Button className='miracle-button' onClick={handleOpenSocratesModal}>苏格拉底</Button>
      </>
      }


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

      {isSocratesModalOpen && (
        <View className='custom-modal'>
          <Image
            className='me_back'
            src={require("../../asserts/me_back.png")}
            mode='aspectFit'
          />
          <View className='modal-content'>
            <View className='modal-body'>
              苏格拉底方法是一种通过提问来引导思考和自我发现的对话技巧。
              通过一系列精心设计的问题，帮助你更深入地理解问题，并找到解决方案。
            </View>
            <View className='modal-actions'>
              <Button className='modal-open-button' onClick={handleCloseSocratesModal}>
                进入
              </Button>
              <Button className='modal-close-button' onClick={handleCloseSocratesModal}>
                返回
              </Button>
            </View>
          </View>
        </View>
      )}

      {isCBTModalOpen && (
        <View className='custom-modal'>
          <Image
            className='me_back'
            src={require("../../asserts/me_back.png")}
            mode='aspectFit'
          />
          <View className='modal-content'>
            <View className='modal-body'>
              CBT认知重塑是一种心理治疗方法，通过识别和改变负面思维模式来改善情绪和行为。
              我们将帮助你识别和挑战不合理的信念，并培养更健康的思维方式。
            </View>
            <View className='modal-actions'>
              <Button className='modal-open-button' onClick={handleCloseCBTModal}>
                进入
              </Button>
              <Button className='modal-close-button' onClick={handleCloseCBTModal}>
                返回
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
