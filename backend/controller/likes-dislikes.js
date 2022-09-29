// Importing product model file for use
const Sauce = require('../models/sauce');


/** Objet for likes in order to use for the verifications of user's reactions
 * Includes: like, dislike, neutral according to the specifications
 */
const likeObject = {
    like: 1,
    dislike: -1,
    neutral: 0,
    dislikeNotNegative: 1
}

/** Exporting userLike for use in sauce route
 * With the parameters of request(for the request), response(the answer after the requested operations) and next
 * @param {request} Request param
 * @param {response} Response sent after execution 
 * @param {next} next 
 * 
 * 1. The method findOne with the the property of the ObjetId in mongoose in order to find the product with the id requested. 
 * 
 * 2. Executes the Promise, the first one checks the operation/reaction of the user
 *     i. A switch case in executed to check the conditions. The check is done based on the request body of like
 * 
 *     ii. Several cases based on the objet likeObjet
 * 
 *     iii. If one of the cases is true, it then calls the method updateOne and execute the increment property and the addToSet to 
 *          either add or remove information according to the reaction
 * 
 *  *** the addToSet property is used to prevent dupplicates in the array usersLiked and usersDisiked
 * 
 * 3. Catch potential errors
 */

exports.userLike = (request, response, next) => {

    Sauce.findOne({ _id: request.params.id })

        .then((result) => {

            switch (request.body.like) {

                case likeObject.like:
                    if (!result.usersLiked.includes(request.body.userId)) {

                        Sauce.updateOne({ _id: request.params.id },
                            {
                                $inc: { likes: likeObject.like },
                                $addToSet: { usersLiked: request.body.userId }
                            })
                            .then(() => response.status(200).json({ message: "Ajout du like au produit" }))
                            .catch(error => response.status(404).json({ message: error }))
                    }
                    break;

                case likeObject.dislike:
                    if (!result.usersDisliked.includes(request.body.userId)) {

                        Sauce.updateOne({ _id: request.params.id },
                            {
                                $inc: { dislikes: likeObject.dislikeNotNegative },
                                $addToSet: { usersDisliked: request.body.userId }
                            })
                            .then(() => response.status(200).json({ message: "Ajout du dislike au produit" }))
                            .catch(error => response.status(404).json({ message: error }))
                    }
                    break;

                case likeObject.neutral:

                    if (result.usersLiked.includes(request.body.userId)) {

                        Sauce.updateOne({ _id: request.params.id },
                            {
                                $inc: { likes: likeObject.neutral - 1 },
                                $pull: { usersLiked: request.body.userId }
                            })
                            .then((result) => response.status(200).json({ result }))
                            .catch(error => response.status(404).json({ message: error }))
                    }

                    if (result.usersDisliked.includes(request.body.userId)) {

                        Sauce.updateOne({ _id: request.params.id },
                            {
                                $inc: { dislikes: likeObject.neutral - 1 },
                                $pull: { usersDisliked: request.body.userId }
                            })
                            .then((result) => response.status(200).json({ result }))
                            .catch(error => response.status(404).json({ message: error }))
                    }
                    break;
            }
        })

        .catch(error => response.status(500).json({ message: error }))
}
