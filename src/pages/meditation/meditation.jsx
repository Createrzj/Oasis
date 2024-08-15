import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import './meditation.scss';

const Journal = () => {
    const [count, setCount] = useState(1);
    const [stage_1_start, setStage_1_start] = useState(true);
    const [stage_1_done, setStage_1_done] = useState(false);
    const [stage_2_start, setStage_2_start] = useState(false);
    const [stage_2_done, setStage_2_done] = useState(false);
    const [stage_3_start, setStage_3_start] = useState(false);
    const [stage_3_done, setStage_3_done] = useState(false);

    // Handle animation iteration events
    const handleAnimationIteration = () => {
        setCount(prevCount => prevCount + 1);
    };

    // Handle animation end event
    const handleStage_1_End = () => {
        setStage_1_done(true);
    };

    const handleStage_2_End = () => {
        setStage_2_done(true);
    };

    const handleStage_3_End = () => {
        setStage_3_done(true);
    };

    const handleGoonstep_2 = () => {
        setStage_2_start(true);
        setStage_1_start(false);
        setStage_1_done(false);
        setCount(1);
    };

    const handleGoonstep_3 = () => {
        setStage_3_start(true);
        setStage_2_start(false);
        setStage_2_done(false);
        setCount(1);
    };

    const handleChatNavigation = () => {
        Taro.redirectTo({
            url: '/pages/chat/chat' // Update with the path to your chat page
        });
    };

    return (
        <View className='container'>
            <View className='counter'>
                呼吸次数: {count}
            </View>

            {stage_1_start && (
                <>
                    <View
                        className='petal'
                        onAnimationIteration={handleAnimationIteration} // Track each animation iteration
                        onAnimationEnd={handleStage_1_End} // Track animation end
                    />
                </>
            )}

            {stage_1_done && (
                <>
                    <Text className='step-1-text'>
                        看着出现的黄色的花，随着花朵的变大变小，再跟着节奏深呼吸吧。看着花瓣，感受身体的四肢。你能感受到空气进入你的身体，放松你的肌肉。你的四肢有着知觉，那空气从头流到脚尖。你感到你的身体存在，在呼吸中，一点一点放下紧张的枷锁。
                    </Text>
                    <Image
                        className='step-1-image'
                        src={require("../../asserts/step_1.png")}
                        mode='aspectFit'
                    />
                    <Button className='nextstep' onClick={handleGoonstep_2}>
                        继续
                    </Button>
                </>
            )}

            {stage_2_start && (
                <>
                    <View
                        className='petal_2'
                        onAnimationIteration={handleAnimationIteration}
                        onAnimationEnd={handleStage_2_End}
                    />
                </>
            )}

            {stage_2_done && (
                <>
                    <Text className='step-2-text'>
                        完成这二十次呼吸后，你感到好些了吗？如果还没放松下来，不妨试试下一个环节吧。                    </Text>
                    <Image
                        className='step-2-image'
                        src={require("../../asserts/step_1.png")}
                        mode='aspectFit'
                    />
                    <Button className='nextstep' onClick={handleGoonstep_3}>
                        继续
                    </Button>
                </>
            )}

            {stage_3_start && (
                <>
                    <View
                        className='petal_3'
                    />
                    <Text className='notice'>
                        你不妨试试下面的方法
                    </Text>
                    <Image
                        className='notice-image'
                        src={require("../../asserts/notice.png")}
                        mode='aspectFit'
                    />
                    <Text className='step-3-text'>
                        挺直腰背，抬头平静地目视前方，将双臂缓缓举起。
                        手掌立起，同时深深地吸气。
                        在准备吐气的瞬间将手掌向下用力放松下垂，就像甩掉沉重的负担。
                        如此行动十次，可闭眼，聆听心跳。
                    </Text>
                    <Image
                        className='step-3-image'
                        src={require("../../asserts/step_1.png")}
                        mode='aspectFit'
                    />
                    <Button className='finish' onClick={handleChatNavigation}>
                        结束
                    </Button>
                </>
            )}
        </View>
    );
};

export default Journal;
