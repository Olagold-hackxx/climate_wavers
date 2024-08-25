
//Users details to encode with jwt
const createTokenUser = (user) => {
	return { name: user.name, user_id: user._id, role: user.role };
  };

  module.exports = createTokenUser;