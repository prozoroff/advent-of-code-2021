exports.splitBy = (str, delimiter=/\s+|,/) =>
    str.split(delimiter).filter(s => s);
