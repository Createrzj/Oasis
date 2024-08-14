import Taro from '@tarojs/taro';
import { View, Image, Button, Text } from '@tarojs/components';
import './index.scss';

export default function Index() {
  // Function to handle navigation to the "记录日记" page
  const handleJournalNavigation = () => {
    Taro.navigateTo({
      url: '/pages/journal/journal' // Update with the path to your journal page
    });
  };

  // Function to handle navigation to the "小猫对话" page
  const handleChatNavigation = () => {
    Taro.navigateTo({
      url: '/pages/chat/chat' // Update with the path to your chat page
    });
  };


  return (
    <View className='index'>
      <View className='background-image'></View>
      <View className='top-right-buttons'>
        <Button className='bag-button'>
          <Image
            className='bag'
            src={require("../../asserts/bag.png")}
            mode='aspectFit'
          />
        </Button>
        <Button className='date-button'>
          <Image
            className='date'
            src={require("../../asserts/index_date.png")}
            mode='aspectFit'
          />
        </Button>
      </View>
      <Image
        className='cat'
        src={require("../../asserts/index_cat.png")}
        mode='aspectFit'
      />
      <View className='bottom-buttons'>
        <Button className='journal-button' onClick={handleJournalNavigation}>
          <Image
            className='journal'
            src={require("../../asserts/index_journal.png")}
            mode='aspectFit'
          />
          <Text className='button-text'>记录日记</Text>
        </Button>
        <Button className='chat-button' onClick={handleChatNavigation}>
          <Image
            className='chat'
            src={require("../../asserts/index_chat.png")}
            mode='aspectFit'
          />
          <Text className='button-text'>小猫对话</Text>
        </Button>
      </View>
    </View>
  );
}
