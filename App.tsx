/**
 * App
 * Here we define the stack navigation for the app
 */

import { createAppContainer, createStackNavigator } from "react-navigation";

import { SCREEN_BACKGROUND_COLOR } from "./data/constants";
import MovieDetailsScreen from "./screens/movieDetailsScreen";
import MovieListScreen from "./screens/movieListScreen";

const AppNavigator = createStackNavigator(
    {
        MovieListScreen: { screen: MovieListScreen },
        MovieDetailsScreen: { screen: MovieDetailsScreen }
    },
    {
        headerMode: "none",
        cardStyle: {
            backgroundColor: SCREEN_BACKGROUND_COLOR
        }
    }
);

export default createAppContainer(AppNavigator);
