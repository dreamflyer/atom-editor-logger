declare function require(name:string):any
declare var process:any;

var dialog;

function getDialog() {
    if(!dialog) {
        try {
            dialog = require("remote").require("electron").dialog;
        } catch(e) {
            console.log(e.message);
        }
    }
    
    return dialog;
}

dialog = getDialog();

/**
 * In example : { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
 */
export interface ExtensionFilter {
    name : string
    extensions : string[]
}

interface FileDialogOptions {
    title : string
    properties : string[]
    defaultPath? : string
    filters? : ExtensionFilter[]
}

export function openFileDialogModal(title : string, defaultPath? : string, filters? : ExtensionFilter[]) : string {
    var options = constructOptions(title, defaultPath, filters, ['openFile']);
    return getDialog().showOpenDialog(options);
}

export function openFileDialog(title : string, callBack : (path:string)=>void, defaultPath? : string,
                        filters? : ExtensionFilter[]) : void {
    var options = constructOptions(title, defaultPath, filters, ['openFile']);
    getDialog().showOpenDialog(options, resultPath=> {
            if(resultPath) callBack(resultPath[0])
        }
    );
}

export function openFolderDialogModal(title : string, createDirectory? : boolean,
                                      defaultPath? : string, filters? : ExtensionFilter[]) : string {
    var properties = ['openDirectory'];
    if (createDirectory) properties.push('createDirectory');

    var options = constructOptions(title, defaultPath, filters, properties);
    return getDialog().showOpenDialog(options);
}

export function openFolderDialog(title : string, callBack : (path:string)=>void,
                                 createDirectory? : boolean, defaultPath? : string,
                          filters? : ExtensionFilter[]) : void {
    var properties = ['openDirectory'];
    if (createDirectory) properties.push('createDirectory');

    var options = constructOptions(title, defaultPath, filters, properties);

    getDialog().showOpenDialog(options, resultPath=> {
            if(resultPath) callBack(resultPath[0])
        }
    );
}

export function saveFileDialogModal(title: string, defaultPath?: string, filters?: ExtensionFilter[]) : string {
    var options = constructOptions(title, defaultPath, filters, ['saveFile']);
    return getDialog().showSaveDialog(options);
}

function constructOptions(title, defaultPath, filters, properties) {
    var options:FileDialogOptions = {
        title: title,
        properties: properties,
    }

    if (defaultPath) {
        options.defaultPath = defaultPath;
    }

    if (filters) {
        options.filters = filters;
    }

    return options;
}

export function getHome() {
    var home = process.env["HOME"];
    if (home) {
        return home;
    }

    var userProfile = process.env["USERPROFILE"];
    if (userProfile) {
        return userProfile;
    }

    var publicFolder = process.env["PUBLIC"];
    if (publicFolder) {
        return publicFolder;
    }

    var atomHome = process.env["ATOM_HOME"];
    if (atomHome) {
        return atomHome;
    }

    return "";
}