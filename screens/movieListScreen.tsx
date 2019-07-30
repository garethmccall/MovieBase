import React from "react";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { Container } from "../components/baseComps";
import { MovieList, Title } from "../components/listScreenComps";

import MovieApi from "../data/api";
import { IMovieInfo } from "../data/model/model";

interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface IState {
    currentPage: number;
    movies: IMovieInfo[];
    numberOfPages: number;
    loading: boolean;
}

export default class MovieListScreen extends React.Component<IProps, IState> {
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
            <Container.ScreenContainer>
                <Title />
                <MovieList
                    style={{ flex: 1 }}
                    data={this.state.movies}
                    onEndReached={this.loadMoreMovies}
                    loading={this.state.loading}
                    onItemPress={this.viewMovieDetails}
                />
            </Container.ScreenContainer>
        );
    }

    private viewMovieDetails = (movieInfo: IMovieInfo) => {
        this.props.navigation.navigate("MovieDetailsScreen", { movie: movieInfo });
    };

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
