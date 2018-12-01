import React from 'react';
import { Platform,View,Image } from 'react-native';

export default class TabBarIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View>
                <Image source={this.props.focused?require('../assets/img/tabBarIcon/chat_fcous.png'):require('../assets/img/tabBarIcon/chat.png')}></Image>
            </View>
        )
    }

}