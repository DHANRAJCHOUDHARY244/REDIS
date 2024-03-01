function handleServerError(res, err, message) {
    console.error(err);
    res.status(500).json({ message: message || 'Internal Server Error' });
}

function handleNotFoundError(res, message) {
    res.status(404).json({ message: message || 'Not Found' });
}

function handleBadRequestError(res, message) {
    res.status(400).json({ message: message || 'Bad Request' });
}

module.exports = {
    handleServerError,
    handleNotFoundError,
    handleBadRequestError
};
