(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/change", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An operation that does nothing.
     */
    var NoopChange = /** @class */ (function () {
        function NoopChange() {
            this.description = 'No operation.';
            this.order = Infinity;
            this.path = null;
        }
        NoopChange.prototype.apply = function () {
            return Promise.resolve();
        };
        return NoopChange;
    }());
    exports.NoopChange = NoopChange;
    /**
     * Will add text to the source code.
     */
    var InsertChange = /** @class */ (function () {
        function InsertChange(path, pos, toAdd) {
            this.path = path;
            this.pos = pos;
            this.toAdd = toAdd;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = "Inserted " + toAdd + " into position " + pos + " of " + path;
            this.order = pos;
        }
        /**
         * This method does not insert spaces if there is none in the original string.
         */
        InsertChange.prototype.apply = function (host) {
            var _this = this;
            return host.read(this.path).then(function (content) {
                var prefix = content.substring(0, _this.pos);
                var suffix = content.substring(_this.pos);
                return host.write(_this.path, "" + prefix + _this.toAdd + suffix);
            });
        };
        return InsertChange;
    }());
    exports.InsertChange = InsertChange;
    /**
     * Will remove text from the source code.
     */
    var RemoveChange = /** @class */ (function () {
        function RemoveChange(path, pos, toRemove) {
            this.path = path;
            this.pos = pos;
            this.toRemove = toRemove;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = "Removed " + toRemove + " into position " + pos + " of " + path;
            this.order = pos;
        }
        RemoveChange.prototype.apply = function (host) {
            var _this = this;
            return host.read(this.path).then(function (content) {
                var prefix = content.substring(0, _this.pos);
                var suffix = content.substring(_this.pos + _this.toRemove.length);
                // TODO: throw error if toRemove doesn't match removed string.
                return host.write(_this.path, "" + prefix + suffix);
            });
        };
        return RemoveChange;
    }());
    exports.RemoveChange = RemoveChange;
    /**
     * Will replace text from the source code.
     */
    var ReplaceChange = /** @class */ (function () {
        function ReplaceChange(path, pos, oldText, newText) {
            this.path = path;
            this.pos = pos;
            this.oldText = oldText;
            this.newText = newText;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = "Replaced " + oldText + " into position " + pos + " of " + path + " with " + newText;
            this.order = pos;
        }
        ReplaceChange.prototype.apply = function (host) {
            var _this = this;
            return host.read(this.path).then(function (content) {
                var prefix = content.substring(0, _this.pos);
                var suffix = content.substring(_this.pos + _this.oldText.length);
                var text = content.substring(_this.pos, _this.pos + _this.oldText.length);
                if (text !== _this.oldText) {
                    return Promise.reject(new Error("Invalid replace: \"" + text + "\" != \"" + _this.oldText + "\"."));
                }
                // TODO: throw error if oldText doesn't match removed string.
                return host.write(_this.path, "" + prefix + _this.newText + suffix);
            });
        };
        return ReplaceChange;
    }());
    exports.ReplaceChange = ReplaceChange;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9jaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUE0QkE7O09BRUc7SUFDSDtRQUFBO1lBQ0UsZ0JBQVcsR0FBRyxlQUFlLENBQUM7WUFDOUIsVUFBSyxHQUFHLFFBQVEsQ0FBQztZQUNqQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBSWQsQ0FBQztRQUhDLDBCQUFLLEdBQUw7WUFDRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0gsaUJBQUM7SUFBRCxDQUFDLEFBUEQsSUFPQztJQVBZLGdDQUFVO0lBU3ZCOztPQUVHO0lBQ0g7UUFJRSxzQkFBbUIsSUFBWSxFQUFTLEdBQVcsRUFBUyxLQUFhO1lBQXRELFNBQUksR0FBSixJQUFJLENBQVE7WUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUN2RSxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2FBQ25EO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFZLEtBQUssdUJBQWtCLEdBQUcsWUFBTyxJQUFNLENBQUM7WUFDdkUsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbkIsQ0FBQztRQUVEOztXQUVHO1FBQ0gsNEJBQUssR0FBTCxVQUFNLElBQVU7WUFBaEIsaUJBT0M7WUFOQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87Z0JBQ3RDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztn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SSxJQUFJLEtBQUssS0FBSSxDQUFDLE9BQU8sRUFBRTtvQkFDekIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNuQixJQUFJLEtBQUssQ0FBQyx3QkFBcUIsSUFBSSxnQkFBUyxLQUFJLENBQUMsT0FBTyxRQUFJLENBQUMsQ0FDOUQsQ0FBQztpQkFDSDtnQkFFRCw2REFBNkQ7Z0JBQzdELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLEtBQUcsTUFBTSxHQUFHLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBUSxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0gsb0JBQUM7SUFBRCxDQUFDLEFBakNELElBaUNDO0lBakNZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdCB7XG4gIHdyaXRlKHBhdGg6IHN0cmluZywgY29udGVudDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcbiAgcmVhZChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmdlIHtcbiAgYXBwbHkoaG9zdDogSG9zdCk6IFByb21pc2U8dm9pZD47XG5cbiAgLy8gVGhlIGZpbGUgdGhpcyBjaGFuZ2Ugc2hvdWxkIGJlIGFwcGxpZWQgdG8uIFNvbWUgY2hhbmdlcyBtaWdodCBub3QgYXBwbHkgdG9cbiAgLy8gYSBmaWxlIChtYXliZSB0aGUgY29uZmlnKS5cbiAgcmVhZG9ubHkgcGF0aDogc3RyaW5nIHwgbnVsbDtcblxuICAvLyBUaGUgb3JkZXIgdGhpcyBjaGFuZ2Ugc2hvdWxkIGJlIGFwcGxpZWQuIE5vcm1hbGx5IHRoZSBwb3NpdGlvbiBpbnNpZGUgdGhlIGZpbGUuXG4gIC8vIENoYW5nZXMgYXJlIGFwcGxpZWQgZnJvbSB0aGUgYm90dG9tIG9mIGEgZmlsZSB0byB0aGUgdG9wLlxuICByZWFkb25seSBvcmRlcjogbnVtYmVyO1xuXG4gIC8vIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGlzIGNoYW5nZS4gVGhpcyB3aWxsIGJlIG91dHB1dHRlZCBpbiBhIGRyeSBvciB2ZXJib3NlIHJ1bi5cbiAgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZztcbn1cblxuLyoqXG4gKiBBbiBvcGVyYXRpb24gdGhhdCBkb2VzIG5vdGhpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb29wQ2hhbmdlIGltcGxlbWVudHMgQ2hhbmdlIHtcbiAgZGVzY3JpcHRpb24gPSAnTm8gb3BlcmF0aW9uLic7XG4gIG9yZGVyID0gSW5maW5pdHk7XG4gIHBhdGggPSBudWxsO1xuICBhcHBseSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBXaWxsIGFkZCB0ZXh0IHRvIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEluc2VydENoYW5nZSBpbXBsZW1lbnRzIENoYW5nZSB7XG4gIG9yZGVyOiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBhdGg6IHN0cmluZywgcHVibGljIHBvczogbnVtYmVyLCBwdWJsaWMgdG9BZGQ6IHN0cmluZykge1xuICAgIGlmIChwb3MgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZ2F0aXZlIHBvc2l0aW9ucyBhcmUgaW52YWxpZCcpO1xuICAgIH1cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gYEluc2VydGVkICR7dG9BZGR9IGludG8gcG9zaXRpb24gJHtwb3N9IG9mICR7cGF0aH1gO1xuICAgIHRoaXMub3JkZXIgPSBwb3M7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgaW5zZXJ0IHNwYWNlcyBpZiB0aGVyZSBpcyBub25lIGluIHRoZSBvcmlnaW5hbCBzdHJpbmcuXG4gICAqL1xuICBhcHBseShob3N0OiBIb3N0KSB7XG4gICAgcmV0dXJuIGhvc3QucmVhZCh0aGlzLnBhdGgpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICBjb25zdCBwcmVmaXggPSBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvcyk7XG4gICAgICBjb25zdCBzdWZmaXggPSBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvcyk7XG5cbiAgICAgIHJldHVybiBob3N0LndyaXRlKHRoaXMucGF0aCwgYCR7cHJlZml4fSR7dGhpcy50b0FkZH0ke3N1ZmZpeH1gKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFdpbGwgcmVtb3ZlIHRleHQgZnJvbSB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW1vdmVDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBvcmRlcjogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwYXRoOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBwb3M6IG51bWJlcixcbiAgICBwcml2YXRlIHRvUmVtb3ZlOiBzdHJpbmdcbiAgKSB7XG4gICAgaWYgKHBvcyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmVnYXRpdmUgcG9zaXRpb25zIGFyZSBpbnZhbGlkJyk7XG4gICAgfVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBgUmVtb3ZlZCAke3RvUmVtb3ZlfSBpbnRvIHBvc2l0aW9uICR7cG9zfSBvZiAke3BhdGh9YDtcbiAgICB0aGlzLm9yZGVyID0gcG9zO1xuICB9XG5cbiAgYXBwbHkoaG9zdDogSG9zdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBob3N0LnJlYWQodGhpcy5wYXRoKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgY29uc3QgcHJlZml4ID0gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3MpO1xuICAgICAgY29uc3Qgc3VmZml4ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3MgKyB0aGlzLnRvUmVtb3ZlLmxlbmd0aCk7XG5cbiAgICAgIC8vIFRPRE86IHRocm93IGVycm9yIGlmIHRvUmVtb3ZlIGRvZXNuJ3QgbWF0Y2ggcmVtb3ZlZCBzdHJpbmcuXG4gICAgICByZXR1cm4gaG9zdC53cml0ZSh0aGlzLnBhdGgsIGAke3ByZWZpeH0ke3N1ZmZpeH1gKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFdpbGwgcmVwbGFjZSB0ZXh0IGZyb20gdGhlIHNvdXJjZSBjb2RlLlxuICovXG5leHBvcnQgY2xhc3MgUmVwbGFjZUNoYW5nZSBpbXBsZW1lbnRzIENoYW5nZSB7XG4gIG9yZGVyOiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHBhdGg6IHN0cmluZyxcbiAgICBwcml2YXRlIHBvczogbnVtYmVyLFxuICAgIHB1YmxpYyBvbGRUZXh0OiBzdHJpbmcsXG4gICAgcHVibGljIG5ld1RleHQ6IHN0cmluZ1xuICApIHtcbiAgICBpZiAocG9zIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZWdhdGl2ZSBwb3NpdGlvbnMgYXJlIGludmFsaWQnKTtcbiAgICB9XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGBSZXBsYWNlZCAke29sZFRleHR9IGludG8gcG9zaXRpb24gJHtwb3N9IG9mICR7cGF0aH0gd2l0aCAke25ld1RleHR9YDtcbiAgICB0aGlzLm9yZGVyID0gcG9zO1xuICB9XG5cbiAgYXBwbHkoaG9zdDogSG9zdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBob3N0LnJlYWQodGhpcy5wYXRoKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgY29uc3QgcHJlZml4ID0gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3MpO1xuICAgICAgY29uc3Qgc3VmZml4ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3MgKyB0aGlzLm9sZFRleHQubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHRleHQgPSBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvcywgdGhpcy5wb3MgKyB0aGlzLm9sZFRleHQubGVuZ3RoKTtcblxuICAgICAgaWYgKHRleHQgIT09IHRoaXMub2xkVGV4dCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgbmV3IEVycm9yKGBJbnZhbGlkIHJlcGxhY2U6IFwiJHt0ZXh0fVwiICE9IFwiJHt0aGlzLm9sZFRleHR9XCIuYClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogdGhyb3cgZXJyb3IgaWYgb2xkVGV4dCBkb2Vzbid0IG1hdGNoIHJlbW92ZWQgc3RyaW5nLlxuICAgICAgcmV0dXJuIGhvc3Qud3JpdGUodGhpcy5wYXRoLCBgJHtwcmVmaXh9JHt0aGlzLm5ld1RleHR9JHtzdWZmaXh9YCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==