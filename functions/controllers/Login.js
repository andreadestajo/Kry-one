
module.exports = async (data, context) =>
{
  let uid             = context.auth.uid;
  console.log(uid);
  return uid;
};
