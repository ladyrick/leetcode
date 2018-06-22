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
        var slug = num + "-";
        slug += argv.slice(4).join("-");
        slug = slug.replace(/\(|\)|\[|\]|\{|\}/g, "").toLowerCase();
        var title = '"' + num + ". " + argv.slice(4).join(" ") + '"';
        var order = 10000 + num;
        var cmd = "npx hexo new " + title + " --order=\"" + order +
            "\" --slug=" + slug + " --category=unset";
        console.log(cmd);
        execSync(cmd);
    } else if (argv[2] === "index") {
        var del = require("del");
        var fs = require("fs");
        del.sync(["./source/_posts/index*", "./db.json", "./public"]);
        execSync("npx hexo generate");
        var database = JSON.parse(fs.readFileSync("db.json"));
        var towrite = "|  |  |  |\n| :- |  | :- |\n";
        for (var post of database.models.Post.sort((a, b) => a.order - b.order)) {
            towrite += "| " + post.order + " | &nbsp;&nbsp;&nbsp;&nbsp; | {% post_link "
                + post.slug + " \"" + post.title.match(/^\d+\. (.+)$/)[1] + "\" %} |\n";
        }
        var cmd = "npx hexo new index index --path=index";
        console.log(cmd)
        execSync(cmd);
        fs.open("source/_posts/index.md", "a", function (e, fd) {
            if (e) throw e;
            fs.write(fd, towrite, function (e) {
                if (e) throw e;
                fs.closeSync(fd);
            });
        });
        del.sync(["./source/_posts/index/", "./db.json", "./public"]);
    } else {
        console.log("Error. Correct format: npm run new/index ...");
        return;
    }
})();