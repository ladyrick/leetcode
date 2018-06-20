//npx hexo new 0001-Two-Sum --date=-1000 --category= --tags=

"use strict";
(function () {
    var argv = process.argv;
    var { execSync } = require('child_process')
    if (argv[2] === "new") {
        if (!argv[4]) {
            console.log("Error. Correct format: npm run new num title");
            return;
        }
        var num = parseInt(argv[3]);
        if (num <= 0 || num > 9999) {
            console.log("Error. Correct format: npm run new num title");
            return;
        }
        var numstr = num.toString();
        var slug = "";
        for (var i = 0; i < 4 - numstr.length; i++) {
            slug += "0";
        }
        slug += numstr + "-" + argv.slice(4).join("-");
        var title = '"' + num + ". " + argv.slice(4).join(" ") + '"';
        var order = num;
        var cmd = "npx hexo new " + title + " --order=" + order +
            " --slug=" + slug + " --category=unset";

        console.log(cmd);
        execSync(cmd);
    } else if (argv[2] === "index") {
        var fs = require("fs");
        var files = fs.readdirSync("source/_posts");

        var towrite = "|  |  |  |\n| :- |  | :- |\n";

        for (var f of files) {
            if (f.substr(0, 5) === "index") {
                fs.unlinkSync("source/_posts/" + f);
            } else {
                var num = parseInt(f.substr(0, 4));
                var slug = f.slice(0, -3);
                var title = slug.substr(5).replace("-", " ");
                towrite += "| " + num + " | &nbsp;&nbsp;&nbsp;&nbsp; | {% post_link " + slug + " " + title + " %} |\n";
            }
        }

        execSync("npx hexo new index index");
        fs.open("source/_posts/index.md", "a", function (e, fd) {
            if (e) throw e;
            fs.write(fd, towrite, function (e) {
                if (e) throw e;
                fs.closeSync(fd);
            });
        });
    } else {
        console.log("Error. Correct format: npm run new/index ...");
        return;
    }
})();