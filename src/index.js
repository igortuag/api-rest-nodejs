function calculateUserAge(user) {
  return new Date().getFullYear() - user.birthYear;
}

calculateUserAge('John')