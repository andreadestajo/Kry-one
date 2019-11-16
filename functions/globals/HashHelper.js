const Hashids = require('hashids/cjs');

exports.generateHashedId = (email) => {
  const hashids = new Hashids(email, 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
  return hashids.encode(1, 2, 3)
};

