import React, { Component } from 'react';
import { View, StatusBar, Text, TouchableOpacity, Image, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { StackActions } from '@react-navigation/native'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import konfigurasi from '../../config.js';


export default class Guide extends Component{
    componentDidMount(){
        AsyncStorage.getItem('token').then(token => {
            if(token != null){
                this.props.navigation.dispatch(StackActions.replace('Home', { type: 'users' }))
            }
        })
    }
    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center' }}>
                <StatusBar backgroundColor='#f4511e' barStyle='light-content' />
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/icons/orange.jpg')} style={{ width: 260, height: 100, borderRadius: 15 }} />
                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Selamat Datang</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Silahkan Masuk</Text>
                </View>
                <View style={{ marginTop: 15, alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#E04E0C', padding: 10, width: 300, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Banner')}>
                        <Icon name='enter-outline' size={20} color='white' />
                        <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 5, textAlign: 'center' }}>Lanjutkan Ke Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
