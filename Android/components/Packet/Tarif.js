import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, ScrollView, Image } from 'react-native';
import { TextInput, Button } from '@react-native-material/core';
import SelectDropdown from 'react-native-select-dropdown';
import Radio from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import konfigurasi from '../../config'

export default class Tarif extends Component{
    constructor(props){
        super(props)

        this.state = {
            no_transaksi : '',
            pengirim : '',
            penerima : '',
            no_telepon_pengirim : '',
            no_telepon_penerima : '',
            alamat_pengirim : '',
            alamat_penerima : '',
            kota_pengirim: '',
            kota_penerima: '',
            jumlah_barang: '',
            mobil_pengirim: '',
            total_harga : 25000,
            ukuran_paket : ''
        }
    }

    componentDidMount(){
        this.setState({
            no_transaksi: 'NML/' + Math.floor(Math.random() * 100) + '/' + new Date().getFullYear()
        })
    }

    simpan(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'order/add', {
                token: token,
                no_transaksi : this.state.no_transaksi,
                pengirim : this.state.pengirim,
                penerima : this.state.penerima,
                no_telepon_pengirim : this.state.no_telepon_pengirim,
                no_telepon_penerima : this.state.no_telepon_penerima,
                alamat_pengirim : this.state.alamat_pengirim,
                alamat_penerima : this.state.alamat_penerima,
                kota_pengirim: this.state.kota_pengirim,
                kota_penerima: this.state.kota_penerima,
                jumlah_barang: this.state.jumlah_barang,
                total_harga : this.state.total_harga,
                ukuran_paket : this.state.ukuran_paket,
                travel: this.state.mobil_pengirim == 'travel' ? 'travel' : 'No',
                kargo: this.state.mobil_pengirim == 'kargo' ? 'kargo' : 'No'
            }).then(res => {
                if(res.data.message == 'Success'){
                    alert('Transaksi Success')
                    this.props.navigation.navigate('Order', { type: 'users' })
                }
            }).catch(err => {
                alert('Transaksi Failed')
            })
        })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 25, flexDirection: 'column', backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#E04E0C', width: 300, justifyContent: 'space-evenly' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Transaksi</Text>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Pengiriman Paket</Text>
                    </View>

                    <View>
                        <Image source={require('../../assets/illustrations/transaksi.png')} style={{ width: 90, height: 70 }} />
                    </View>
                </View>

                <View style={{ padding: 25, backgroundColor: 'white', padding: 15, elevation: 15, marginLeft: 20, marginRight: 20, marginTop: 25, borderRadius: 15 }}>
                    <Text style={{ fontWeight: 'bold', backgroundColor: '#E04E0C', alignItem: 'center', color: 'white', fontSize: 16, padding: 8, borderRadius: 10, alignSelf: 'center' }} >Form Pengirim</Text>
                    <TextInput label="No Transaksi" variant="standard" style={{ marginTop: 15 }} onChangeText={(val) => this.setState({ no_transaksi: val })} value={this.state.no_transaksi} />
                    <TextInput label="Pengirim" variant="standard" style={{ marginTop: 15 }} onChangeText={(val) => this.setState({ pengirim: val })} value={this.state.pengirim} />
                    <TextInput label="No Telepon Pengirim" variant="standard" style={{ marginTop: 15 }} onChangeText={(val) => this.setState({ no_telepon_pengirim: val })} value={this.state.no_telepon_pengirim} keyboardType="numeric" />
                    <TextInput label="Alamat Pengirim" multiline={true} variant="standard" style={{ marginTop: 15 }} onChangeText={(val) => this.setState({ alamat_pengirim: val })} value={this.state.alamat_pengirim} />
                    <TextInput label="Kota Pengirim" multiline={true} variant="standard" style={{ marginTop: 15 }} onChangeText={(val) => this.setState({ kota_pengirim: val })} value={this.state.kota_pengirim} />
                    <Text style={{ marginTop: 15, fontSize: 17 }}>Mobil Pengirim</Text>
                    <Radio radio_props={[{ label: 'Travel', value: 'travel' }, { label: 'Kargo', value: 'kargo' }]} onPress={(val) => this.setState({ mobil_pengirim: val })} formHorizontal={true} style={{ marginTop: 10 }} />
                </View>

                <View style={{ padding: 25, backgroundColor: 'white', padding: 15, elevation: 15, marginLeft: 20, marginRight: 20, marginTop: 25, borderRadius: 15 }}>
                    <Text style={{ fontWeight: 'bold', backgroundColor: '#E04E0C', alignItem: 'center', color: 'white', fontSize: 16, padding: 8, borderRadius: 10, alignSelf: 'center' }} >Form Penerima</Text>
                    <TextInput label="Penerima" variant="standard" style={{ marginTop: 15 }} onChangeText={(val) => this.setState({ penerima: val })} value={this.state.penerima} />
                    <TextInput label="No Telepon Penerima" variant="standard" style={{ marginTop: 15 }} onChangeText={(val) => this.setState({ no_telepon_penerima: val })} value={this.state.no_telepon_penerima} keyboardType="numeric" />
                    <TextInput label="Alamat Penerima" multiline={true} variant="standard" style={{ marginTop: 15 }} onChangeText={(val) => this.setState({ alamat_penerima: val })} value={this.state.alamat_penerima} />
                    <TextInput label="Kota Penerima" multiline={true} variant="standard" style={{ marginTop: 15 }} onChangeText={(val) => this.setState({ kota_penerima: val })} value={this.state.kota_penerima} />
                    <TextInput label="Jumlah Barang" multiline={true} variant="standard" style={{ marginTop: 15 }} keyboardType="numeric" onChangeText={(val) => this.setState({ 
                        jumlah_barang: val,
                        total_harga: this.state.ukuran_paket == 'Kecil' ? this.state.total_harga * val : this.state.total_harga
                    })} value={this.state.jumlah_barang} />
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginBottom: 10, alignItems: 'center' }}>Total Harga : Rp.{this.state.total_harga}</Text>
                    <View style={{ marginTop: 15, alignItems: 'center' }}>
                        <SelectDropdown 
                            data={['Kecil', 'Sedang', 'Besar']} 
                            style={{ marginTop: 15 }} 
                            onSelect={(item, index) => {
                                this.setState({ ukuran_paket: item })
                                if(item == 'Kecil'){
                                    this.setState({ total_harga: 25000 })
                                    this.setState({ ukuran_paket: item })
                                }else if(item == 'Sedang'){
                                    this.setState({ total_harga: 50000 })
                                    this.setState({ ukuran_paket: item })
                                }else if(item == 'Besar'){
                                    this.setState({ total_harga: 100000 })
                                    this.setState({ ukuran_paket: item })
                                }
                            }} 
                            dropdownIconPosition={"right"}
                            defaultButtonText={'Ukuran Paket'}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Button title="Simpan" color="#E04E0C" style={{ marginTop: 25, color: 'white', width: '50%' }} onPress={() => this.simpan()} />
                </View>
            </ScrollView>
        )
    }
}
