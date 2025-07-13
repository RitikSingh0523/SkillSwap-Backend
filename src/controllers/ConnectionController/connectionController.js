const errorHandler = require("../../middleware/errorHandler");
const successHandler = require("../../middleware/successHandler");
const Connection = require("../../models/ConnectionModel");

// Stablish a connection between users
const setConnection=async (req, res) => {
  try {
    // Logic to send connection request
    const { id } = req.params;
    const userId = req.user.id;

    const ConnectionData={
      fromUser: userId,
      toUser: id,
      status: 'pending',
    }

    const ConnectionSave=await Connection.create(ConnectionData);

    res.send(successHandler({
      status: 200,
      data: ConnectionSave,
      message: 'Connection request sent successfully',
    }));
  } catch (error) {
    res.send(
      errorHandler({
        status: 500,
        message: 'Error sending connection request: ' + error.message,
      })
    );
  }
}

// Accept a connection request
const updateConnection = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const {status} = req.body;
    
        const connection = await Connection.findOneAndUpdate(
        { fromUser: id, toUser: userId, status: 'pending' },
        { status },
        { new: true }
        );
    
        if (!connection) {
        return res.send(
            errorHandler({ status: 404, message: 'Connection request not found' })
        );
        }
    
        res.send(successHandler({
        status: 200,
        data: connection,
        message: 'Connection request accepted successfully',
        }));
    } catch (error) {
        res.send(
        errorHandler({ status: 500, message: 'Error accepting connection request: ' + error.message })
        );
    }
}


module.exports = {
  setConnection,
  updateConnection,
}