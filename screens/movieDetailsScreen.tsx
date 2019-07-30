import React from "react";
import { ScrollView, View } from "react-native";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { Container, Images, Typography } from "../components/baseComps";
import { BackButton } from "../components/detailScreenComps";

import MovieApi from "../data/api";
import {
    MARGIN_SIZE,
    MOVIE_POSTER_ASPECT_RATIO,
    MOVIE_POSTER_DETAIL_SIZE
} from "../data/constants";
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
        this.moviePosterUrl = MovieApi.getMoviePosterUrl(this.movie);
    }

    public render() {
        return (
            <Container.ScreenContainer>
                <Container.ScreenNavigationBar>
                    <BackButton onPress={this.onBack} />
                </Container.ScreenNavigationBar>
                <Container.ScreenHeader>
                    <Typography.Title1>{this.movie.title}</Typography.Title1>
                    <Typography.Title5>Released {this.movie.release_date}</Typography.Title5>
                </Container.ScreenHeader>
                {/* use the ScrollView here as we're not displaying a lot of items. we just want to accomodate small phones in case the text overflows */}
                <ScrollView alwaysBounceVertical={false} indicatorStyle={"white"}>
                    <View style={{ padding: MARGIN_SIZE * 4, flexDirection: "row" }}>
                        <Typography.Body style={{ flex: 1 }}>{this.movie.overview}</Typography.Body>
                        {this.moviePosterUrl && (
                            <Images.MoviePoster
                                size={MOVIE_POSTER_DETAIL_SIZE}
                                source={{ uri: this.moviePosterUrl }}
                                style={{
                                    marginLeft: MARGIN_SIZE * 2
                                }}
                            />
                        )}
                    </View>
                </ScrollView>
            </Container.ScreenContainer>
        );
    }

    private onBack = () => {
        this.props.navigation.goBack();
    };
}
