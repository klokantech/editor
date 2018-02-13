import url from 'url'

let first = true;

export function onStyleChange(oldStyle, newStyle) {
  const docUrl = url.parse(window.location.href, true);
  docUrl.query = docUrl.query || {};
  const urlStyle = docUrl.query.style;
  if(first || !urlStyle || urlStyle !== newStyle.id) {
    let fn = window.history.pushState;
    if (first) {
      fn = window.history.replaceState;
      first = false;
    }

    const hargs = getHistoryArgs(newStyle);
    fn.call(window.history, hargs.state, hargs.title, hargs.url);
    document.title = hargs.title;
  }
}

export function replaceState(style) {
    const hargs = getHistoryArgs(style);
    window.history.replaceState(hargs.state, hargs.title, hargs.url);
    document.title = hargs.title;
}

const getHistoryArgs = function(style) {
  const docUrl = url.parse(window.location.href, true);
  docUrl.query = docUrl.query || {};
  docUrl.query.style = style.id;
  delete docUrl.search;
  return {
    state: {styleId: style.id},
    title: style.name,
    url: url.format(docUrl)
  }
}
