/* tslint:disable:no-var-requires */
const m = require('mithril');
import Beacon = require('./Beacon');

export = {
    view: (vnode) =>
        (vnode.attrs.beacon && m('div.inspector-beacons', m(Beacon, vnode.attrs))),
};
