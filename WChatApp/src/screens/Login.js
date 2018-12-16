import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
    Dimensions,
    DeviceEventEmitter,
    TextInput
} from 'react-native';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: "",
            PassWord: ""
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>手机号/用户名/邮箱登录</Text>
                <View style={styles.line}>
                    <Text style={styles.lineTitle}>账号</Text>
                    <TextInput style={styles.lineInput} autoCorrect={false} placeholder="手机号/用户名/邮箱" value={this.state.UserName} onChangeText={Text => this.setState({ UserName: Text })}></TextInput>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineTitle}>密码</Text>
                    <TextInput style={styles.lineInput} autoCorrect={false} secureTextEntry={true} placeholder="请填写密码" value={this.state.PassWord} onChangeText={Text => this.setState({ PassWord: Text })}></TextInput>
                </View>
                <View style={{ marginTop: 100 }}>
                    {
                        (this.state.UserName == "" || this.state.PassWord == "") ?
                            <View style={{ height: 50, backgroundColor: "#A3DEA4", alignItems: "center", justifyContent: "center", marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: "#D5D5D5", borderRadius: 5 }}>
                                <Text style={{ fontSize: 20, color: "#fff" }}>登录</Text>
                            </View>
                            :
                            <TouchableOpacity>
                                <View style={{ height: 50, backgroundColor: "#18AC18", alignItems: "center", justifyContent: "center", marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: "#D5D5D5", borderRadius: 5 }}>
                                    <Text style={{ fontSize: 20, color: "#fff" }}>登录</Text>
                                </View>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 30,
        color: "#000",
        marginLeft: 20,
        marginTop: 100,
        marginBottom: 30
    },
    line: {
        borderBottomColor: "#D5D5D5",
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    lineTitle: {
        fontSize: 20,
        lineHeight: 35,
        color: "#000",
    },
    lineInput: {
        lineHeight: 35,
        height: 50,
        fontSize: 20,
        flex: 1,
        marginLeft: 10
    },
    a: {
        alignItems: "center"
    }
})