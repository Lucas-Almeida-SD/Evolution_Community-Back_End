import bcrypt from 'bcryptjs';

export default (email: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(email, salt);

  return hash;
};
