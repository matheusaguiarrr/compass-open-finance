import House from '../models/House.js';

class DashboardController {
  async show(req, res) {
    const { user } = req.params;
    const houses = await House.find({ user });
    return res.json({ houses });
  }
}

export default new DashboardController();
