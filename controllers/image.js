const Clarifai = require ('clarifai')

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: "56a14844c37b4f24b8bbba1562c677b4"
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => { console.log(err, "Error CLARIFAI");
        res.status(400).json('unable to work with API')});
}

   

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => { console.log(err, "WOLFGANG");
        res.status(400).json('unable to get entries')});
}

module.exports = {
    handleImage,
    handleApiCall
};