import { GroupState } from "./GroupState.model";

export interface User {
    alias: string,
    uuid: string,
    bridgeIpAddress: string,
    username: string,
    accessToken: String,
    refreshToken: String,
    groupStates: GroupState[],
}

export const initialState: User = {
    alias: "Tony",
    uuid: "2b5c79f227905fbe",
    bridgeIpAddress: "192.168.1.236",
    username: "c0j6qnxtbYqfcosNx8ccRgfwhPkY6wrlSn0oe-1H",
    groupStates: [
        new GroupState("1", "O3MwvjfktgOHlRF"),
        new GroupState("2", "X9MZ5qWaoQd8ZrX"),
        new GroupState("3", "uVYKNKrZfxUQHHt")
    ],
    accessToken: "",
    refreshToken: ""
};

// export const initialStateTony: User = {
//     alias: "Tony",
//     uuid: "",
//     bridgeIpAddress: "192.168.1.236",
//     username: "dOBMZLQEqwc08ab2saX8UT60qBv6vRPHTWi-2wi1",
//     groupStates: [
//         new GroupState("1", "O3MwvjfktgOHlRF"),
//         new GroupState("2", "X9MZ5qWaoQd8ZrX"),
//         new GroupState("3", "uVYKNKrZfxUQHHt")
//     ],
//     accessToken: "",
//     refreshToken: ""
// };