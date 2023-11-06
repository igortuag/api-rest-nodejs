function calculateUserAge(user) {
    return new Date().getFullYear() - user.birthYear;
}
calculateUserAge({
    birthYear: 1993
});
