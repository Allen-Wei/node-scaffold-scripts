import { print, autoGetArgs, recursiveDirFiles, debug } from "./modules";
import { request } from "https"
import { resolve, join, basename } from "path";
import { statSync, existsSync, fstat, readFileSync, readdirSync } from "fs";

const SCRIPT_FILE_NAME = "gist-create.js";
const ARGS = autoGetArgs();

if (Object.keys(ARGS).length === 0 || ARGS["--help"]) {
    showHelp();
} else {
    createGist();
}

function createGist() {
    const files = reduceFiles(getGistFiles());
    const desc = ARGS["--description"],
        isPublic = ARGS["--public"];

    const data = {
        "description": typeof desc === "string" ? desc : "from gist-create.js",
        "public": typeof isPublic === "boolean" ? isPublic : false,
        "files": files
    };

    let req = request({
        hostname: "api.github.com",
        port: 443,
        path: "/gists",
        method: "POST",
        headers: {
            "User-Agent": "nodejs",
            "Content-Type": "application/json",
            Authorization: `token ${getToken()}`
        }
    }, res => {
        let resData = "";
        res.on("data", chunk => resData += chunk);
        res.on("end", () => {
            const response = JSON.parse(resData);
            if (res.statusCode === 201) {
                print(`create success: ${response.html_url}`);
                return;
            }
            print(JSON.stringify(response, null, "  "));
        })
        res.on("error", error => { throw error; });
    });

    req.write(JSON.stringify(data));
    req.end();
    debug("start create gist...");
}

function reduceFiles(files: string[]): { [key: string]: { content: string } } {
    return files.reduce((prev: { [key: string]: { content: string } }, next: string) => {
        let fileName = basename(next);
        if (prev[fileName]) {
            fileName = next.replace(/[\\/:?]/g, "_");
        }
        prev[fileName] = { content: readFileSync(next, { encoding: "utf8" }).toString() };
        debug(`read file ${next}, ${prev[fileName].content.length} bytes.`)
        return prev;
    }, {});
}

function getGistFiles(): string[] {
    //list files from input
    const filesSplitByComma = ARGS["--files"];
    if (typeof filesSplitByComma === "string") {
        return filesSplitByComma.split(",")
            .map(f => resolve(f))
            .filter(f => existsSync(f));
    }

    //list files in directory
    const directory = ARGS["--directory"],
        nameMatchs = ARGS["--name-match"],
        recursive = ARGS["--recursive"];

    if (typeof directory !== "string") {
        throw new Error("directory parameter is empty");
    }
    const absDir = resolve(directory);
    if (!existsSync(absDir)) {
        throw new Error(`directory ${absDir} is not found`);
    }
    const files = recursive === true ? recursiveDirFiles(absDir) : readdirSync(absDir).map(name => join(absDir, name)).filter(f => statSync(f).isFile());

    return Array.from(files).filter(f => typeof nameMatchs === "string" ? new RegExp(nameMatchs).test(f) : true);
}
function getToken(): string {
    const token = (ARGS["--token"] || process.env.GIST_TOKEN).toString();

    if (!/[\d\w]+/.test(token)) {
        throw new Error(`error token format: ${token}`);
    }

    return token;
}
function showHelp(): void {
    print(`
使用: node ${SCRIPT_FILE_NAME} [opitons]

选项: 
    --help          显示帮助信息
    --token         Gist token(缺省状态读取环境变量GIST_TOKEN). 创建token: https://github.com/settings/tokens 
    --public        是否创建公开Gist, 默认false, 传递了参数就变成true. 
    --description   Gist描述

    --directory     需要上传到gist上的文件的目录
    --recursive     是否需要递归获取文件(默认false, 传递了参数为true.)
    --name-match    文件名正则匹配

    --files         需要上传到gist上的文件列表, 多个用逗号分隔.

例子:
    node ${SCRIPT_FILE_NAME} --token your_token_value --directory ./ --name-match "\.(js|ts)$"
    node ${SCRIPT_FILE_NAME} --token your_token_value --files ./file.txt,./dir/file2.md
`);
}