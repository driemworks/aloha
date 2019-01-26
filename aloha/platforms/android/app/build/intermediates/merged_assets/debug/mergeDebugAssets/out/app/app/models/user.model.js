"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupState_model_1 = require("./GroupState.model");
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
exports.initialState = {
    bridgeIpAddress: "192.168.1.236",
    username: "dOBMZLQEqwc08ab2saX8UT60qBv6vRPHTWi-2wi1",
    groupStates: [
        new GroupState_model_1.GroupState("1", "O3MwvjfktgOHlRF"),
        new GroupState_model_1.GroupState("2", "X9MZ5qWaoQd8ZrX"),
        new GroupState_model_1.GroupState("3", "uVYKNKrZfxUQHHt")
    ],
    accessToken: "",
    refreshToken: ""
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBZ0Q7QUFVaEQsc0NBQXNDO0FBQ3RDLDJCQUEyQjtBQUMzQixvQkFBb0I7QUFDcEIscUJBQXFCO0FBQ3JCLGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQsaURBQWlEO0FBQ2pELFNBQVM7QUFDVCx1QkFBdUI7QUFDdkIsdUJBQXVCO0FBQ3ZCLEtBQUs7QUFFUSxRQUFBLFlBQVksR0FBUztJQUM5QixlQUFlLEVBQUUsZUFBZTtJQUNoQyxRQUFRLEVBQUUsMENBQTBDO0lBQ3BELFdBQVcsRUFBRTtRQUNULElBQUksNkJBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7UUFDdEMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztRQUN0QyxJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO0tBQ3pDO0lBQ0QsV0FBVyxFQUFFLEVBQUU7SUFDZixZQUFZLEVBQUUsRUFBRTtDQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JvdXBTdGF0ZSB9IGZyb20gXCIuL0dyb3VwU3RhdGUubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgICBicmlkZ2VJcEFkZHJlc3M6IFN0cmluZztcclxuICAgIHVzZXJuYW1lOiBTdHJpbmc7XHJcbiAgICBhY2Nlc3NUb2tlbjogU3RyaW5nO1xyXG4gICAgcmVmcmVzaFRva2VuOiBTdHJpbmc7XHJcbiAgICBncm91cFN0YXRlczogR3JvdXBTdGF0ZVtdO1xyXG59XHJcblxyXG4vLyBleHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBVc2VyID0ge1xyXG4vLyAgICAgYnJpZGdlSXBBZGRyZXNzOiBcIlwiLFxyXG4vLyAgICAgdXNlcm5hbWU6IFwiXCIsXHJcbi8vICAgICBncm91cFN0YXRlczogW1xyXG4vLyAgICAgICAgIG5ldyBHcm91cFN0YXRlKFwiMVwiLCBcIk8zTXd2amZrdGdPSGxSRlwiKSxcclxuLy8gICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjJcIiwgXCJYOU1aNXFXYW9RZDhaclhcIiksXHJcbi8vICAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIzXCIsIFwidVZZS05LclpmeFVRSEh0XCIpXHJcbi8vICAgICBdLFxyXG4vLyAgICAgYWNjZXNzVG9rZW46IFwiXCIsXHJcbi8vICAgICByZWZyZXNoVG9rZW46IFwiXCJcclxuLy8gfTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFVzZXIgPSB7XHJcbiAgICBicmlkZ2VJcEFkZHJlc3M6IFwiMTkyLjE2OC4xLjIzNlwiLFxyXG4gICAgdXNlcm5hbWU6IFwiZE9CTVpMUUVxd2MwOGFiMnNhWDhVVDYwcUJ2NnZSUEhUV2ktMndpMVwiLFxyXG4gICAgZ3JvdXBTdGF0ZXM6IFtcclxuICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjFcIiwgXCJPM013dmpma3RnT0hsUkZcIiksXHJcbiAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIyXCIsIFwiWDlNWjVxV2FvUWQ4WnJYXCIpLFxyXG4gICAgICAgIG5ldyBHcm91cFN0YXRlKFwiM1wiLCBcInVWWUtOS3JaZnhVUUhIdFwiKVxyXG4gICAgXSxcclxuICAgIGFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgcmVmcmVzaFRva2VuOiBcIlwiXHJcbn07Il19