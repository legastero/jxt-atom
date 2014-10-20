var NS = 'http://www.w3.org/2005/Atom';

module.exports = function (stanza) {
    var types = stanza.utils;

    stanza.define({
        name: 'atom',
        namespace: NS,
        element: 'entry',
        fields: {
            id: types.subText(NS, 'id'),
            title: types.subText(NS, 'title'),
            summary: types.subText(NS, 'summary'),
            published: types.dateSub(NS, 'published')
        }
    });
};
