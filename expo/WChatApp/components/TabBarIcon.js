// import React from 'react';
// import { Icon } from 'expo';

// import Colors from '../constants/Colors';

// export default class TabBarIcon extends React.Component {
//   render() {
//     return (
//       <Icon.Ionicons
//         name={this.props.name}
//         size={26}
//         style={{ marginBottom: -3 }}
//         color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
//       />
//     );
//   }
// }

import React from 'react';
import { Platform,View,Image,StyleSheet } from 'react-native';

export default class TabBarIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            img:props.img,
            focusimg:props.focusimg
        }
    }

    render(){
        return (
            <View style={styles.contais}>
                <Image style={styles.icon} resizeMode="contain" source={this.props.focused?this.state.focusimg:this.state.img}></Image>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    contais:{
        height:30
    },
    icon:{
        width:30,
        height:30
    }
})