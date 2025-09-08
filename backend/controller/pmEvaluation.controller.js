import PMEvaluation from "../model/pmEvaluation.model.js";


export const createPMEvaluation = async (req, res, next) => {
  try {
    const { department, machineName, checkType, specialNotes, evaluationDate } = req.body;
    
    // Check if files were uploaded
    const pdfPath = req.files && req.files.pdfFile ? req.files.pdfFile[0].path : "";
    const imagePath = req.files && req.files.imageFile ? req.files.imageFile[0].path : "";

    const newEvaluation = new PMEvaluation({
      department,
      machineName,
      checkType,
      specialNotes,
      evaluationDate,
      pdfPath,
      imagePath
    });

    await newEvaluation.save();
    
    res.status(201).json({
      success: true,
      message: "PM Evaluation saved successfully",
      data: newEvaluation
    });
  } catch (error) {
    next(error);
  }
};

export const getPMEvaluations = async (req, res, next) => {
  try {
    const evaluations = await PMEvaluation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: evaluations
    });
  } catch (error) {
    next(error);
  }
};

export const getPMEvaluationById = async (req, res, next) => {
  try {
    const evaluation = await PMEvaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: "PM Evaluation not found"
      });
    }
    res.status(200).json({
      success: true,
      data: evaluation
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Machine.distinct("department");
    res.status(200).json({
      success: true,
      data: departments
    });
  } catch (error) {
    next(error);
  }
};