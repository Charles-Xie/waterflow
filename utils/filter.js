var fs = require('fs');

// fs.readFile('sensitive.txt', function(err, data) {
//     console.log('err: ', err);
//     console.log('data: ', data.toString());
// });

module.exports = function(word_file_name) {
    this.file = word_file_name;
    // better to read file in a synchronous way
    data = fs.readFileSync(word_file_name).toString();
    // console.log('data: ', data.);
    reg_content = data.replace(new RegExp('\n', 'gm'), '|');
    // console.log('reg_content: ', reg_content.toString());
    // need to remove the last symbol '|'
    reg_content = reg_content.substring(0, reg_content.length - 1);
    sensitive_reg = new RegExp(reg_content, 'i');

    this.test = function (message) {
        return sensitive_reg.test(message);
    };
}