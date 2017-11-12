const cheerio = require('cheerio');

function bodyHashToString(bodyHash) {
  let str = '';
  for (let i in bodyHash.data) {
    let hexStr = bodyHash.data[i].toString(16);
    if (hexStr.length === 1) {
      hexStr = '0' + hexStr;
    }
    str += hexStr;
  }
  return str;
}

function genResourceUrl(webApiUrlPrefix, noteGuid, noteKey, resourceGuid, filename) {
  return `${webApiUrlPrefix}/res/${resourceGuid}`;
}

module.exports = function enml2html(enml, resources, webApiUrlPrefix, noteKey) {
  enml = enml.replace(/^.*enml2.dtd.>/, '');
  let $ = cheerio.load(enml);

  $('en-note').each(function () {
    let self = $(this);
    self.css('background-color', self.attr('bgcolor'));
    self.css('color', self.attr('text'));
    self.replaceWith(`
      <div class="enNote" \
           style="${self.attr('style') || ''}" \
           title="${self.attr('title') || ''}" \
           lang="${self.attr('lang') || ''}" \
           xml:lang="${self.attr('xml:lang') || ''}" \
           dir="${self.attr('dir') || ''}">
        ${self.html()}
      </div>
    `);
  });

  $('en-media').each(function () {
    let self = $(this);
    let hash = self.attr('hash');
    let resource;
    resources.forEach((item) => {
      if (bodyHashToString(item.data.bodyHash) === hash) {
        resource = item;
      }
    });
    if (!resource) {
      self.remove();
      return;
    }
    switch (resource.mime) {
    case 'image/gif':
    case 'image/jpeg':
    case 'image/png':
      self.replaceWith(`
        <img class="enMedia" \
             src="${genResourceUrl(webApiUrlPrefix, resource.noteGuid, noteKey, resource.guid, resource.attributes.fileName)}" \
             hash="${bodyHashToString(resource.data.bodyHash)}" \
             align="${self.attr('align') || ''}" \
             alt="${resource.attributes.fileName || ''}"
             longdesc="${self.attr('longdesc') || ''}" \
             width="${resource.width || ''}" \
             height="${resource.height || ''}" \
             border="${self.attr('border') || ''}" \
             hspace="${self.attr('hspace') || ''}" \
             vspace="${self.attr('vspace') || ''}" \
             usemap="${self.attr('usemap') || ''}" \
             style="${self.attr('style') || ''}" \
             title="${self.attr('title') || ''}" \
             lang="${self.attr('lang') || ''}" \
             xml:lang="${self.attr('xml:lang') || ''}" \
             dir="${self.attr('dir') || ''}" />
      `);
      break;
    case 'audio/wav':
    case 'audio/mpeg':
    case 'audio/amr':
    case 'audio/x-m4a':
      self.replaceWith(`
        <audio class="enMedia" \
               src="${genResourceUrl(webApiUrlPrefix, resource.noteGuid, noteKey, resource.guid, resource.attributes.fileName)}" \
               hash="${bodyHashToString(resource.data.bodyHash)}" \
               style="${self.attr('style') || ''}" \
               title="${self.attr('title') || ''}" \
               lang="${self.attr('lang') || ''}" \
               xml:lang="${self.attr('xml:lang') || ''}" \
               dir="${self.attr('dir') || ''}"></audio>
      `);
      break;
    default:
      self.replaceWith(`
        <iframe class="enMedia" \
                src="${genResourceUrl(webApiUrlPrefix, resource.noteGuid, noteKey, resource.guid, resource.attributes.fileName)}" \
                hash="${bodyHashToString(resource.data.bodyHash)}" \
                style="${self.attr('style') || ''}" \
                name="${self.attr('title') || ''}" \
                frameborder="0"></iframe>
      `);
    }
  });

  $('en-todo').each(function () {
    let self = $(this);
    self.replaceWith(`
      <input type="checkbox" ${self[0].attribs.checked==='true' ? 'checked' : ''}/>${self.parent().text()}
    `);
  });

  $('en-crypt').remove();

  // remove \n \s
  return $.html()
    .trim()
    .replace(/\s*\n+\s*/g, '');
}