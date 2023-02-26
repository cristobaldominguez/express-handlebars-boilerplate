function sanitize_strings({req, params}) {
  const new_obj = {}
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      new_obj[key] = (typeof params[key] === 'string' || params[key] instanceof String) ? req.sanitize(params[key]).trim() : params[key]
    }
  }

  return new_obj
}

function remove_html_from_string(strInputCode) {
  const clean_text = strInputCode.replace(/<\/?[^>]+(>|$)/g, "")
  return clean_text
}

export {
  sanitize_strings,
  remove_html_from_string
}