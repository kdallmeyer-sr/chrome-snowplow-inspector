import m = require('mithril');
import analytics = require('./analytics');

export = {
    view: (vnode) => m('nav.navbar.is-flex-touch',
        [
            m('div.navbar-brand',
                m('a.navbar-item', { href: analytics.landingUrl, target: '_blank' },
                    m('img', { alt: 'Snowflake Analytics logo', src: 'sa-logo.png' }),
                ),
            ),
            m('div.navbar-menu.is-active.is-shadowless',
                m('div.navbar-start',
                    m('div.navbar-item.field.is-grouped',
                        m('a.button.is-outlined.is-small', { onclick: vnode.attrs.clearRequests }, 'Clear Events'),
                    ),
                ),
            ),
        ],
    ),
};
