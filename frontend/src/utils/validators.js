export function getPasswordError(password) {
  if (password.length < 8) return "Mínimo de 8 caracteres";
  if (!/[A-Z]/.test(password)) return "Precisa de uma letra maiúscula";
  if (!/\d/.test(password)) return "Precisa de um número";
  if (!/[\W_]/.test(password)) return "Precisa de um símbolo";
  return null;
}

export function getEmailError(email) {
  if (!email) return "E-mail obrigatório";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido";
  return null;
}