exports.memoize = (fn, hash) => {
    let cache = {};
    return (...args) => {
        const  key = hash ? hash(args) : args.join(',')
        return cache[key] || (cache[key] = fn(...args));
  };
};
