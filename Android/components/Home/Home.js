import React, { Component } from 'react';
import { View, StatusBar, Text, AsyncStorage, Image, TouchableOpacity, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native'
import axios from 'axios'
import konfigurasi from '../../config'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            fullname: 'Customer',
            phone: '',
            role: ''
        }
    }

    componentDidMount(){
        if(this.props.route.params.type != 'customer' || this.props.route.params.type == undefined){
            AsyncStorage.getItem('token').then(token => {
                if(token == null){
                    this.props.navigation.dispatch(StackActions.replace('Login'))
                }

                axios.post(konfigurasi.server + 'auth/getall', { token: token }).then((res) => {
                    if(res.status == 200){
                        this.setState({
                            fullname: res.data.fullname,
                            phone: res.data.phone,
                            role: res.data.role
                        })
                    }
                })
            })
        }
    }

    logout(){
        AsyncStorage.removeItem('token').then(() => {
            this.props.navigation.dispatch(StackActions.replace('Banner', { type: 'customer' }))
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar backgroundColor='#f4511e' barStyle='light-content' />
                <View style={{ flexDirection: 'column', alignSelf: 'center', marginTop: 15, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#E04E0C', width: 300 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
                        <Image source={require('../../assets/logo.png')} style={{ width: 180, height: 85 }} />
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 10 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>NUSA MULYA LOGISTIK</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginTop: this.state.role == 'admin' ? 45 : 50 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginRight: this.state.role == 'pengemudi' ? 35 : 0 }}
                    >
                        {this.state.role == 'admin' || this.state.role == 'customer' ?
                           <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: "#E04E0C", borderRadius: 10, elevation: 15, padding: 10 }} onPress={() => this.props.navigation.navigate('Tarif')}>
                                    <Icon name="cash-outline" size={30} color="white" />
                                </TouchableOpacity>
                                <View style={{ marginTop: 5, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Kirim </Text>
                                    <Text style={{ fontWeight: 'bold' }}>Barang</Text>
                                </View>
                            </View>
                            :
                            <View>
                            </View>
                        }
                        
                        {this.state.role == 'pengemudi' ?
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: "#E04E0C", borderRadius: 10, elevation: 15, padding: 10 }} onPress={() => this.props.navigation.navigate('Permintaan')}>
                                    <Icon name="notifications-outline" size={30} color="white" />
                                </TouchableOpacity>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Permintaan</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Pengiriman</Text>
                                </View>
                            </View>
                            :
                            <>
                            </>
                        }

                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: "#E04E0C", borderRadius: 10, elevation: 15, padding: 10 }} onPress={() => this.props.navigation.navigate('Order', { type: this.state.fullname == 'Customer' ? 'customer' : 'users' })}>
                                <Icon name="file-tray-full-outline" size={30} color="white" />
                            </TouchableOpacity>
                            <View style={{ marginTop: 5, alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Riwayat</Text>
                                <Text style={{ fontWeight: 'bold' }}>Pengiriman</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: "#E04E0C", borderRadius: 10, elevation: 15, padding: 10 }} onPress={() => this.logout()}>
                                <Icon name="log-out-outline" size={30} color="white" />
                            </TouchableOpacity>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>Logout</Text>
                            </View>
                        </View>
                    </View>

                    {this.state.role == 'admin' || this.state.role == 'pengemudi' ? 
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 25 }}>
                            {this.state.role == 'admin' ? 
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: "#E04E0C", borderRadius: 10, elevation: 15, padding: 10 }} onPress={() => this.props.navigation.navigate('Permintaan')}>
                                    <Icon name="notifications-outline" size={30} color="white" />
                                </TouchableOpacity>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Permintaan</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Pengiriman</Text>
                                </View>
                            </View>
                            :
                            <>
                            </>
                            }
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: "#E04E0C", borderRadius: 10, elevation: 15, padding: 10 }} onPress={() => this.props.navigation.navigate('SuratJalan')}>
                                    <Icon name="bicycle-outline" size={30} color="white" />
                                </TouchableOpacity>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Surat Jalan</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View>
                        </View>
                    }
                    
                </View>

                <View style={{ marginTop: this.state.role == 'admin' ? 20 : 30 , backgroundColor: "#f4511e", elevation: 15, padding: 15, marginLeft: 15, marginRight: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View>
                        <Image source={require('../../assets/illustrations/kurir.png')} style={{ width: 80, height: 125 }} />
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 18 }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 19,  }}>Selamat Datang</Text>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17, marginTop: 5  }}>{this.state.fullname}</Text>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17,  }}>{this.state.phone}</Text>
                    </View>
                </View>

            </View>
        )
    }
}
