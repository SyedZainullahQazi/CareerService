const EventModel = require("../../models/event_model");

const GetSessions = async (req, res) => {
  try {

    const events = await EventModel.find({postType:"session"}).sort({ postDate: 1 }).populate({
        path: 'postedBy',
        model: 'User',
        select: 'rollnum name email profilepicture',
      });
    console.log(events);
    if (!events) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = GetSessions;
