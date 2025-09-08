import express from "express";
import {
  createPMEvaluation,
  getPMEvaluations,
  getPMEvaluationById,
  getDepartments
} from "../controller/pmEvaluation.controller.js";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "pdf/");
    } else if (file.mimetype.startsWith("image/")) {
      cb(null, "uploads/");
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const router = express.Router();

router.post("/", upload.fields([
  { name: "pdfFile", maxCount: 1 },
  { name: "imageFile", maxCount: 1 }
]), createPMEvaluation);

router.get("/", getPMEvaluations);
router.get("/departments", getDepartments);
router.get("/:id", getPMEvaluationById);

export default router;