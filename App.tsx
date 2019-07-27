import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, ListItem } from "./components/mainScreenComps";
import MovieApi from "./data/api";
import { Movie } from "./data/model/model";

interface IState {
    movies: Movie[];
}

export default class App extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
    }

    componentWillMount() {
        MovieApi.getPopularMovies(1)
            .then((movies) => {
                this.setState({ movies });
            })
            .catch((err) => {
                console.warn(err);
                this.setState({ movies: [] });
            });
    }

    _renderItem = ({ item }: { item: Movie }) => <ListItem item={item} />;

    render() {
        return (
            <View style={styles.container}>
                <Title />
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <FlatList<Movie>
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            paddingTop: 32,
                            paddingHorizontal: 16,
                            paddingBottom: 60
                        }}
                        data={this.state.movies}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={this._renderItem}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 32,
        backgroundColor: "#fff"
    }
});
