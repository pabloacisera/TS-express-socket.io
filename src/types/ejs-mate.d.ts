declare module "ejs-mate" {
    import { PathLike } from "fs";

    function engine(
        path: PathLike,
        options: any,
        callback: (err: Error | null, rendered?: string) => void
    ): void;

    export = engine;
}
