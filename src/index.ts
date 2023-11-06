interface User {
  birthYear: number;
}

function calculateUserAge(user: User) {
  return new Date().getFullYear() - user.birthYear;
}

calculateUserAge({
  birthYear: 1993
});
