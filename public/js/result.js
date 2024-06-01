const result = (A, B, C, D) => {
  if (A > B || A > C || A > D ) {
    return "Maioria A";
  } else if (B > A || B > C || B > D ) {
    return "Maioria B";
  } else if (C > A || C > B || C > D ) {
    return "Maioria C";
  } else if (D > A || D > B || D > C) {
    return "Maioria D";
  }
};

module.exports = result;
