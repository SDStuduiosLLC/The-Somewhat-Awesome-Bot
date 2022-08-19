import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const nonReqString = {
  type: String,
  required: false,
};

const modCaseScema = new mongoose.Schema({
  _id: reqString, // case id
  modId: reqString,
  messageId: reqString,
  dataId: nonReqString, // this links into a seperate database which holds all of the links to cases, notes and flags
});

module.exports = mongoose.model("caseLinks", modCaseScema);
