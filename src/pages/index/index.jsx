import Taro from '@tarojs/taro';
import { View, Image, Button, Text } from '@tarojs/components';
import './index.scss';

export default function Index() {
  // Function to handle navigation to the "记录日记" page
  const handleJournalNavigation = () => {
    Taro.navigateTo({
      url: '/pages/journal/journal'
    });
  };

  // Function to handle navigation to the "小猫对话" page
  const handleChatNavigation = () => {
    Taro.navigateTo({
      url: '/pages/chat/chat'
    });
  };

  const handleHistoryNavigation = () => {
    Taro.navigateTo({
      url: '/pages/diary-history/diary-history'
    });
  };

  return (
    <View className='index'>
      <Image
        className='oasis'
        src={require("../../asserts/oasis.png")}
        mode='aspectFit'
      />
      <View className='background-image'></View>
      <View className='top-right-buttons'>
        {/*<Button className='bag-button'>*/}
          <Image
            className='bag bag-button'
            src={require("../../asserts/bag.png")}
            mode='aspectFit'
          />
        {/*</Button>*/}
        {/*<Button className='date-button' onClick={handleHistoryNavigation}>*/}
          <Image
            className='date date-button'
            src={require("../../asserts/index_date.png")}
            mode='aspectFit'
            onClick={handleHistoryNavigation}
          />
        {/*</Button>*/}
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
