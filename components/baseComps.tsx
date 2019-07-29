import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MARGIN_SIZE, SCREEN_FOOTER_HEIGHT } from "../data/constants";

export class Typography {
    public static Base = (props) => <Text {...props} style={props.style} />;

    public static Title1 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 48 }, props.style]} />
    );

    public static Title2 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 36 }, props.style]} />
    );

    public static Title3 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 28 }, props.style]} />
    );

    public static Title4 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 24 }, props.style]} />
    );

    public static Title5 = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 20 }, props.style]} />
    );

    public static Body = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 14 }, props.style]} />
    );

    public static Legal = (props) => (
        <Typography.Base {...props} style={[{ fontSize: 12 }, props.style]} />
    );

    public static Link = (props) => (
        <Typography.Base {...props} style={[{ textDecorationLine: "underline" }, props.style]} />
    );
}

export class Container {
    public static ScreenHeader = (props) => (
        <View
            {...props}
            style={[
                { marginVertical: MARGIN_SIZE * 8, paddingHorizontal: MARGIN_SIZE * 4 },
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
                    backgroundColor: "white",
                    height: 60,
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
                    borderColor: "black",
                    borderWidth: 1,
                    paddingHorizontal: MARGIN_SIZE * 4,
                    paddingVertical: MARGIN_SIZE * 2
                },
                props.style
            ]}
        />
    );
}
