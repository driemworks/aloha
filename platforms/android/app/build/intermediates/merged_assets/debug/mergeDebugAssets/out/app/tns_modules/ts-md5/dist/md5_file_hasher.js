"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var md5_1 = require("./md5");
// Hashes any blob
var Md5FileHasher = (function () {
    function Md5FileHasher(_callback, // Callback to return the result
        _async, // Async version is not always available in a web worker
        _partSize) {
        if (_async === void 0) { _async = true; }
        if (_partSize === void 0) { _partSize = 1048576; }
        this._callback = _callback;
        this._async = _async;
        this._partSize = _partSize;
        this._configureReader();
    }
    Md5FileHasher.prototype.hash = function (blob) {
        var self = this;
        self._blob = blob;
        self._length = Math.ceil(blob.size / self._partSize);
        self._part = 0;
        self._md5 = new md5_1.Md5();
        self._processPart();
    };
    Md5FileHasher.prototype._fail = function () {
        this._callback({
            success: false,
            result: 'data read failed'
        });
    };
    Md5FileHasher.prototype._hashData = function (e) {
        var self = this;
        self._md5.appendByteArray(new Uint8Array(e.target.result));
        if (self._part * self._partSize >= self._blob.size) {
            self._callback({
                success: true,
                result: self._md5.end()
            });
        }
        else {
            self._processPart();
        }
    };
    Md5FileHasher.prototype._processPart = function () {
        var self = this;
        var endbyte = 0;
        var current_part;
        self._part += 1;
        if (self._blob.size > self._partSize) {
            endbyte = self._part * self._partSize;
            if (endbyte > self._blob.size) {
                endbyte = self._blob.size;
            }
            current_part = self._blob.slice((self._part - 1) * self._partSize, endbyte);
        }
        else {
            current_part = self._blob;
        }
        if (self._async) {
            self._reader.readAsArrayBuffer(current_part);
        }
        else {
            setTimeout(function () {
                try {
                    self._hashData({
                        target: {
                            result: self._reader.readAsArrayBuffer(current_part)
                        },
                    });
                }
                catch (e) {
                    self._fail();
                }
            }, 0);
        }
    };
    Md5FileHasher.prototype._configureReader = function () {
        var self = this;
        if (self._async) {
            self._reader = new FileReader();
            self._reader.onload = self._hashData.bind(self);
            self._reader.onerror = self._fail.bind(self);
            self._reader.onabort = self._fail.bind(self);
        }
        else {
            self._reader = new FileReaderSync();
        }
    };
    return Md5FileHasher;
}());
exports.Md5FileHasher = Md5FileHasher;
//# sourceMappingURL=md5_file_hasher.js.map