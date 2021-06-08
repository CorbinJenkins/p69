import * as React from 'react'
import {Text,View,TouchableOpacity,StyleSheet,Image} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
import { askAsync } from 'expo-permissions';

export default class Transactions extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal"
        }
    }
    getCameraPermission=async()=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:"clicked"
        })
    }
    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:"normal"
        })
        
    }
    render(){
        const hasCameraPermission=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==="clicked" && hasCameraPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}/>
            );
        }
        else if(buttonState==="normal"){
        
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:15,textDecorationLine:"underline"}}>
                    {hasCameraPermission===true?this.state.scannedData:"requestCameraPermissions"}
                </Text>

            
                <TouchableOpacity style={styles.QRButton} onPress={this.getCameraPermission}>
                    <Text style={{fontSize:20}}>
                        Scan The QR Code
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
} 
const styles=StyleSheet.create({
    QRButton:{
        backgroundColor:"pink",
        padding:10,
        borderRadius:20,
        margin:10,

    }
})
