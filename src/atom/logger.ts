/// <reference path="../../typings/main.d.ts" />
import fs = require("fs");
import path = require("path");

import fileDialogUtils = require("./fileDialogUtils");

var enabled: boolean = false;

var records = [];

export function subscribe(editor: AtomCore.IEditor): AtomCore.Disposable {
    return (<any>editor).getBuffer().onDidChange((event) => {
        if(enabled) {
            var clone = JSON.parse(JSON.stringify(event))

            clone.from = editor.getPath();

            records.push(clone);
        }
    });
}

export function enable(): void {
    records = [];

    enabled = true;
}

export function disable(): void {
    var extensionFilter: any = {
        name: 'JSON',
        extensions: ['json']
    }

    var filePath = fileDialogUtils.saveFileDialogModal("Save editors log", fileDialogUtils.getHome(), [extensionFilter]);
    
    if(filePath) {
        try {
            fs.writeFileSync(filePath, JSON.stringify(records, null, "\t"))
        } catch(exception) {
            
        }
    }

    records = [];

    enabled = false;
}