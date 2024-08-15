import React, { useEffect } from 'react'; // Import useEffect from React
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './loading.scss';

export default function Loading() {
  useEffect(() => {
    const timer = setTimeout(() => {
      Taro.redirectTo({
        url: '/pages/index/index' // Path to your main page
      });
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, []);

  return (
    <View className='loading'>
      <Image
        className='loading-gif'
        src={require("../../asserts/loading.gif")} // Adjust the path to your GIF
        mode='aspectFit'
      />
    </View>
  );
}
