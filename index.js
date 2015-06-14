'use strict';


var NS = 'http://www.w3.org/2005/Atom';
var XHTML_NS = 'http://www.w3.org/1999/xhtml';


module.exports = function (JXT) {
    var types = JXT.utils;

    // ================================================================
    // Shared Property Definitions

    var atomPersonType = {
        lang: types.langAttribute(),
        name: types.textSub(NS, 'name'),
        uri: types.textSub(NS, 'uri'),
        email: types.textSub(NS, 'email')
    };

    var atomTextType = {
        lang: types.langAttribute(),
        type: types.attribute('type', 'text'),
        value: {
            get: function () {
                var xhtml = types.find(this.xml, XHTML_NS, 'div');
                if (xhtml.length) {
                    return xhtml[0].toString();
                }

                return types.getText(this.xml);
            },
            set: function (value) {
                if (typeof value === 'string') {
                    JXT.setText(this.xml, value);
                } else {
                    this.xml.appendChild(value);
                }
            }
        }
    };


    // ================================================================
    // JXT Definitions

    var Author = JXT.define({
        name: '_author',
        namespace: NS,
        element: 'author',
        fields: atomPersonType
    });

    var Category = JXT.define({
        name: '_category',
        namespsace: NS,
        element: 'category',
        fields: {
            lang: types.langAttribute(),
            term: types.attribute('term'),
            scheme: types.attribute('scheme'),
            label: types.attribute('label')
        }
    });

    var Contributor = JXT.define({
        name: '_contributor',
        namespace: NS,
        element: 'contributor',
        fields: atomPersonType
    });

    var Content = JXT.define({
        name: 'content',
        namespace: NS,
        element: 'content',
        fields: atomTextType
    });

    var Link = JXT.define({
        name: '_link',
        namespace: NS,
        element: 'link',
        fields: {
            lang: types.langAttribute(),
            href: types.attribute('href'),
            rel: types.attribute('rel'),
            type: types.attribute('type'),
            hreflang: types.attribute('hreflang'),
            title: types.attribute('title'),
            length: types.attribute('length')
        }
    });

    var Summary = JXT.define({
        name: 'summary',
        namespace: NS,
        element: 'summary',
        fields: atomTextType
    });

    var Title = JXT.define({
        name: 'title',
        namespace: NS,
        element: 'title',
        fields: atomTextType
    });

    var SubTitle = JXT.define({
        name: 'subtitle',
        namespace: NS,
        element: 'subtitle',
        fields: atomTextType
    });

    // ================================================================
    // Atom Containers

    var AtomEntry = JXT.define({
        name: 'atom',
        namespace: NS,
        element: 'entry',
        fields: {
            lang: types.langAttribute(),
            id: types.textSub(NS, 'id'),
            published: types.dateSub(NS, 'published'),
            updated: types.dateSub(NS, 'updated'),
            rights: types.textSub(NS, 'rights'),
            logo: types.textSub(NS, 'logo')
        }
    });

    var AtomFeed = JXT.define({
        name: 'atomFeed',
        namespace: NS,
        element: 'feed',
        fields: {
            lang: types.langAttribute(),
            id: types.textSub(NS, 'id'),
            published: types.dateSub(NS, 'published'),
            updated: types.dateSub(NS, 'updated'),
            rights: types.textSub(NS, 'rights'),
            logo: types.textSub(NS, 'logo'),
            icon: types.textSub(NS, 'icon')
        }
    });


    // ================================================================
    // JXT Definition Linking

    JXT.extend(AtomEntry, Content);
    JXT.extend(AtomEntry, SubTitle);
    JXT.extend(AtomEntry, Summary);
    JXT.extend(AtomEntry, Title);

    JXT.extend(AtomEntry, Author, 'authors');
    JXT.extend(AtomEntry, Category, 'categories');
    JXT.extend(AtomEntry, Contributor, 'contributors');
    JXT.extend(AtomEntry, Link, 'links');

    JXT.extend(AtomFeed, Content);
    JXT.extend(AtomFeed, SubTitle);
    JXT.extend(AtomFeed, Summary);
    JXT.extend(AtomFeed, Title);

    JXT.extend(AtomFeed, Author, 'authors');
    JXT.extend(AtomFeed, Category, 'categories');
    JXT.extend(AtomFeed, Contributor, 'contributors');
    JXT.extend(AtomFeed, Link, 'links');
    JXT.extend(AtomFeed, AtomEntry, 'entries');
};
