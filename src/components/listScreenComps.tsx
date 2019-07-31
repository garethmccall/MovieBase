/**
 * ListScreenComps
 * A set of custom components used in the MovieListScreen layout
 */

import React from "react";
import { Linking, TouchableOpacity } from "react-native";

import { Container, Typography } from "./baseComps";

const OpenTMDB = () => Linking.openURL("https://www.themoviedb.org/");

/**
 * Title component to show at the top of the screen
 */
export const Title = () => (
    <Container.ScreenHeader>
        <Typography.Title1>Popular Movies</Typography.Title1>
        <TouchableOpacity onPress={OpenTMDB}>
            <Typography.Legal>
                Powered by <Typography.Link>The Movie Database</Typography.Link>
            </Typography.Legal>
        </TouchableOpacity>
    </Container.ScreenHeader>
);
