import React from "react";
import { StyleSheet, View } from "react-native";

import { ListItem, MovieList, Title } from "./components/mainScreenComps";

import MovieApi from "./data/api";
import { IMovieInfo } from "./data/model/model";

interface IState {
    movies: IMovieInfo[];
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

    keyExtractor = (item: IMovieInfo, index: number) => item.id.toString();

    renderItem = ({ item }: { item: IMovieInfo }) => <ListItem item={item} />;

    render() {
        return (
            <View style={styles.container}>
                <Title />
                <MovieList
                    style={{ flex: 1, backgroundColor: "white" }}
                    contentContainerStyle={styles.movieListContent}
                    data={this.state.movies}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        marginTop: 32
    },
    movieListContent: {
        paddingBottom: 60,
        paddingHorizontal: 16,
        paddingTop: 32
    }
});
