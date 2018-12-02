import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ContactsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            MessageList:[{
                Name:"名字",
                Text:"内容",
                Id:"1"
            }]
        }
        this.renderItem=this.renderItem.bind(this);
    }
    static navigationOptions = {
        title: '联系人',
    };
    render(){
        return (
            <View>
                <FlatList keyExtractor={(item, index)=>item.Id} data={this.state.MessageList} renderItem={item=>this.renderItem(item)}>
                </FlatList>
            </View>
        )
    }

    renderItem(item){
        console.log(item);
        return (
            <MonoText>{item.item.Name}:{item.item.Text}</MonoText>
        )
    }


}