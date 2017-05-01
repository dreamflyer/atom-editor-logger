/// <reference path="../../typings/main.d.ts" />
import path = require("path");
import fs = require("fs");

import fileDialogUtils = require("./fileDialogUtils");

// export class StoreLogDialog {
//
//     protected sourceValue:string;
//     // protected apititle:string="New API"
//     // protected version:string="v1"
//     // protected baseUri:string="http://api.samplehost.com"
//     //
//     // protected _raml1:boolean=true;
//     // protected _defStructure:boolean=true;
//     // protected _createSampleResource:boolean=true;
//    
//     constructor(private title: string = "Save editors log") {
//         this.sourceValue = this.generateDefaultProjectParentFolder()
//     }
//
//     generateDefaultProjectParentFolder() : string {
//         return fileDialogUtils.getHome();
//     }
//
//     validateProjectLocation(value) {
//         var toValidate : string = value ? value.trim() : "";
//
//         if(!toValidate) {
//             return errorStatus("Path should't be empty");
//         }
//
//         var parentDirectory = path.dirname(toValidate);
//        
//         if (!parentDirectory || parentDirectory == ".") return errorStatus("Can not find path parent")
//
//         if(!fs.existsSync(parentDirectory)) return errorStatus("Parent directory does not exist")
//
//         return okStatus()
//     }
//
//     validateTitle(value) {
//         return okStatus();
//        
//         // var toValidate : string = value ? value.trim() : "";
//         //
//         // if (!toValidate || toValidate.length < 1) {
//         //     return UI.errorStatus("Title field is required");
//         // }
//         //
//         // return UI.okStatus()
//     }
//
//     show(){
//         var zz=null;
//         var section=UI.section(this.title,UI.Icon.BOOK,false,false,UI.h3("Please select location to place your project:")).pad(10,10)
//
//         var panel = new UI.Panel(UI.LayoutType.BLOCK);
//
//         var statusLabel:UI.Label = UI.label("", null, UI.TextClasses.ERROR)
//         var slf=new UI.CustomField("", statusLabel,x=>x);
//         slf.setDisplay(this.validateProjectLocation(this.sourceValue).code == UI.StatusCode.ERROR)
//         panel.addChild(slf)
//
//         var projectLocationInput = UI.texfField("",this.sourceValue,x=>this.sourceValue=x.getBinding().get())
//         projectLocationInput.getBinding().addValidator(()=>this.validateProjectLocation(this.sourceValue))
//         projectLocationInput.setStyle("width","400px");
//         projectLocationInput.getBinding().addListener(value=> {
//
//             //var st = projectLocationInput.getBinding().status()
//             var st = this.validateProjectLocation(value)
//             if (st.code != UI.StatusCode.ERROR) {
//                 //this.updateUI(q, x)
//                 statusLabel.setText("");
//                 statusLabel.setIcon(UI.Icon.NONE)
//                 slf.setDisplay(false)
//             }
//             else {
//                 statusLabel.setText(st.message);
//                 statusLabel.setIcon(UI.Icon.BUG)
//                 slf.setDisplay(true)
//             }
//         })
//
//         panel.addChild(
//             //UI.hc(
//             projectLocationInput
//
//             //UI.buttonSimple("Browse",
//             //    ()=>UI.fdUtils..openFolderDialog("Select project location",
//             //            newLocation=> {
//             //                this.sourceValue=newLocation
//             //                projectLocationInput.getBinding().set(newLocation)
//             //                //var atomEditor = projectLocationInput.getActualField()
//             //                //var atomEditorUI = atomEditor.ui()
//             //                //var atomEditorUIModel = atomEditorUI.getModel();
//             //                //atomEditorUIModel.setText(newLocation)
//             //            },
//             //            true, this.sourceValue)
//             //).margin(10,0).setStyle("margin-bottom", "0.75em")
//             //).setPercentWidth(100)
//         )
//
//         panel.addChild(UI.h3("Title of your API:"));
//
//         var titleStatusLabel = UI.label("", null, UI.TextClasses.ERROR);
//
//         var titleStatusMessage = new UI.CustomField("", titleStatusLabel, x => x);
//
//         titleStatusMessage.setDisplay(false);
//
//         panel.addChild(titleStatusMessage);
//
//         var titleTextField = UI.texfField("", this.apititle, x => this.apititle = x.getBinding().get());
//
//         titleTextField.getBinding().addValidator(() => this.validateTitle(this.apititle));
//
//         titleTextField.getBinding().addListener(value => {
//             var status = this.validateTitle(value);
//
//             if (status.code !== UI.StatusCode.ERROR) {
//                 titleStatusLabel.setText("");
//                 titleStatusLabel.setIcon(UI.Icon.NONE)
//                 titleStatusMessage.setDisplay(false)
//             } else {
//                 titleStatusLabel.setText(status.message);
//                 titleStatusLabel.setIcon(UI.Icon.BUG)
//                 titleStatusMessage.setDisplay(true)
//             }
//         })
//
//         panel.addChild(titleTextField);
//         panel.addChild(UI.h3("Version of your API"));
//         panel.addChild(UI.texfField("",this.version,x=>this.version=x.getBinding().get()))
//         panel.addChild(UI.h3("Base URI of your API"));
//         panel.addChild(UI.texfField("",this.baseUri,x=>this.baseUri=x.getBinding().get()))
//
//         section.addChild(panel);
//
//         var r1=UI.checkBox("Use RAML 1.0")
//         r1.setValue(this._raml1)
//         r1.getBinding().addListener(x=>this._raml1=r1.getValue());
//         section.addChild(r1)
//         var r2=UI.checkBox("Create default directory structure")
//         r2.setValue(this._defStructure)
//         r2.getBinding().addListener(x=>this._defStructure=r2.getValue());
//         section.addChild(r2)
//         var r3=UI.checkBox("Create sample resource and method")
//         r3.setValue(this._createSampleResource)
//         r3.getBinding().addListener(x=>this._createSampleResource=r3.getValue());
//         section.addChild(r3)
//         var buttonBar=UI.hc().setPercentWidth(100).setStyle("display","flex");
//         buttonBar.addChild(UI.label("",null,null,null).setStyle("flex","1"))
//         buttonBar.addChild(UI.button("Cancel",UI.ButtonSizes.NORMAL,UI.ButtonHighlights.NO_HIGHLIGHT,UI.Icon.NONE,x=>{zz.destroy()}).margin(10,10))
//         buttonBar.addChild(UI.button("Create",UI.ButtonSizes.NORMAL,UI.ButtonHighlights.SUCCESS,UI.Icon.NONE,x=>{
//             if(this.validateTitle(this.apititle).code === UI.StatusCode.ERROR) {
//                 return;
//             }
//
//             if(this.validateProjectLocation(this.sourceValue).code === UI.StatusCode.ERROR) {
//                 return;
//             }
//
//             this.onOk(zz);
//             zz.destroy();
//         }))
//         section.addChild(buttonBar);
//
//         zz=(<any>atom).workspace.addModalPanel( { item: section.renderUI() });
//     }
//
//     protected createIfNotExist(p:string){
//         var ps=path.resolve(this.sourceValue,p);
//         if (!fs.existsSync(ps)){
//             fs.mkdirSync(ps);
//         }
//     }
//
//     protected onOk(zz) {
//
//         if (!fs.existsSync(this.sourceValue)) {
//             fs.mkdirSync(this.sourceValue);
//         }
//         if (this._defStructure) {
//             this.createIfNotExist("schemas");
//             this.createIfNotExist("examples");
//             this.createIfNotExist("traits");
//             this.createIfNotExist("resourceTypes");
//             this.createIfNotExist("securitySchemes");
//             this.createIfNotExist("documentation");
//             if (this._raml1) {
//                 this.createIfNotExist("notebooks");
//                 this.createIfNotExist("scripts");
//             }
//         }
//         var content = createRAMLFile(this.apititle, this.version, this.baseUri, this._createSampleResource, this._raml1);
//         var ps=path.resolve(this.sourceValue,"api.raml");
//         fs.writeFileSync(ps,content);
//         (<any>atom).open({pathsToOpen:[this.sourceValue,ps]});
//     }
// }
//
// enum StatusCode {
//     OK,
//     WARNING,
//     ERROR
// }
//
// function okStatus(){
//     return {code:StatusCode.OK,message:""}
// }
//
// function errorStatus(message:string){
//     return {code:StatusCode.ERROR,message:message}
// }