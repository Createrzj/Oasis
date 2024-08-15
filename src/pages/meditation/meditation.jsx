import { useState, useEffect } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import './meditation.scss';

const Journal = () => {
    const [count, setCount] = useState(1);
    const [stage_1_start, setStage_1_start] = useState(true);
    const [stage_1_done, setStage_1_done] = useState(false);
    const [stage_2, setStage_2] = useState(flase);
    const [stage_3, setStage_3] = useState(false);

    // Handle animation iteration events
    const handleAnimationIteration = () => {
        setCount(prevCount => prevCount + 1);
    };

    // Handle animation end event
    const handleStage_1_End = () => {
        setStage_1_start(false);
        setStage_1_done(true);
    };

    const handleGoon = () => {
        setStage_2_Start(true);
        setCount(0);
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

            {setStage_1_done && (
                <>
                    <Text className='step-1-text'>
                        看着出现的黄色的花，随着花朵的变大变小，再跟着节奏深呼吸吧。看着花瓣，感受身体的四肢。你能感受到空气进入你的身体，放松你的肌肉。你的四肢有着知觉，那空气从头流到脚尖。你感到你的身体存在，在呼吸中，一点一点放下紧张的枷锁。
                    </Text>
                    <Image
                        className='step-1-image'
                        src={require("../../asserts/step_1.png")}
                        mode='aspectFit'
                    />
                    <Button className='nextstep' onClick={handleGoon}>
                        继续
                    </Button>
                </>
            )}

            {stage_2_Start && (
                <>
                    <View
                        className='petal_2'
                        onAnimationIteration={handleAnimationIteration}
                        onAnimationEnd={handleAnimationEnd}
                    />
                </>
            )}
        </View>
    );
};

export default Journal;
