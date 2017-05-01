/// <reference path="../../typings/main.d.ts" />
import logger = require("./logger");

var CompositeDisposable = require('atom').CompositeDisposable;

module package_entry_point {
    var subscriptions = new CompositeDisposable();

    export function activate (state) {
        require('atom-package-deps').install('atom-editor-logger', true).then(() => {
            subscriptions.add(atom.commands.add('atom-workspace', {
                'atom-editor-logger:start-logging': () => logger.enable(),
                'atom-editor-logger:stop-logging': () => logger.disable()
            }));
        });

        subscriptions.add(atom.workspace.observeTextEditors((editor) => logger.subscribe(editor)));
    }
    
    export function deactivate(){
        subscriptions.dispose()
    }
}
export = package_entry_point;