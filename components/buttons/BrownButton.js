import React,{useState} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import Color from '../../constants/colors'

function BrownButton(props)
{
    const buttonStyle = props.data.selected ? {color:Color.white,backgroundColor:Color.darkBrown} : {color:Color.brown,backgroundColor:Color.background}

    return(
        <TouchableOpacity onPress={()=>{props.onSelect(props.data)}}>
            <View style = {{
                backgroundColor:buttonStyle.backgroundColor,
                borderWidth:1, borderColor:Color.brown,
                justifyContent:'center',
                paddingHorizontal:3,
            }}
            >
                <Text style = {{color:buttonStyle.color}}>{props.data.name}</Text>
            </View>
        </TouchableOpacity >
    )
}


export default BrownButton;