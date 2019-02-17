"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupState_model_1 = require("./GroupState.model");
exports.initialState = {
    alias: "Tony",
    uuid: "2b5c79f227905fbe",
    bridgeIpAddress: "192.168.1.236",
    username: "c0j6qnxtbYqfcosNx8ccRgfwhPkY6wrlSn0oe-1H",
    groupStates: [
        new GroupState_model_1.GroupState("1", "O3MwvjfktgOHlRF"),
        new GroupState_model_1.GroupState("2", "X9MZ5qWaoQd8ZrX"),
        new GroupState_model_1.GroupState("3", "uVYKNKrZfxUQHHt")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBZ0Q7QUFZbkMsUUFBQSxZQUFZLEdBQVM7SUFDOUIsS0FBSyxFQUFFLE1BQU07SUFDYixJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLGVBQWUsRUFBRSxlQUFlO0lBQ2hDLFFBQVEsRUFBRSwwQ0FBMEM7SUFDcEQsV0FBVyxFQUFFO1FBQ1QsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztRQUN0QyxJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO1FBQ3RDLElBQUksNkJBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7S0FDekM7SUFDRCxXQUFXLEVBQUUsRUFBRTtJQUNmLFlBQVksRUFBRSxFQUFFO0NBQ25CLENBQUM7QUFFRiwwQ0FBMEM7QUFDMUMscUJBQXFCO0FBQ3JCLGdCQUFnQjtBQUNoQix3Q0FBd0M7QUFDeEMsNERBQTREO0FBQzVELHFCQUFxQjtBQUNyQixrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELGlEQUFpRDtBQUNqRCxTQUFTO0FBQ1QsdUJBQXVCO0FBQ3ZCLHVCQUF1QjtBQUN2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JvdXBTdGF0ZSB9IGZyb20gXCIuL0dyb3VwU3RhdGUubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgICBhbGlhczogc3RyaW5nLFxyXG4gICAgdXVpZDogc3RyaW5nLFxyXG4gICAgYnJpZGdlSXBBZGRyZXNzOiBzdHJpbmcsXHJcbiAgICB1c2VybmFtZTogc3RyaW5nLFxyXG4gICAgYWNjZXNzVG9rZW46IFN0cmluZyxcclxuICAgIHJlZnJlc2hUb2tlbjogU3RyaW5nLFxyXG4gICAgZ3JvdXBTdGF0ZXM6IEdyb3VwU3RhdGVbXSxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogVXNlciA9IHtcclxuICAgIGFsaWFzOiBcIlRvbnlcIixcclxuICAgIHV1aWQ6IFwiMmI1Yzc5ZjIyNzkwNWZiZVwiLFxyXG4gICAgYnJpZGdlSXBBZGRyZXNzOiBcIjE5Mi4xNjguMS4yMzZcIixcclxuICAgIHVzZXJuYW1lOiBcImMwajZxbnh0YllxZmNvc054OGNjUmdmd2hQa1k2d3JsU24wb2UtMUhcIixcclxuICAgIGdyb3VwU3RhdGVzOiBbXHJcbiAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIxXCIsIFwiTzNNd3ZqZmt0Z09IbFJGXCIpLFxyXG4gICAgICAgIG5ldyBHcm91cFN0YXRlKFwiMlwiLCBcIlg5TVo1cVdhb1FkOFpyWFwiKSxcclxuICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjNcIiwgXCJ1VllLTktyWmZ4VVFISHRcIilcclxuICAgIF0sXHJcbiAgICBhY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIHJlZnJlc2hUb2tlbjogXCJcIlxyXG59O1xyXG5cclxuLy8gZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZVRvbnk6IFVzZXIgPSB7XHJcbi8vICAgICBhbGlhczogXCJUb255XCIsXHJcbi8vICAgICB1dWlkOiBcIlwiLFxyXG4vLyAgICAgYnJpZGdlSXBBZGRyZXNzOiBcIjE5Mi4xNjguMS4yMzZcIixcclxuLy8gICAgIHVzZXJuYW1lOiBcImRPQk1aTFFFcXdjMDhhYjJzYVg4VVQ2MHFCdjZ2UlBIVFdpLTJ3aTFcIixcclxuLy8gICAgIGdyb3VwU3RhdGVzOiBbXHJcbi8vICAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIxXCIsIFwiTzNNd3ZqZmt0Z09IbFJGXCIpLFxyXG4vLyAgICAgICAgIG5ldyBHcm91cFN0YXRlKFwiMlwiLCBcIlg5TVo1cVdhb1FkOFpyWFwiKSxcclxuLy8gICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjNcIiwgXCJ1VllLTktyWmZ4VVFISHRcIilcclxuLy8gICAgIF0sXHJcbi8vICAgICBhY2Nlc3NUb2tlbjogXCJcIixcclxuLy8gICAgIHJlZnJlc2hUb2tlbjogXCJcIlxyXG4vLyB9OyJdfQ==