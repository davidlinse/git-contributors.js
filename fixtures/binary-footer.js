
// binary

if (!module.parent) {

    var target = process.argv.length > 2 ? process.argv[2] : '.';

    // console.log(process.argv);

    module.exports.GitContributors.list(target, function (err, data) {

        if (err) { throw err; }

        console.log(data);
    });
}
