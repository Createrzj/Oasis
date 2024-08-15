import Taro from '@tarojs/taro';
import './app.scss';

function App({ children }) {
  Taro.useLaunch(() => {
    console.log('App launched.');
    Taro.redirectTo({
      url: '/pages/loading/loading' // Redirect to loading page on launch
    });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
