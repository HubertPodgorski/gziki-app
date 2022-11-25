const {
  createEventTemplate,
  getAllEventTemplates,
  getEventTemplateById,
  deleteEventTemplateById,
  updateEventTemplateById,
} = require("../controllers/eventTemplateController");

const routes = (io, socket) => {
  socket.on("get_all_event_templates", (callback) =>
    getAllEventTemplates(callback)
  );

  socket.on("add_event_template", (received, callback) =>
    createEventTemplate(received, callback, io)
  );

  socket.on("get_event_template", (received, callback) =>
    getEventTemplateById(received, callback)
  );

  socket.on("delete_event_template", (received) =>
    deleteEventTemplateById(received, io)
  );

  socket.on("update_event_template", (received, callback) =>
    updateEventTemplateById(received, callback, io)
  );
};

module.exports = routes;
