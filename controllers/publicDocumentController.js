const PublicDocs = require("../models/PublicDocs");
const fs = require("fs").promises;
const path = require("path");

const getDocument = async (req, res) => {
	try {
		const resultSet = await PublicDocs.findAll();

		const documentList = [];

		if (resultSet) {
			resultSet.map((result) => {
				documentList.push({
					id: result.id,
					originalFileName: result.originalFileName,
					mimeType: result.mimeType,
					fileName: result.fileName,
					uploadedDate: result.createdAt,
				});
			});
		}

		res.status(200).json({ documentList });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
};

const deleteDocument = async (req, res) => {
	try {
		const documentId = req.params.id;

		if (!documentId) {
			return res.status(401).json({ message: "Id is required" });
		}

		const targetDocument = await PublicDocs.findByPk(documentId);
		if (!targetDocument) {
			return res.status(401).json({ message: "Document not found" });
		}

		await PublicDocs.destroy({
			where: { id: documentId },
		});

		res.status(200).json({ message: "File deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
};

module.exports = { getDocument, deleteDocument };
