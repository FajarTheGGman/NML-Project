import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import konfigurasi from '../../config'

export default class Permintaan extends Component{
    constructor(props){
        super(props)

        this.state = {
            order: []
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'order/pending', {
                token: token
            }).then(res => {
                this.setState({ order: this.state.order.concat(res.data.data) })
            })
        })
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <StatusBar backgroundColor='#f4511e' barStyle='light-content' />
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#E04E0C', width: 300, justifyContent: 'space-evenly' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Permintaan</Text>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Pengiriman</Text>
                    </View>

                    <View>
                        <Image source={require('../../assets/illustrations/permintaan.png')} style={{ width: 70, height: 85 }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 30, marginRight: 30, marginTop: 25 }}>
                    {this.state.order.map((x, y) => {
                        return <TouchableOpacity style={{ backgroundColor: '#f4511e', padding: 15, borderRadius: 10 , flexDirection: 'row', justifyContent: 'space-between', elevation: 15, marginTop: 25 }} onPress={() => this.props.navigation.navigate('Resi', { edit: 'yes', no_transaksi: x.no_transaksi })}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{x.no_transaksi}</Text>
                            <Text>From : {x.pengirim}</Text>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name='logo-dropbox' size={30} />
                        </View>
                    </TouchableOpacity>
                    })}
                </View>
            </View>
        )
    }
}
