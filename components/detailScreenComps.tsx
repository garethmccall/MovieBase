import React from "react";
import { Platform, TouchableOpacity } from "react-native";

import { TEXT_COLOR_ACCENT } from "../data/constants";

import { Typography } from "./baseComps";

export const BackButton = ({ onPress }) =>
    Platform.OS === "ios" ? (
        <TouchableOpacity onPress={onPress}>
            <Typography.Title5 style={{ color: TEXT_COLOR_ACCENT }}>{"< Back"}</Typography.Title5>
        </TouchableOpacity>
    ) : null;
