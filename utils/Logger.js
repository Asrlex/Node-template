const getCurTime = () => new Date().toString().substring(0, 33);

module.exports.log = (msg, user = "Server") => {
    console.log(`\nTime: ${getCurTime()} || User: ${user}\t || Action: ${msg}`);
}

module.exports.error = (msg, user = "Server") => {
    console.error(`\nTime: ${getCurTime()} || User: ${user}\t || Action: ${msg}`);
}