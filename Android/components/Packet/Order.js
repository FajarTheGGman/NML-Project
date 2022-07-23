import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, RefreshControl, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import konfigurasi from '../../config.js'

export default class Order extends Component{
    constructor(props){
        super(props)

        this.state = {
            order: [],
            refresh: false,
            searchInput: ''
        }
    }

    componentDidMount(){
            AsyncStorage.getItem('token').then(token => {
                axios.post(konfigurasi.server + 'order/getall', {
                    token: token
                }).then(res => {
                    this.setState({ order: this.state.order.concat(res.data.data) })
                })
            })
    }

    search(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'order/search', {
                token: token,
                no_transaksi: this.state.searchInput
            }).then(res => {
                this.setState({ order: [] })
                this.setState({ order: this.state.order.concat(res.data.data) })
            })
        })
    }

    refresh(){
        this.setState({ order: []})
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'order/getall', {
                token: token
            }).then(res => {
                this.setState({ order: this.state.order.concat(res.data.data) })
            })
        })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 25, flexDirection: 'column', backgroundColor: 'white' }} refreshControl={
                <RefreshControl
                    refreshing={this.state.refresh}
                    onRefresh={() => this.refresh()}
                    />
                } >
                <View style={{ flexDirection: "row", alignSelf: 'center', alignItems: 'center', marginTop: 15 }}>
                    <TextInput placeholder={"Cari No Transaksi..."} style={{ backgroundColor: "#f4511e", padding: 10, elevation: 15, borderRadius: 10, width: 230, color: 'white' }} placeholderTextColor={'#ededed'}  onChangeText={(val) => this.setState({ searchInput: val })} />
                    <TouchableOpacity style={{ marginLeft: 10, backgroundColor: "#f4511e", padding: 10, borderRadius: 10 }} onPress={() => this.search()}>
                        <Icon name="ios-search" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#E04E0C', width: 300, justifyContent: 'space-evenly' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Riwayat</Text>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Pengiriman Paket</Text>
                    </View>

                    <View>
                        <Image source={require('../../assets/illustrations/order.png')} style={{ width: 80, height: 85 }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 30, marginRight: 30, marginTop: 25 }}>
                    {this.state.order.map((x, y) => {
                        return <TouchableOpacity style={{ backgroundColor: '#f4511e', padding: 15, borderRadius: 10 , flexDirection: 'row', justifyContent: 'space-between', elevation: 15, marginTop: 25 }} onPress={() => this.props.navigation.navigate('Resi', { edit: 'no', no_transaksi: x.no_transaksi })}>
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

            </ScrollView>
        )
    }
}
