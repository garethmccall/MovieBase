import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking } from 'react-native';
import {Movie} from "../data/model/model"

export const Title = () => (
    <View style={{marginVertical:32, paddingHorizontal:16}}>
      <Text style={{fontSize:48}}>Popular Movies</Text>
      <TouchableOpacity onPress={()=>Linking.openURL("https://www.themoviedb.org/")}>
        <Text style={{fontSize:12, color:"#000A"}}>
          Powered by <Text style={{textDecorationLine:"underline"}}>The Movie Database</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
  
export const ListItem = ({item}: {item:Movie}) => {
    const releaseDate = new Date(item.release_date);
      const dateFormatOptions = {
              day: "numeric",
        month: "long",
        year: "numeric"
      };
      const releaseDateFormatted = releaseDate.toLocaleDateString("en-CA", dateFormatOptions);    
      return (
        <View style={{borderWidth:1, borderColor: "black", paddingHorizontal: 16, paddingVertical:8}}>
          <Text style={{fontSize:24 }} numberOfLines={1}>{item.title}</Text>
          <Text style={{fontSize:14, marginTop: 4, color:"#000A"}}>Released: {releaseDateFormatted}</Text>
        </View>
      )
  }