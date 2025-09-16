const crypto = require('crypto');
const { extractSemicololnParagraph, analyzeTextForRelevance } = require('./chunk_utils');

function sha256(data) {
    return crypto
        .createHash('sha256')
        .update(data, typeof data === 'string' ? 'utf8' : undefined)
        .digest('hex');
} 
/*
id: '4',
  title: 'Free movement',
  isArticle: true,
  text: [],
  children: [
    {
      id: 1,
      title: null,
      isParagraph: true,
      text: [Array],
      nums: [Array],
      children: [],
      rows: []
    },
*/
function joinText(a, b) {
    if (a && a.length > 0) {
        return b && b.trim().length > 0 ? a.trim()+ ' ' + b.trim() : a.trim();
    } else {
        console.log(b);
        return b && b.trim().length > 0 ? b.trim() : '';
    }
}
function createChunks(article, metadata) {
    console.log(article);
    const hasChildreanPars = article.children.some(child => child.isParagraph);
    const hasChildreanRowPoints = article.rows.some(row => {
        console.log("row.columns[0]", row.columns[0])
        return row.columns[0] && ['pnt', 'sub', 'idt'].indexOf(row.columns[0].class.type) > -1
    });
    const newChunks = []
    const articleText = article.text.join(' ');
    let articlePreText = null;
    if ((hasChildreanPars || hasChildreanRowPoints) && articleText.endsWith(':')) {
        articlePreText = article.text.join(' ');
    } else {
        const newChunk = Object.assign({}, metadata, {
            chunk_id: metadata.framework_code + "/" + article.id,
            doc_id: metadata.framework_code,
            section_path: article.id,
            parent_id: null,
            group_id: metadata.framework_code + "/" + article.id + "/" + "[pUnknown]",
            seq: 1,
            normative: true,
            informative: false,
            text_normative: articleText,
            text_informative: null,
            context_note: null,
            context: {
                lbLexStdId: metadata.lbId,
                sourceUrl: metadata.sourceUrl,
                sourceType: 'xhtml',
                title: article.title,
                isRelevantVerb: analyzeTextForRelevance(articleText),
                page: "Unknown",
                anchor: article.anchor
            },
            sha256: sha256(articleText)
        });
        newChunks.push(newChunk);
    }
    if (hasChildreanPars) {   
        article.children.forEach( par => {
            const parkey = par.id;
            let parText = par.text.join(' ');
            let parPreText = null;
            const hasChildreanRowPoints = par.rows.some(row => {
                console.log("row.columns[0]", row.columns[0])
                return row.columns[0] && ['pnt', 'sub', 'idt'].indexOf(row.columns[0].class.type) > -1
            });
            if ((hasChildreanPars || hasChildreanRowPoints) && parText.endsWith(':')) {
                parPreText = joinText(articlePreText, parText);
            } else {
                const joinedText = joinText(articlePreText, par.text.join(' '));
                const newChunk = Object.assign({}, metadata, {
                    chunk_id: metadata.framework_code + "/" + article.id + '/' + parkey,
                    doc_id: metadata.framework_code,
                    section_path: article.id + '/' + parkey,
                    parent_id: null,
                    group_id: metadata.framework_code + "/" + article.id + '/' + parkey + "/" + "[pUnknown]",
                    seq: 1,
                    normative: true,
                    informative: false,
                    text_normative: joinedText,
                    text_informative: null,
                    context_note: null,
                    context: {
                        lbLexStdId: metadata.lbId,
                        sourceUrl: metadata.sourceUrl,
                        sourceType: 'xhtml',
                        title: article.title,
                        isRelevantVerb: analyzeTextForRelevance(joinedText),
                        page: "Unknown",
                        anchor: par.anchor
                    },
                    sha256: sha256(joinedText)
                });
                newChunks.push(newChunk);
            }
            if (hasChildreanPars) {   
                par.children.forEach( subpar => {
                    const subparkey = subpar.id;
                    let parPreText = null;
                    throw new Error("Nor implemented yet");
                });
            }
            if (hasChildreanRowPoints) {   
                par.rows.forEach( row => {
                    const rowkey = row.columns[0].class.type == 'sub' ? '(' + row.columns[0].class.value + ')' : row.columns[0].class.value;
                    const joinedText = joinText(parPreText, row.columns[1].text.join(' '));
                    const newChunk = Object.assign({}, metadata, {
                        chunk_id: metadata.framework_code + "/" + article.id + '/' + parkey + '/' + rowkey,
                        doc_id: metadata.framework_code,
                        section_path: article.id + '/' + parkey + '/' + rowkey,
                        parent_id: null,
                        group_id: metadata.framework_code + "/" + article.id + '/' + rowkey + "/" + "[pUnknown]",
                        seq: 1,
                        normative: true,
                        informative: false,
                        text_normative: joinedText,
                        text_informative: null,
                        context_note: null,
                        context: {
                            lbLexStdId: metadata.lbId,
                            sourceUrl: metadata.sourceUrl,
                            sourceType: 'xhtml',
                            title: article.title,
                            isRelevantVerb: analyzeTextForRelevance(joinedText),
                            page: "Unknown",
                            anchor: par.anchor
                        },
                        sha256: sha256(joinedText)
                    });
                    newChunks.push(newChunk);
                });
            }
        });
    }
    if (hasChildreanRowPoints) {   
        article.rows.forEach( row => {
            const rowkey = row.columns[0].class.type == 'sub' ? '(' + row.columns[0].class.value + ')' : row.columns[0].class.value;
            const joinedText = joinText(articlePreText, row.columns[1].text.join(' '));
            const newChunk = Object.assign({}, metadata, {
                chunk_id: metadata.framework_code + "/" + article.id + '/' + rowkey,
                doc_id: metadata.framework_code,
                section_path: article.id + '/' + rowkey,
                parent_id: null,
                group_id: metadata.framework_code + "/" + article.id + '/' + rowkey + "/" + "[pUnknown]",
                seq: 1,
                normative: true,
                informative: false,
                text_normative: joinedText,
                text_informative: null,
                context_note: null,
                context: {
                    lbLexStdId: metadata.lbId,
                    sourceUrl: metadata.sourceUrl,
                    sourceType: 'xhtml',
                    title: article.title,
                    isRelevantVerb: analyzeTextForRelevance(joinedText),
                    page: "Unknown",
                    anchor: article.anchor
                },
                sha256: sha256(joinedText)
            });
            newChunks.push(newChunk);
        });
    }    
    return newChunks;
}

module.exports = { createChunks };