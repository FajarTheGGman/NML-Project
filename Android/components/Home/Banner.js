import React, { Component } from 'react';
import { View, Text, StatusBar, AsyncStorage, Image, TouchableOpacity, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native'
import axios from 'axios'
import konfigurasi from '../../config'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Banner extends Component{
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
                    <Image source={require('../../assets/illustrations/people.png')} style={{ width: 260, height: 200 }} />
                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Selamat Datang</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Aplikasi Nusamulya Travel</Text>
                </View>
                <View style={{ marginTop: 15, alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#E04E0C', padding: 10, width: 300, borderRadius: 10 }} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#E04E0C', padding: 10, width: 300, borderRadius: 10, marginTop: 15 }} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
