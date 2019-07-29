import React from "react";
import { StyleSheet, View } from "react-native";

import { MovieList, Title } from "./components/mainScreenComps";

import MovieApi from "./data/api";
import { IMovieInfo } from "./data/model/model";

interface IState {
    currentPage: number;
    movies: IMovieInfo[];
    numberOfPages: number;
    loading: boolean;
}

export default class App extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            loading: false,
            movies: [],
            numberOfPages: 1
        };
    }

    public componentWillMount() {
        this.loadMovies();
    }

    public render() {
        return (
            <View
                style={{
                    backgroundColor: "#fff",
                    flex: 1,
                    marginTop: 32
                }}
            >
                <Title />
                <MovieList
                    style={{ flex: 1, backgroundColor: "white" }}
                    data={this.state.movies}
                    onEndReached={this.loadMoreMovies}
                    loading={this.state.loading}
                />
            </View>
        );
    }

    private loadMovies = async (pageNumber: number = 1) => {
        if (!this.state.loading) {
            this.setState({ loading: true });
            try {
                const response = await MovieApi.getPopularMovies(pageNumber);
                this.setState((state) => ({
                    currentPage: response.page,
                    movies: [...state.movies, ...response.results],
                    numberOfPages: response.total_pages
                }));
            } catch (err) {
                console.warn("couldn't load anymore movies :(");
                this.setState((state) => ({ currentPage: state.numberOfPages }));
            } finally {
                this.setState({ loading: false });
            }
        }
    };

    private loadMoreMovies = () => {
        if (!this.state.loading && this.state.currentPage < this.state.numberOfPages) {
            console.log("bottom reached, loading page " + (this.state.currentPage + 1));
            this.loadMovies(this.state.currentPage + 1);
        }
    };
}
