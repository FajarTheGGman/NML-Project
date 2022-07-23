import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import konfigurasi from '../../config.js'
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';

export default class Resi extends Component{
    constructor(props){
        super(props)

        this.state = {
            order: [],
            role: '',
            status_pengiriman: ''
        }
    }

    componentDidMount(){
        MediaLibrary.requestPermissionsAsync();
            axios.post(konfigurasi.server + 'order/get', {
                type: 'customer',
                no_transaksi: this.props.route.params.no_transaksi
            }).then(res => {
                if(res.data.data){
                    this.setState({ order: this.state.order.concat(res.data.data) })
                }
            })
        
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'auth/getall', {
                token: token
            }).then(res => {
                if(res.status == 200){
                    this.setState({ role: res.data.role })
                }
            })
        })
    }

    refresh(){
        if(this.props.route.params.type != 'customer'){
            this.setState({ order: [] })
            AsyncStorage.getItem('token').then(token => {
                axios.post(konfigurasi.server + 'order/get', {
                    token: token,
                    no_transaksi: this.props.route.params.no_transaksi
                }).then(res => {
                    if(res.data.data){
                        this.setState({ order: this.state.order.concat(res.data.data) })
                    }
                })

                axios.post(konfigurasi.server + 'auth/getall', {
                    token: token
                }).then(res => {
                    this.setState({ role: res.data.role })
                })
            })
        }else{
            this.setState({ order: [] })
            axios.post(konfigurasi.server + 'order/get', {
                type: 'customer',
                no_transaksi: this.props.route.params.no_transaksi
            }).then(res => {
                if(res.data.data){
                    this.setState({ order: this.state.order.concat(res.data.data) })
                }
            })
        }
    }

    save(){
        this.refs.viewShot.capture().then(uri => {
            MediaLibrary.saveToLibraryAsync(uri).then(() => {
                alert('Berhasil disimpan')
            })
        }).catch(err => {
            console.log(err)
        }).done()
    }

    update(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'order/update', {
                token: token,
                no_transaksi: this.props.route.params.no_transaksi,
                status_pengiriman: this.state.status_pengiriman
            }).then(res => {
                if(res.data.message == 'Success'){
                    this.refresh()
                    alert('Status Berhasil diupdate')
                }
            })
        })
    }

    paket(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'order/paket', {
                token: token,
                no_transaksi: this.props.route.params.no_transaksi,
            }).then(res => {
                if(res.data.message == 'Success'){
                    if(this.state.role == 'admin'){
                        alert('Packet Di Lanjutkan Ke Pengemudi')
                        this.props.navigation.navigate('Permintaan')
                    }else{
                        alert('Packet Di Terima Oleh Pengemudi')
                        this.props.navigation.navigate('Permintaan')
                    }
                }
            })
        })
    }

    pengemudi(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'order/pengemudi', {
                token: token,
                no_transaksi: this.props.route.params.no_transaksi,
            }).then(res => {
                if(res.data.message == 'Success'){
                    alert('Packet Di Lanjutkan Ke Pengemudi')
                }
            })
        })
    }

    delete(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'order/delete', {
                token: token,
                no_transaksi: this.props.route.params.no_transaksi
            }).then(res => {
                if(res.data.message == 'Success'){
                    alert('Berhasil dihapus')
                    this.props.navigation.navigate('Order', { type: 'users' })
                }
            })
        })
    }

    render(){
        return(
            <ScrollView style={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    {this.state.order.map((x, y) => {
                    return <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                    <View style={{ flexDirection: 'column', marginTop: 15 }}>
                        <Image source={require('../../assets/icons/white.jpg')} style={{ width: 180, height: 75, alignSelf: 'center' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: 20, marginRight: 20, borderWidth: 2, borderColor: 'black', padding: 10, marginTop: 15 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Pengirim</Text>
                                <Text>Nama : {x.pengirim}</Text>
                                <Text>Alamat : {x.alamat_pengirim}</Text>
                                <Text>Kota : {x.kota_pengirim}</Text>
                                {x.no_telepon_pengirim.length > 10 ? <View style={{ marginLeft: -4 }}>
                                    <Text> No.Telp: </Text>
                                    <Text> {x.no_telepon_pengirim} </Text>
                                </View> : <Text>No.Telp : {x.no_telepon_pengirim}</Text>}
                            </View>
    
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Penerima</Text>
                                <Text>Nama : {x.penerima}</Text>
                                <Text>Alamat : {x.alamat_penerima}</Text>
                                <Text>Kota : {x.kota_penerima}</Text>
                                {x.no_telepon_penerima.length > 10 ? <View style={{ marginLeft: -4 }}>
                                    <Text> No.Telp: </Text>
                                    <Text> {x.no_telepon_penerima} </Text>
                                </View> : <Text>No.Telp : {x.no_telepon_penerima}</Text>}
                            </View>
                        </View>
    
                        <View style={{ marginLeft: 17, marginTop: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>Total Biaya Pengiriman : Rp.{x.total_harga}</Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, borderWidth: 2, borderColor: 'black', marginLeft: 20, marginRight: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Jumlah Barang : {x.jumlah_barang}</Text>
                            </View>
    
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Berat/Ukuran : {x.ukuran_paket}</Text>
                            </View>
                        </View>

                        <Text style={{ fontWeight: 'bold', marginTop: 15, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>Status Pengiriman</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, borderWidth: 2, borderColor: 'black', marginLeft: 20, marginRight: 20, padding: 5 }}>
                            <Icon name='location' size={20}  />
                            <Text style={{ fontWeight: 'bold' }}>{x.status_pengiriman}</Text>
                        </View>
    
                        {this.state.role == 'admin' && (
                            <TouchableOpacity style={{ backgroundColor: '#f4511e', padding: 10, borderRadius: 5, alignSelf: "center", flexDirection: 'row', justifyContent: 'center', marginTop: 15 }} onPress={() => this.delete()}>
                                <Icon name='trash' size={20}  />
                                <Text style={{ fontWeight: 'bold', marginLeft: 5, fontSize: 16 }}>Hapus Resi</Text>
                            </TouchableOpacity>
                        )}
                        {this.state.role == 'pengemudi' ? 
                            <View>
                            {this.props.route.params.edit == 'yes' ? 
                                <View>
                                </View>
                            :
                                <View style={{ flexDirection: 'column', marginTop: 25, alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput placeholder="Status Pengiriman" multiline={true} style={{ backgroundColor: '#ededed', padding: 7, borderRadius: 10, width: 220, elevation: 15 }} onChangeText={(val) => this.setState({ status_pengiriman: val })} />
    
                                    <TouchableOpacity style={{ backgroundColor: "#E04E0C", marginTop: 15, borderRadius: 10, padding: 10, width: '50%', elevation: 15 }} onPress={() => this.update()}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: "white", textAlign: 'center' }}>Update Status</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            </View>
                            :
                            <View>
                            </View>
                        }
                        
                        
                        {this.state.role == 'admin' ?
                            <View style={{ flexDirection: 'column', marginTop: 25, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#E04E0C", marginTop: 15, borderRadius: 10, padding: 10, width: '70%', elevation: 15 }} onPress={() => this.pengemudi()}>
                                    <Icon name='navigate' size={20} color="white" />
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 17, color: "white", textAlign: 'center' }}>Lanjutkan Ke Pengemudi</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                {this.props.route.params.edit == 'yes' ?
                                    <View style={{ flexDirection: 'column', marginTop: 25, alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: "#E04E0C", marginTop: 15, borderRadius: 10, padding: 10, width: '70%', elevation: 15 }} onPress={() => this.paket()}>
                                            <Icon name='navigate' size={20} color="white" />
                                            <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 17, color: "white", textAlign: 'center' }}>Konfirmasi Paket</Text>
                                        </TouchableOpacity>
                                    </View>
                                :
                                <View>
                                </View>
                                }
                            </View>
                        }
                    </View>
                    </ViewShot>
                    })}
            </ScrollView>
        )
    }
}
