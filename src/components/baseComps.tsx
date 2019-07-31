/**
 * BaseComps
 * Set of basic, common, pre-styled components for use everywhere
 */

import React from "react";
import { Dimensions, Image, ImageStyle, StatusBar, StyleProp, Text, View } from "react-native";

import { observer } from "mobx-react";

import {
    MARGIN_SIZE,
    MOVIE_API_POSTER_SIZE,
    MOVIE_POSTER_ASPECT_RATIO,
    SCREEN_BACKGROUND_COLOR,
    SCREEN_FOOTER_HEIGHT,
    TEXT_COLOR_ACCENT,
    TEXT_COLOR_PRIMARY
} from "../data/constants";
import { IMovieInfo } from "../data/model/model";
import MovieApi from "../data/movieApi";

const d = Dimensions.get("screen");

export class Typography {
    public static Base = (props) => (
        <Text {...props} style={[{ color: TEXT_COLOR_PRIMARY }, props.style]} />
    );

    public static Title1 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 40 }, props.style]} />
    );

    public static Title2 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 32 }, props.style]} />
    );

    public static Title3 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 24 }, props.style]} />
    );

    public static Title4 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 20 }, props.style]} />
    );

    public static Title5 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 16 }, props.style]} />
    );

    public static Body = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 12 }, props.style]} />
    );

    public static Legal = (props) => (
        <Typography.Base
            {...props}
            style={[{ fontSize: 10, color: TEXT_COLOR_ACCENT }, props.style]}
        />
    );

    public static Link = (props) => (
        <Typography.Base {...props} style={[{ textDecorationLine: "underline" }, props.style]} />
    );
}

export class Container {
    public static ScreenContainer = (props) => (
        <View
            {...props}
            style={[
                props.style,
                {
                    backgroundColor: SCREEN_BACKGROUND_COLOR,
                    flex: 1,
                    marginTop: MARGIN_SIZE * 8
                }
            ]}
        >
            <StatusBar barStyle="light-content" />
            {props.children}
        </View>
    );

    public static ScreenNavigationBar = (props) => (
        <View
            {...props}
            style={[
                {
                    flexDirection: "row",
                    height: 44,
                    alignItems: "center",
                    paddingHorizontal: MARGIN_SIZE * 4
                },
                props.style
            ]}
        />
    );

    public static ScreenHeader = (props) => (
        <View
            {...props}
            style={[
                { marginVertical: MARGIN_SIZE * 4, paddingHorizontal: MARGIN_SIZE * 4 },
                props.style
            ]}
        />
    );

    public static ListFooter = (props) => (
        <View
            {...props}
            style={[
                {
                    alignItems: "center",
                    height: SCREEN_FOOTER_HEIGHT * 2,
                    justifyContent: "center"
                },
                props.style
            ]}
        />
    );

    public static ListItem = (props) => (
        <View
            {...props}
            style={[
                {
                    borderColor: TEXT_COLOR_ACCENT,
                    borderWidth: 1
                },
                props.style
            ]}
        />
    );
}

interface IMoviePosterProps {
    size: number;
    movie: IMovieInfo;
    style: StyleProp<ImageStyle>;
}
export class Images {
    public static MoviePoster = observer((props: IMoviePosterProps) => {
        const baseUrl = MovieApi.moviePosterBaseUrl.get();
        const fullUrl = baseUrl
            ? `${baseUrl}${MOVIE_API_POSTER_SIZE}${props.movie.poster_path}`
            : "";
        return (
            <Image
                style={[
                    {
                        width: props.size * (d.width / 375),
                        height: props.size * MOVIE_POSTER_ASPECT_RATIO * (d.width / 375)
                    },
                    props.style
                ]}
                source={{ uri: fullUrl }}
            />
        );
    });
}
