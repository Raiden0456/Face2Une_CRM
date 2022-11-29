// Min 8 letter password, with at least a symbol, upper and lower case letters and a number
export function checkPassword(str: string) {
  const re = /^(?=.*[A-Z])(?=.*[!@?/#$%&'()*+,-.^_`{|}~"<:@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
  return re.test(str);
}

export function checkEmail(str: string) {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(str);
}
