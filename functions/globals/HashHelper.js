const Hashids = require('hashids/cjs');


exports.generateHashedId = (email) => {
  const hashids = new Hashids(email, 8, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
  return hashids.encode(1, 2, 3)
};

exports.generateAccessCode = (data) => {
  const hashids = new Hashids(data, 64);
  return hashids.encode(1, 2, 3)
};
