import PMEvaluation from "../model/pmEvaluation.model.js";


export const createPMEvaluation = async (req, res, next) => {
  try {
    const { department, machineName, checkType, specialNotes, evaluationDate, nextScheduleDate, maintenanceType } = req.body;
    
    // Check if files were uploaded
    const pdfPath = req.files && req.files.pdfFile ? req.files.pdfFile[0].path : "";
    const imagePath = req.files && req.files.imageFile ? req.files.imageFile[0].path : "";

    const newEvaluation = new PMEvaluation({
      department,
      machineName,
      checkType,
      specialNotes,
      evaluationDate,
      nextScheduleDate,
      maintenanceType, // New field
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


export const deletePMEvaluation = async (req, res, next) => {
  try {
    const evaluation = await PMEvaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: "PM Evaluation not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "PM Evaluation deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const updatePMEvaluation = async (req, res, next) => {
  try {
    const { department, machineName, checkType, specialNotes, evaluationDate, nextScheduleDate, maintenanceType } = req.body;
    
    // Check if files were uploaded
    const pdfPath = req.files && req.files.pdfFile ? req.files.pdfFile[0].path : undefined;
    const imagePath = req.files && req.files.imageFile ? req.files.imageFile[0].path : undefined;

    const updateData = {
      department,
      machineName,
      checkType,
      specialNotes,
      evaluationDate,
      nextScheduleDate,
      maintenanceType
    };

    // Only update file paths if new files were uploaded
    if (pdfPath) updateData.pdfPath = pdfPath;
    if (imagePath) updateData.imagePath = imagePath;

    const updatedEvaluation = await PMEvaluation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEvaluation) {
      return res.status(404).json({
        success: false,
        message: "PM Evaluation not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "PM Evaluation updated successfully",
      data: updatedEvaluation
    });
  } catch (error) {
    next(error);
  }
};