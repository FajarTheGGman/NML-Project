import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { StackActions } from '@react-navigation/native'
import axios from 'axios';
import konfigurasi from '../../config.js'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(token => {
            if(token != null){
                this.props.navigation.dispatch(StackActions.replace('Home'))
            }
        })
    }

    login(){
        axios.post(konfigurasi.server + 'auth/login', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if(res.status == 200){
                AsyncStorage.setItem('token', res.data.token)
                this.props.navigation.dispatch(StackActions.replace('Home', { type: 'users' }))
            }
        }).catch(err => {
            alert('Username atau Password salah')
        })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Image source={require('../../assets/illustrations/signin.png')} style={{ width: 130, height: 240, marginBottom: 15 }} />
                    <View>
                    </View>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Selamat Datang, Silahkan Login</Text>
                </View>
                <View style={{ marginTop: 15, marginBottom: 25 }}>
                    <TextInput placeholder="@Username" style={{ backgroundColor: '#ededed', padding: 7, borderRadius: 10, width: 220 }} onChangeText={(val) => this.setState({ username: val })} />
                    <TextInput placeholder="#Password" style={{ backgroundColor: '#ededed', padding: 7, borderRadius: 10, marginTop: 20, width: 220 }} secureTextEntry={true} onChangeText={(val) => this.setState({ password: val })} />
                    <TouchableOpacity style={{ backgroundColor: "#E04E0C", padding: 10, marginTop: 15, borderRadius: 10 }} onPress={() => this.login()}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: "white", textAlign: 'center' }}>Login</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        )
    }
}
