"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var EmptyResponseBodyErrorInterceptor = /** @class */ (function () {
    function EmptyResponseBodyErrorInterceptor() {
    }
    EmptyResponseBodyErrorInterceptor.prototype.intercept = function (req, next) {
        return next.handle(req).pipe(operators_1.catchError(function (err, caught) {
            if (err.status === 401) {
                console.log('hey you intercepted a 401 :' + JSON.stringify(err));
                var res = new http_1.HttpResponse({
                    body: null,
                    headers: err.headers,
                    status: err.status,
                    statusText: err.statusText,
                    url: err.url
                });
                return rxjs_1.of(res);
            }
            throw err;
        }));
    };
    EmptyResponseBodyErrorInterceptor = __decorate([
        core_1.Injectable()
    ], EmptyResponseBodyErrorInterceptor);
    return EmptyResponseBodyErrorInterceptor;
}());
exports.EmptyResponseBodyErrorInterceptor = EmptyResponseBodyErrorInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBc0M7QUFDbEMsNENBQTRDO0FBQzVDLHNDQUEyQztBQUMzQyw2Q0FPOEI7QUFHOUI7SUFBQTtJQW1CQSxDQUFDO0lBbEJHLHFEQUFTLEdBQVQsVUFBVSxHQUFxQixFQUFFLElBQWlCO1FBQ2xELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ3hCLHNCQUFVLENBQUMsVUFBQyxHQUFzQixFQUFFLE1BQXVCO1lBQ3ZELElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxJQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFZLENBQUM7b0JBQ3pCLElBQUksRUFBRSxJQUFJO29CQUNWLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTztvQkFDcEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVU7b0JBQzFCLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRztpQkFDYixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxTQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7WUFDRCxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FDSixDQUFDLENBQUM7SUFDTCxDQUFDO0lBbEJVLGlDQUFpQztRQUQ3QyxpQkFBVSxFQUFFO09BQ0EsaUNBQWlDLENBbUI3QztJQUFELHdDQUFDO0NBQUEsQUFuQkQsSUFtQkM7QUFuQlksOEVBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuICAgIGltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbiAgICBpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAgICBpbXBvcnQge1xyXG4gICAgICBIdHRwSW50ZXJjZXB0b3IsXHJcbiAgICAgIEh0dHBSZXF1ZXN0LFxyXG4gICAgICBIdHRwSGFuZGxlcixcclxuICAgICAgSHR0cFJlc3BvbnNlLFxyXG4gICAgICBIdHRwRXZlbnQsXHJcbiAgICAgIEh0dHBFcnJvclJlc3BvbnNlXHJcbiAgICB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbiAgICBASW5qZWN0YWJsZSgpXHJcbiAgICBleHBvcnQgY2xhc3MgRW1wdHlSZXNwb25zZUJvZHlFcnJvckludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuICAgICAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6ICBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycjogSHR0cEVycm9yUmVzcG9uc2UsIGNhdWdodDogT2JzZXJ2YWJsZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hleSB5b3UgaW50ZXJjZXB0ZWQgYSA0MDEgOicgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBuZXcgSHR0cFJlc3BvbnNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogZXJyLmhlYWRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogZXJyLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogZXJyLnN0YXR1c1RleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZXJyLnVybFxyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YocmVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICkpO1xyXG4gICAgICB9XHJcbiAgICB9Il19