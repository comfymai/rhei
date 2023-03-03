import * as path from "path";

export const config = {
    port: 3000,
    libraryDir: path.join(__dirname, "..", "public"),
    staticPath: "/static/"
};
