import { View, Button, Image, Textarea, Text } from '@tarojs/components'
import './journal.scss'
import { useState, useEffect } from 'react'

const Journal = () => {
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const date = new Date()
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    setCurrentDate(formattedDate)
  }, [])

  const handleSubmit = () => {
    console.log('Button clicked')
    // 处理提交逻辑
  }

  return (
    <View className='container'>
      <View className='image-container'>
        <Text className='date-display'>{currentDate}</Text>
        <Image
          className='journal'
          src={require("../../asserts/journal.png")}
          mode='aspectFit'
        />
        <Button className='submit-button' onClick={handleSubmit}>提交</Button>
        <Textarea
          className='input-journal'
          maxlength={-1}
          autoFocus={true}
        />
      </View>
    </View>
  )
}

export default Journal
