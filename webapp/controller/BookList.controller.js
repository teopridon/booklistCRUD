sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel"
 ], function (Controller, MessageToast, Fragment, ResourceModel) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.BookList", {

        onInit : function () {
            var i18nModel = new ResourceModel({
               bundleName: "sap.ui.demo.walkthrough.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },

        onDeleteBook(oEvent) {

            const aSelContexts = this.byId("idBooksTable").getSelectedContexts();

            const sPathToBook = aSelContexts[0].getPath();

            this.getView().getModel().remove(sPathToBook, {
                success : () => {
                    MessageToast.show("Book deleted!");
                    
                    //var oBundle = this.getView().getModel("i18n").getResourceBundle();
                    //var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                    //var sMsg = oBundle.getText("Book deleted!", [sRecipient]);    
                },
                error : () => {
                    MessageToast.show("Book could not be deleted!");
                }
            });

        },

        onAddBook(oEvent){
            this.byId("addDialog").open();

            
            this.getView().byId("isbn").setValue("");
            this.getView().byId("title").setValue("");
            this.getView().byId("author").setValue("");
            this.getView().byId("datepub").setValue("");
            this.getView().byId("language").setValue("");
            this.getView().byId("availablebooks").setValue("");
            this.getView().byId("totalbooks").setValue("");
        },

        onCloseAdd(oEvent){
            this.byId("addDialog").close();
        },

        onBookAdd(oEvent){

            var oBook =  {
                ISBN: "",
                Author: "",
                Title: "",
                DatePublication: "",
                Language: "",
                TotalNumber: 0,
                AvailableNumber: 0,
                CreatedOn: "",
                CreatedBy: "",
                ChangedOn: "",
                ChangedBy: ""
            };

            oBook.ISBN = this.getView().byId("isbn").getValue();
            oBook.Title = this.getView().byId("title").getValue();
            oBook.Author = this.getView().byId("author").getValue();
            oBook.Language = this.getView().byId("language").getValue();
            oBook.AvailableNumber = parseInt(this.getView().byId("availablebooks").getValue());
            oBook.TotalNumber = parseInt(this.getView().byId("totalbooks").getValue());

            oBook.DatePublication = "2015-12-31T00:00:00";
            oBook.CreatedOn = "2015-12-31T00:00:00";
            oBook.ChangedOn = "2015-12-31T00:00:00";

            this.getView().getModel().create("/Books", oBook, {
                success : () => {
                    MessageToast.show("Book added!");
                },
                error : () => {
                    MessageToast.show("Book could not be added!");
                }
            });
            
        },

        onUpdateBook(oEvent) {
            this.byId("updateDialog").open();
            
            this.getView().byId("isbnUpdate").setValue("");
            this.getView().byId("titleUpdate").setValue("");
            this.getView().byId("authorUpdate").setValue("");
            this.getView().byId("datepubUpdate").setValue("");
            this.getView().byId("languageUpdate").setValue("");
            this.getView().byId("availablebooksUpdate").setValue("");
            this.getView().byId("totalbooks").setValue("");
        },

        onCloseUpdate(oEvent){
            this.byId("updateDialog").close();
        },

        onBookUpdate(oEvent){

            const aSelContexts = this.byId("idBooksTable").getSelectedContexts();

            const sPathToBook = aSelContexts[0].getPath();

            var oBook =  {
                ISBN: "",
                Author: "",
                Title: "",
                DatePublication: "",
                Language: "",
                TotalNumber: 0,
                AvailableNumber: 0,
                CreatedOn: "",
                CreatedBy: "",
                ChangedOn: "",
                ChangedBy: ""
            };

            oBook.ISBN = this.getView().byId("isbnUpdate").getValue();
            oBook.Title = this.getView().byId("titleUpdate").getValue();
            oBook.Author = this.getView().byId("authorUpdate").getValue();
            oBook.Language = this.getView().byId("languageUpdate").getValue();
            oBook.AvailableNumber = parseInt(this.getView().byId("availablebooksUpdate").getValue());
            oBook.TotalNumber = parseInt(this.getView().byId("totalbooks").getValue());

            oBook.DatePublication = "2015-12-31T00:00:00";
            oBook.CreatedOn = "2015-12-31T00:00:00";
            oBook.ChangedOn = "2015-12-31T00:00:00";

            this.getView().getModel().update(sPathToBook, oBook, {
                success : () => {
                    MessageToast.show("Book updated!");
                },
                error : () => {
                    MessageToast.show("Book could not be updated!");
                }
            });
            
        }

    });
 });