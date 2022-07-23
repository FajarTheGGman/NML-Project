import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView, StatusBar, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import PremiumTable, { Item } from "react-native-premium-table";
import konfigurasi from '../../config.js'
import axios from 'axios'

export default class SuratJalan extends Component{
    constructor(props){
        super(props)

        this.state = {
            order: [],
            header: ['No\nTransaksi', 'Nama\nPenerima', 'Tlp', 'Alamat\nPenerima', 'Jumlah\nBarang'],
            data: [
            ],
            width: [120, 140, 150, 100, 100]
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'order/getall', {
                token: token
            }).then(res => {
                if(res.status == 200){
                    this.setState({
                        order: this.state.order.concat(res.data.data)
                    })
                }
            })
        })
    }

    render(){
        const item = ({ item }) => (
                <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 10, backgroundColor: 'white', borderRadius: 10 }}>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{item.no_transaksi}</Text>
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.penerima}</Text>
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.no_telepon_penerima}</Text>
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.alamat_penerima}</Text>
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.jumlah_barang}</Text>
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.travel}</Text>
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.kargo}</Text>
                    </View>
                </View>
           )
        return(
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <StatusBar backgroundColor='#f4511e' barStyle='light-content' />
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#E04E0C', width: 300, justifyContent: 'space-evenly' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Surat</Text>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Jalan</Text>
                    </View>

                    <View>
                        <Image source={require('../../assets/illustrations/suratjalan.png')} style={{ width: 80, height: 70 }} />
                    </View>
                </View>

                <Text style={{ marginTop: 40, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Rekap Surat Jalan</Text>
                <ScrollView horizontal={true}>
                    <View style={{ flexDirection: 'column', marginTop: 10, backgroundColor: "#f4511e", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'grey', padding: 5, borderRadius: 10, alignItems: 'center' }}>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>No Transaksi</Text>
                        </View>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Nama Penerima</Text>
                        </View>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Telepon Penerima</Text>
                        </View>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Alamat Penerima</Text>
                        </View>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Jumlah Barang</Text>
                        </View>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Travel</Text>
                        </View>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Kargo</Text>
                        </View>
                    </View>
                        <FlatList data={this.state.order} renderItem={item}  />
                </View>
                </ScrollView>
            </View>
        )
    }
}
