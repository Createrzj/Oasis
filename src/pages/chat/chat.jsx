import { View, Textarea, Button, Image } from '@tarojs/components'
import { useState } from 'react'
import './chat.scss'

export default function Chat() {
  const [value, setValue] = useState('')
  const [conversation, setConversation] = useState([])

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    if (value.trim()) {
      setConversation([...conversation, { input: value, output: value }])
      setValue('') // 清空输入框
    }
  }

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
