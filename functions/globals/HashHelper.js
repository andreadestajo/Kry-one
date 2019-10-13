const Hashids = require('hashids/cjs');
const hashids = new Hashids(process.env.HASH_SECRET_KEY, 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

exports.generateHashedId = (email) => {
  return hashids.encode(email)
};
