/**
 * App
 * Here we define the stack navigation for the app
 */

import { createAppContainer, createStackNavigator } from "react-navigation";

import { SCREEN_BACKGROUND_COLOR } from "./src/data/constants";
import MovieDetailsScreen from "./src/screens/movieDetailsScreen";
import MovieListScreen from "./src/screens/movieListScreen";

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
