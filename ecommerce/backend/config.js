const config = {
    environment: "dev",
    saltRounds: 10,
    randomBytesLength: 10,
    jwtKey: "J1@3$5w6&8(0TkEY",
    jwtTokenExpiery: 60 * 60 * 24, //one day
    jwtCookieExpiery: 1000 * 60 * 60 * 24 //one day
}

module.exports = { config };