"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupState_model_1 = require("./GroupState.model");
exports.initialState = {
    alias: "",
    uuid: "",
    bridgeIpAddress: "",
    username: "",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBZ0Q7QUFZbkMsUUFBQSxZQUFZLEdBQVM7SUFDOUIsS0FBSyxFQUFFLEVBQUU7SUFDVCxJQUFJLEVBQUUsRUFBRTtJQUNSLGVBQWUsRUFBRSxFQUFFO0lBQ25CLFFBQVEsRUFBRSxFQUFFO0lBQ1osV0FBVyxFQUFFO1FBQ1QsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztRQUN0QyxJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO1FBQ3RDLElBQUksNkJBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7S0FDekM7SUFDRCxXQUFXLEVBQUUsRUFBRTtJQUNmLFlBQVksRUFBRSxFQUFFO0NBQ25CLENBQUM7QUFFRiwwQ0FBMEM7QUFDMUMscUJBQXFCO0FBQ3JCLGdCQUFnQjtBQUNoQix3Q0FBd0M7QUFDeEMsNERBQTREO0FBQzVELHFCQUFxQjtBQUNyQixrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELGlEQUFpRDtBQUNqRCxTQUFTO0FBQ1QsdUJBQXVCO0FBQ3ZCLHVCQUF1QjtBQUN2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JvdXBTdGF0ZSB9IGZyb20gXCIuL0dyb3VwU3RhdGUubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgICBhbGlhczogc3RyaW5nLFxyXG4gICAgdXVpZDogc3RyaW5nLFxyXG4gICAgYnJpZGdlSXBBZGRyZXNzOiBzdHJpbmcsXHJcbiAgICB1c2VybmFtZTogc3RyaW5nLFxyXG4gICAgYWNjZXNzVG9rZW46IFN0cmluZyxcclxuICAgIHJlZnJlc2hUb2tlbjogU3RyaW5nLFxyXG4gICAgZ3JvdXBTdGF0ZXM6IEdyb3VwU3RhdGVbXSxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogVXNlciA9IHtcclxuICAgIGFsaWFzOiBcIlwiLFxyXG4gICAgdXVpZDogXCJcIixcclxuICAgIGJyaWRnZUlwQWRkcmVzczogXCJcIixcclxuICAgIHVzZXJuYW1lOiBcIlwiLFxyXG4gICAgZ3JvdXBTdGF0ZXM6IFtcclxuICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjFcIiwgXCJPM013dmpma3RnT0hsUkZcIiksXHJcbiAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIyXCIsIFwiWDlNWjVxV2FvUWQ4WnJYXCIpLFxyXG4gICAgICAgIG5ldyBHcm91cFN0YXRlKFwiM1wiLCBcInVWWUtOS3JaZnhVUUhIdFwiKVxyXG4gICAgXSxcclxuICAgIGFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgcmVmcmVzaFRva2VuOiBcIlwiXHJcbn07XHJcblxyXG4vLyBleHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlVG9ueTogVXNlciA9IHtcclxuLy8gICAgIGFsaWFzOiBcIlRvbnlcIixcclxuLy8gICAgIHV1aWQ6IFwiXCIsXHJcbi8vICAgICBicmlkZ2VJcEFkZHJlc3M6IFwiMTkyLjE2OC4xLjIzNlwiLFxyXG4vLyAgICAgdXNlcm5hbWU6IFwiZE9CTVpMUUVxd2MwOGFiMnNhWDhVVDYwcUJ2NnZSUEhUV2ktMndpMVwiLFxyXG4vLyAgICAgZ3JvdXBTdGF0ZXM6IFtcclxuLy8gICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjFcIiwgXCJPM013dmpma3RnT0hsUkZcIiksXHJcbi8vICAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIyXCIsIFwiWDlNWjVxV2FvUWQ4WnJYXCIpLFxyXG4vLyAgICAgICAgIG5ldyBHcm91cFN0YXRlKFwiM1wiLCBcInVWWUtOS3JaZnhVUUhIdFwiKVxyXG4vLyAgICAgXSxcclxuLy8gICAgIGFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4vLyAgICAgcmVmcmVzaFRva2VuOiBcIlwiXHJcbi8vIH07Il19