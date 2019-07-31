/**
 * MovieListScreen
 * Currently the main screen of the app. Displays a list of popular movies.
 * Could potentially also display trending movies, upcoming movies, or other lists of movies.
 */

import React from "react";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { Container } from "../components/baseComps";
import { Title } from "../components/listScreenComps";
import { MovieList } from "../components/movieList";

import { IMovieInfo } from "../data/model/model";
import MovieApi from "../data/movieApi";

interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface IState {
    currentPage: number;
    loading: boolean;
    movies: IMovieInfo[];
    numberOfPages: number;
    refreshing: boolean;
}

export default class MovieListScreen extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            currentPage: 1,
            loading: false,
            movies: [],
            numberOfPages: 1,
            refreshing: false
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
                    onRefresh={this.refresh}
                    refreshing={this.state.refreshing}
                />
            </Container.ScreenContainer>
        );
    }

    /**
     * if a movie in the list is tapped, navigate to the Details screen
     * since we're not using state management like Redux or MobX, we just
     * inject the movie info into the details screen as a navigation parameter
     *
     * @param {IMovieInfo} movieInfo - the movie to view
     */
    private viewMovieDetails = (movieInfo: IMovieInfo) => {
        this.props.navigation.navigate("MovieDetailsScreen", { movie: movieInfo });
    };

    /**
     * request a page of popular movies from the API, and put the results into state
     *
     * @param {number} pageNumber - what page of results to get
     * @param {boolean} refresh - if true, previous results are replaced with the result of this call
     */
    private loadMovies = async (pageNumber: number = 1, refresh: boolean = false) => {
        if (!this.state.loading) {
            this.setState({ loading: true, refreshing: refresh });
            try {
                const response = await MovieApi.getPopularMovies(pageNumber);
                this.setState((state) => ({
                    currentPage: response.page,
                    movies: refresh
                        ? [...response.results]
                        : [...state.movies, ...response.results],
                    numberOfPages: response.total_pages
                }));
            } catch (err) {
                console.warn("couldn't load anymore movies :(");
                this.setState((state) => ({ currentPage: state.numberOfPages }));
            } finally {
                this.setState({ loading: false, refreshing: false });
            }
        }
    };

    /**
     * when the bottom of the list is reached, if more pages of results remain,
     * issue another request to the API for the next page of results.
     */
    private loadMoreMovies = () => {
        if (!this.state.loading && this.state.currentPage < this.state.numberOfPages) {
            this.loadMovies(this.state.currentPage + 1);
        }
    };

    /**
     * pull-to-refresh. get the first page of results from the API again
     * and replace the current list of movies with them
     */
    private refresh = () => {
        this.setState({ currentPage: 1, numberOfPages: 1 });
        this.loadMovies(1, true);
    };
}
