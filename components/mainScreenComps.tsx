import React from "react";
import { ActivityIndicator, FlatList, Linking, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { IMovieInfo } from "../data/model/model";

const OpenTMDB = () => Linking.openURL("https://www.themoviedb.org/");

export const Title = () => (
    <View style={{ marginVertical: 32, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 48 }}>Popular Movies</Text>
        <TouchableOpacity onPress={OpenTMDB}>
            <Text style={{ fontSize: 12, color: "#000A" }}>
                {`Powered by `}
                <Text style={{ textDecorationLine: "underline" }}>The Movie Database</Text>
            </Text>
        </TouchableOpacity>
    </View>
);

const ListItem = ({ item }: { item: IMovieInfo }) => {
    const releaseDate = new Date(item.release_date);
    const dateFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    const releaseDateFormatted = releaseDate.toLocaleDateString("en-CA", dateFormatOptions);
    return (
        <View
            style={{
                borderColor: "black",
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 8
            }}
        >
            <Text style={{ fontSize: 24 }} numberOfLines={1}>
                {item.title}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 4, color: "#000A" }}>
                Released: {releaseDateFormatted}
            </Text>
        </View>
    );
};

const keyExtractor = (item: IMovieInfo, index: number) => `movieRow_${index}_${item.id.toString()}`;

const ListFooter = () => (
    <View
        style={{
            alignItems: "center",
            backgroundColor: "white",
            height: 60,
            justifyContent: "center"
        }}
    >
        <Text style={{ fontSize: 32 }}>🎬✨</Text>
        <Text>That's all the movies!</Text>
    </View>
);

const LoadingFooter = () => (
    <View
        style={{
            alignItems: "center",
            backgroundColor: "white",
            height: 60,
            justifyContent: "center"
        }}
    >
        <ActivityIndicator size={"large"} color={"#0004"} />
    </View>
);

interface IPropsMovieList {
    contentContainerStyle: object;
    data: IMovieInfo[];
    onEndReached: ((info: { distanceFromEnd: number }) => void) | null;
    style: object;
    loading: boolean;
}

export const MovieList = (props: IPropsMovieList) => (
    <View style={props.style}>
        <FlatList<IMovieInfo>
            {...props}
            keyExtractor={keyExtractor}
            ListFooterComponent={props.loading ? LoadingFooter : ListFooter}
            renderItem={ListItem}
            style={{ flex: 1 }}
        />
        <LinearGradient
            colors={["#ffff", "#fff0"]}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 32 }}
        />
        <LinearGradient
            colors={["#fff0", "#ffff"]}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60 }}
        />
    </View>
);
