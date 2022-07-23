import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import axios from 'axios';
import konfigurasi from '../../config.js'

export default class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            fullname: '',
            phone: '',
            alamat: '',
            password: '',
            role: ''
        }
    }

    register(){
        axios.post(konfigurasi.server + 'auth/register', {
            username: this.state.username,
            password: this.state.password,
            fullname: this.state.fullname,
            phone: this.state.phone,
            alamat: this.state.alamat,
            role: this.state.role
        }).then(res => {
            if(res.data.message == 'Users registered'){
                alert('Success register')
                this.props.navigation.navigate('Login')
            }else{
                alert('Users sudah terdaftar')
            }
        }).catch(err => {
            alert('Users sudah terdaftar')
        })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 120 }}>
                    <Image source={require('../../assets/illustrations/signin.png')} style={{ width: 130, height: 240, marginBottom: 15 }} />
                    <View>
                    </View>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Selamat Datang, Silahkan Register</Text>
                </View>
                <View style={{ marginTop: 15, marginBottom: 25 }}>
                    <TextInput placeholder="Fullname" style={{ backgroundColor: '#ededed', padding: 7, borderRadius: 10, width: 220 }} onChangeText={(val) => this.setState({ fullname: val })} />
                    <TextInput placeholder="Username" style={{ backgroundColor: '#ededed', padding: 7, borderRadius: 10, width: 220, marginTop: 20 }} onChangeText={(val) => this.setState({ username: val })} />
                    <TextInput placeholder="Password" style={{ backgroundColor: '#ededed', padding: 7, borderRadius: 10, marginTop: 20, width: 220 }} secureTextEntry={true} onChangeText={(val) => this.setState({ password: val })} />
                    <TextInput placeholder="Alamat" style={{ backgroundColor: '#ededed', padding: 7, borderRadius: 10, width: 220, marginTop: 20 }} onChangeText={(val) => this.setState({ alamat: val })} />
                    <TextInput placeholder="Nomor HP" style={{ backgroundColor: '#ededed', padding: 7, borderRadius: 10, width: 220, marginTop: 20 }} onChangeText={(val) => this.setState({ phone: val })} keyboardType={"numeric"} />
                    <Picker selectedValue={this.state.role} style={{ backgroundColor: '#ededed', padding: 7, borderRadius: 10, width: 220, marginTop: 20 }} onValueChange={(val) => this.setState({ role: val })}>
                        <Picker.Item label="Pilih Role" value="admin" />
                        <Picker.Item label="Admin" value="admin" />
                        <Picker.Item label="Pengemudi" value="pengemudi" />
                        <Picker.Item label="Customer" value="customer" />
                    </Picker>
                    <TouchableOpacity style={{ backgroundColor: "#E04E0C", padding: 10, marginTop: 15, borderRadius: 10 }} onPress={() => this.register()}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: "white", textAlign: 'center' }}>Register</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        )
    }
}
