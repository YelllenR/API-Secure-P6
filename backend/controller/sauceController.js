/**
 * 
 */
const Sauce = require('../models/sauce');

const userLike = require('../controller/likes-dislikes');

// const auth = require('../middleware/auth');

const fileSystem = require('fs');



/** GET ALL SAUCES
 * @param {request, response, next} arrow function that calls the find method
 * 
 * @return {Promise} if the the informations are found it executes the promise. 
 * 1. Returning the status code and a json with the sauces
 * 2. If not catches the error, returns the status and a json with error
 */
const getSauces = (request, response, next) => {

    Sauce.find(request.body.sauces)
        .then(sauce => response.send(sauce))
        .catch(notFound => response.status(400).json({ notFound }))
};


/** GET ONE SAUCE
 * @param {request, response, next} arrow function that calls the find method
 * 
 * @return {Promise} if the the informations are found it executes the promise. 
 * 1. Returning the status code and a json with the selected sauce
 * 2. If not catches the error, returns the status and a json with error
 */
const getOneSauce = (request, response, next) => {
    Sauce.findOne({ _id: request.params.id })
        .then(oneSauce => {
            response.status(200).json(oneSauce)
        })
        .catch(notFound => {
            console.log(notFound);
            response.status(404).json({ notFound })
        })

};


/** CREATE SAUCE
 * @param {request, response, next} arrow function that calls the find method
 * 
 * @return {Promise} 
 * 
 * 
 */
const postSauce = (request, response, next) => {
    const sauceObjet = JSON.parse(request.body.sauce);

    delete sauceObjet._id;
    delete sauceObjet.userId;

    const sauce = new Sauce({
        ...sauceObjet,
        userId: request.auth.userId,
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    sauce.save(sauceObjet)
        .then(() => response.status(201).json({ message: "Sauce créée" }))
        .catch(error => response.status(403).json({ error }))
}



/** MODIFY INFORMATIONS OF A SAUCE
 * @param {request, response, next} arrow function that calls the find method
 * 
 * @return {Promise} 
 * 1. Checks if the requested file exist and if it is valid then parse the object
 * 2. Getting and formating the image url
 * 3. : and if no object was found, then just get the body request
 * 4. Deletes the user id from the request to ensure security so that it is not visible
 * 5. Finds the id of the sauce to modify, the method return a promise. 
 * 6. Inside the promise, a check is done on the id of the user to verify if he has the rights to do modifications.
 * 7. The method findOne takes the property of id and a param for the requested id
 * 8. The method updateOne takes the property of id and param of requested id and also the sauceObjet with requested id.
 * 9. Another promise is claimed after the updateOne method
 */

const putSauce = (request, response, next) => {
    const sauceObjet = request.file ? {
        ...JSON.parse(request.body.sauce),
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
    } : { ...request.body };


    delete sauceObjet._userId;

    Sauce.findOne({ _id: request.params.id })
        .then((sauce) => {
            if (sauce.userId != request.auth.userId) {
                console.log(sauce.userId != request.auth.userId)
                response.status(403).json({ message: "Cette opération n'est pas autorisée" });
            }
            else {
                Sauce.updateOne(({ _id: request.params.id }), { ...sauceObjet, _id: request.params.id })

                    .then(() => response.status(200).json({ message: "Le produit a été modifié" }))
                    .catch(error => response.status(400).json({ error }))
            }
        })
        .catch(error => response.status(400).json({ error }))
};


/** DELETE ONE SAUCE
 * @param {request, response, next} arrow function that calls the find method
 * 
 * @return {Promise} 
 * 1. Method findOne and takes the property of id with the param of the requested id
 * 2. A promise is fired, a check is done to compare the userID with id of the user that requested the deletion
 * 3. If all is valid, gets the filename to split. 
 * 4. Calling the fileSystem imported above with the unlink function. 
 * 5. Gets the path of the file in the param and execute an anonymous function that calls the deleteOne method. 
 * 6. Method deleteOne is given the property of the id and the param, the requested id for deletion. 
 * 7. The promise returns the response in json
 * 
 */
const deleteSauce = (request, response, next) => {
    Sauce.findOne({ _id: request.params.id })
        .then(sauce => {
            if (sauce.userId != request.auth.userId) {
                response.status(403).json({ message: "Cette suppression n'est pas autorisée" })
            }
            else {
                const filename = sauce.imageUrl.split("/images/")[1];
                fileSystem.unlink(`images/${filename}`, () => {

                    Sauce.deleteOne({ _id: request.params.id })
                        .then(() => response.status(200).json({ message: "Suppression réussie" }))
                        .catch(deleteError => response.status(400).json({ deleteError }));
                });
            }
        })
        .catch(error => response.status(500).json({ error }))
};


// const likeObject = {
//     like: 1,
//     dislike: -1,
//     neutral: 0
// };


// const userLike = (request, response, next) => {
//     Sauce.findOne({ _id: request.params.id })

//         .then((result) => {

//             if (request.body.like) {
//                 Sauce.updateOne({ _id: request.params.id },
//                     {
//                         $inc: { likes: likeObject.like },
//                         $addToSet: { usersLiked: request.body.userId }
//                     })
//                     .then(() => response.status(200).json({ message: "ok like" }))
//                     .catch(error => response.status(400).json({ message: error }))
//             }


//             response.status(200).json({ message: result })

//         })

//         .catch(error => response.status(400).json({ message: error }))
// }


// Exporting the created functions
module.exports = {
    getSauces,
    getOneSauce,
    postSauce,
    putSauce,
    deleteSauce
};