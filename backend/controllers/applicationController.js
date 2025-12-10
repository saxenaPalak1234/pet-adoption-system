const AdoptionApplication = require('../models/AdoptionApplication');
const Pet = require('../models/Pet');

exports.createApplication = async (req, res) => {
  try {
    const { petId, message } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.status !== 'available') {
      return res.status(400).json({ message: 'Pet is not available for adoption' });
    }

    const existingApplication = await AdoptionApplication.findOne({
      user: req.user._id,
      pet: petId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this pet' });
    }

    const application = await AdoptionApplication.create({
      user: req.user._id,
      pet: petId,
      message
    });

    await application.populate('pet', 'name species breed');

    res.status(201).json({ success: true, application });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already applied for this pet' });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find({ user: req.user._id })
      .populate('pet', 'name species breed image status')
      .sort({ createdAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }

    const applications = await AdoptionApplication.find(query)
      .populate('user', 'name email')
      .populate('pet', 'name species breed')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AdoptionApplication.countDocuments(query);

    res.json({
      success: true,
      applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await AdoptionApplication.findById(req.params.id)
      .populate('pet');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ message: 'Application has already been processed' });
    }

    application.status = status;
    application.reviewedAt = new Date();
    application.reviewedBy = req.user._id;
    await application.save();

    if (status === 'approved') {
      application.pet.status = 'adopted';
      await application.pet.save();

      await AdoptionApplication.updateMany(
        { 
          pet: application.pet._id, 
          _id: { $ne: application._id },
          status: 'pending'
        },
        { 
          status: 'rejected',
          reviewedAt: new Date(),
          reviewedBy: req.user._id
        }
      );
    }

    await application.populate('user', 'name email');
    await application.populate('pet', 'name species breed');

    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

