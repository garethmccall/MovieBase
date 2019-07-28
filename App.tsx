import React from "react";
import { StyleSheet, View } from "react-native";

import { MovieList, Title } from "./components/mainScreenComps";

import MovieApi from "./data/api";
import { IMovieInfo } from "./data/model/model";

interface IState {
    currentPage: number;
    loading: boolean;
    movies: IMovieInfo[];
}

export default class App extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            loading: false,
            movies: []
        };
    }

    componentWillMount() {
        this.loadMovies();
    }

    loadMovies = async (pageNumber: number = 1) => {
        try {
            this.setState({ loading: true });
            const moreMovies = await MovieApi.getPopularMovies(pageNumber);
            this.setState((state) => ({
                currentPage: pageNumber,
                movies: [...state.movies, ...moreMovies]
            }));
        } catch (err) {
            console.warn("couldn't load anymore movies");
        } finally {
            this.setState({ loading: false });
        }
    };

    loadMoreMovies = () => {
        this.loadMovies(this.state.currentPage + 1);
    };

    render() {
        return (
            <View style={styles.container}>
                <Title />
                <MovieList
                    style={{ flex: 1, backgroundColor: "white" }}
                    contentContainerStyle={styles.movieListContent}
                    data={this.state.movies}
                    onEndReached={this.loadMoreMovies}
                    loading={this.state.loading}
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
