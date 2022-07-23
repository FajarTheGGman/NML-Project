import React, { Component } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import Banner from './components/Home/Banner';
import Guide from './components/Auth/Guide.js'
import Home from './components/Home/Home'

import Tarif from './components/Packet/Tarif'
import Order from './components/Packet/Order'
import Resi from './components/Packet/Resi'

import Permintaan from './components/Packet/Permintaan.js'
import SuratJalan from './components/Packet/SuratJalan.js'

export default class App extends Component{
    render(){
        const Stack = createNativeStackNavigator();
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Guide">
                    <Stack.Screen name="Login" component={Login} options={{ 
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />

                    <Stack.Screen name="Register" component={Register} options={{ 
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />


                    <Stack.Screen name="Home" component={Home} options={{ 
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />
                    <Stack.Screen name="Banner" component={Banner} options={{ 
                        headerTitle: 'Nusamulya Travel',
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />
                    <Stack.Screen name="Guide" component={Guide} options={{ 
                        headerTitle: 'Nusamulya Travel',
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />

                    <Stack.Screen name="Tarif" component={Tarif} options={{ 
                        headerTitle: "Transaksi",
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />

                    <Stack.Screen name="Order" component={Order} options={{ 
                        headerTitle: 'Riwayat Pengiriman',
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />

                    <Stack.Screen name="Resi" component={Resi} options={{ 
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />

                    <Stack.Screen name="Permintaan" component={Permintaan} options={{ 
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />
                    <Stack.Screen name="SuratJalan" component={SuratJalan} options={{ 
                        headerTitle: 'Surat Jalan',
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        }
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
