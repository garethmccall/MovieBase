import React from "react";
import { Platform, TouchableOpacity } from "react-native";

import { TEXT_COLOR_ACCENT } from "../data/constants";
import { IMovieInfo } from "../data/model/model";
import DateUtils from "../utils/dateUtils";

import { Typography } from "./baseComps";

export const MovieReleaseDate = ({ movie }: { movie: IMovieInfo }) => {
    return (
        <Typography.Title5 style={{ color: TEXT_COLOR_ACCENT }}>
            Released {DateUtils.getFormattedReleaseDate(movie)}
        </Typography.Title5>
    );
};

export const BackButton = ({ onPress }) =>
    Platform.OS === "ios" ? (
        <TouchableOpacity onPress={onPress}>
            <Typography.Title5 style={{ color: TEXT_COLOR_ACCENT }}>{"< Back"}</Typography.Title5>
        </TouchableOpacity>
    ) : null;
