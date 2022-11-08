import {Samurai} from "samuraijs";
import {readFileSync, existsSync} from "fs";
import {resolve, dirname, basename} from 'path';
import MarkdonwIt from 'markdown-it';

new Samurai({
    paths: {
        source: 'new',
        destination: 'dist',
        exclude: ['new/templates', 'new/styles', 'new/scripts']
    },
    logLevel: "debug",
    sass: {
        importer: (url, filePath, done) => {

            if (url.startsWith('~')) {
                url = url.slice(1)
            }

            const variants = [
                resolve('./', url),
                resolve('./', url + '.scss'),
                resolve('./', 'node_modules', url),
                resolve('./', 'node_modules', dirname(url), '_' + basename(url) + '.scss'),
                resolve('./', 'node_modules', url, '_index.scss'),
                resolve('./', 'node_modules', url, 'index.scss'),
            ];

            for (let variant of variants) {
                if (existsSync(variant)) {
                    done({
                        file: variant
                    });
                    return;
                }
            }

            console.error('SASS File not found: ', url, filePath)

            throw Error;
        }
    },
    nunjucks: {
        globals: {
            markdown: (path) => {
                const content = readFileSync(path, 'utf-8');
                const md = new MarkdonwIt('', {
                    html: true,
                    linkify: true,
                    typographer: true
                });
                return md.render(content);
            }
        }
    },
    server: {
        open: false
    }
});
