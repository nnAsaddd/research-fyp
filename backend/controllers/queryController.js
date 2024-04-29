const Query = require("../models/Query");
const User = require("../models/User");

const getQueries = async (req, res) => {
  const queries = await Query.find({}).populate("userId");
  if (!queries || queries.length < 1) {
    return res.status(400).json({ message: "No Queries found" });
  }
  return res.status(200).json({ queries, total: queries.length });
};

const getUserQueries = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Please provide User paper Id" });
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({ message: "No user with given Id found" });
  }
  const Queries = await Query.find({ userId });
  if (!Queries || Queries.length < 1) {
    return res.status(400).json({ message: "No Queries for given User found" });
  }
  return res.status(200).json({ Queries, total: Queries.length });
};

const createQuery = async (req, res) => {
  const { text, userId } = req.body;
  if (!text || !userId) {
    return res
      .status(400)
      .json({ message: "Please Provide complete information" });
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({ message: "No User found" });
  }
  const timeStamp = new Date().toLocaleTimeString();
  const newQuery = await Query.create({ text, timeStamp, userId });
  if (!newQuery) {
    return res.status(500).json({ message: "Error while creating new Query" });
  }
  return res
    .status(200)
    .json({ message: "Query created successfully", Query: newQuery });
};

const deleteQuery = async (req, res) => {
  const { queryId } = req.params;
  if (!queryId) {
    return res.status(400).json({ message: "Please provide Query Id" });
  }
  const QueryExist = await Query.findOneAndDelete({ _id: queryId });
  if (!QueryExist) {
    return res.status(500).json({ message: "Error deleting the Query" });
  }
  return res
    .status(200)
    .json({ message: "Query Deleted successfully,", Query: QueryExist });
};
module.exports = {
  getQueries,
  createQuery,
  deleteQuery,
  getUserQueries,
};
