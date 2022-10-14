exports.methods = function (string) {
    setFirstCharacterUpperCase = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
};
