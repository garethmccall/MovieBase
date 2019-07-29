/**
 * MovieDetailsScreen
 * Displays a single movie's title, release date, description and poster image.
 */

import React from "react";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { Container } from "../components/baseComps";
import { BackButton, MovieDetails, Title } from "../components/detailScreenComps";

import { IMovieInfo } from "../data/model/model";

interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export default class MovieDetailsScreen extends React.Component<IProps, {}> {
    protected movie: IMovieInfo;
    protected moviePosterUrl?: string;

    constructor(props) {
        super(props);
        this.movie = props.navigation.state.params.movie;
    }

    public render() {
        return (
            <Container.ScreenContainer>
                <Container.ScreenNavigationBar>
                    <BackButton onPress={this.onBack} />
                </Container.ScreenNavigationBar>
                <Title movie={this.movie} />
                <MovieDetails movie={this.movie} />
            </Container.ScreenContainer>
        );
    }

    /**
     * callback for Back button tap. pop to the last screen in the navigation stack
     */
    private onBack = () => {
        this.props.navigation.goBack();
    };
}
