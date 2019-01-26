import { GroupState } from "./GroupState.model";

export interface User {
    bridgeIpAddress: String;
    username: String;
    accessToken: String;
    refreshToken: String;
    groupStates: GroupState[];
}

// export const initialState: User = {
//     bridgeIpAddress: "",
//     username: "",
//     groupStates: [
//         new GroupState("1", "O3MwvjfktgOHlRF"),
//         new GroupState("2", "X9MZ5qWaoQd8ZrX"),
//         new GroupState("3", "uVYKNKrZfxUQHHt")
//     ],
//     accessToken: "",
//     refreshToken: ""
// };

export const initialState: User = {
    bridgeIpAddress: "192.168.1.236",
    username: "dOBMZLQEqwc08ab2saX8UT60qBv6vRPHTWi-2wi1",
    groupStates: [
        new GroupState("1", "O3MwvjfktgOHlRF"),
        new GroupState("2", "X9MZ5qWaoQd8ZrX"),
        new GroupState("3", "uVYKNKrZfxUQHHt")
    ],
    accessToken: "",
    refreshToken: ""
};