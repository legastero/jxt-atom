module.exports = function (stanza) {
    var types = stanza.utils;
    var NS = 'http://www.w3.org/2005/Atom';

    stanza.define({
        name: 'atom',
        namespace: NS,
        element: 'entry',
        fields: {
            id: types.subText(NS, 'id'),
            title: types.subText(NS, 'title'),
            summary: types.subText(NS, 'summary'),
            content: types.subText(NS, 'content'),
            published: types.dateSub(NS, 'published'),
            updated: types.dateSub(NS, 'updated')
        }
    });
};
