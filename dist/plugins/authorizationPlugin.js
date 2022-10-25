"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_auth_1 = require("@envelop/generic-auth");
// placeholder for auth later, for now, make sure there is a token
const resolveUserFn = context => {
    console.log('check user authoriaztion token');
    if (context['req']['headers']['authorization'] != undefined) {
        return { id: context['req']['headers']['authorization'] };
    }
    else {
        console.log("authorization failed");
    }
};
const authPlugin = (0, generic_auth_1.useGenericAuth)({
    resolveUserFn,
    mode: 'protect-all'
});
exports.default = authPlugin;
//# sourceMappingURL=authorizationPlugin.js.map