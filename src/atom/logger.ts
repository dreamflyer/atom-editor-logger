/// <reference path="../../typings/main.d.ts" />
import fs = require("fs");
import path = require("path");

import _ = require("underscore");

import textTyper = require("atom-text-typer");

import fileDialogUtils = require("./fileDialogUtils");

var enabled: boolean = false;

var records: any[][] = [];

export function subscribe(editor: AtomCore.IEditor): AtomCore.Disposable {
    var filePath = editor.getPath();
    
    if(filePath.indexOf("player:") === 0) {
        return {
            dispose: () => {
                
            },
            
            disposed: false
        };
    }
    
    return (<any>editor).getBuffer().onWillChange((event) => {
        if(enabled) {
            if(!event.newRange) {
                return;
            }
            
            var exists = _.find(records, (record: any[]) => {
                return record[0] === filePath;
            });
            
            if(!exists) {
                var change = textTyper.generateInitialChange(filePath, editor.getText());

                records.push(textTyper.changeToRecord(change));
            }
            
            var change = new textTyper.Change();
            
            change.from = filePath;
            
            change.newRange = {
                start: editor.getBuffer().characterIndexForPosition(event.newRange.start),
                end: editor.getBuffer().characterIndexForPosition(event.newRange.end)
            };
            
            change.oldRange = {
                start: editor.getBuffer().characterIndexForPosition(event.oldRange.start),
                end: editor.getBuffer().characterIndexForPosition(event.oldRange.end)
            };
            
            change.oldText = event.oldText;
            change.newText = event.newText;
            
            var record = textTyper.changeToRecord(change);
            
            records.push(record);
        }
    });
}

export function play(): void {
    var extensionFilter: any = {
        name: 'JSON',
        extensions: ['json']
    };

    var filePath = fileDialogUtils.openFileDialogModal("Select file to play", fileDialogUtils.getHome(), [extensionFilter])[0];

    if(filePath) {
        var content = fs.readFileSync(filePath).toString();

        playRecord(content);
    }
}

var editors;

var steps;

function playRecord(content: string): void {
    var typer = new textTyper.TextTyper(content);

    editors = {};

    steps = [];

    addSingleStep(typer);

    while(typer.hasNext()) {
        typer.increment();

        addSingleStep(typer);
    }

    playStep(0);
}

function playStep(index) {
    if(index === steps.length) {
        return;
    }

    showEditorWithContent(steps[index].filePath, steps[index].content);

    setTimeout(() => playStep(index + 1), 100);
}

function addSingleStep(typer): void {
    var filePath = typer.currentContentPath();
    
    steps.push({
        filePath: filePath,
        content: typer.currentContent(filePath)
    })
}

function showEditorWithContent(filePath, content): void {
    var promise = editors[filePath];

    if(!promise) {
        promise = atom.workspace.open("player:/" + filePath + ".log", {});
    }

    editors[filePath] = promise.then(editor => {
        (<any>editor).setText(content);

        return editor;
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
    };
    
    var filePath = fileDialogUtils.saveFileDialogModal("Save editors log", fileDialogUtils.getHome(), [extensionFilter]);

    if(filePath) {
        try {
            fs.writeFileSync(filePath, JSON.stringify(records));
        } catch(exception) {
            
        }
    }
    
    records = [];

    enabled = false;
}