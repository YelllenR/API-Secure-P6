const Sauce = require('../models/sauce');

const likeObject = {
    like: 1,
    dislike: -1,
    neutral: 0
}


exports.userLike = (request, response, next) => {

    Sauce.findOne({ _id: request.params.id })

        .then((result) => {

            switch (request.body.like) {

                case likeObject.like:
                    Sauce.updateOne({ _id: request.params.id },
                        {
                            $inc: { likes: 1 },
                            $addToSet: { usersLiked: request.body.userId }
                        })
                        .then(() => response.status(200).json({ message: "ok like" }))
                        .catch(error => response.status(400).json({ message: error }))

                    break;

                case likeObject.dislike:
                    Sauce.updateOne({ _id: request.params.id },
                        {
                            $inc: { dislikes: 1 },
                            $addToSet: { usersDisliked: request.body.userId }
                        })
                        .then(() => response.status(200).json({ message: "ok dislike" }))
                        .catch(error => response.status(400).json({ message: error }))

                    break;

                case likeObject.neutral:

                    if (result.usersLiked.includes(request.body.userId)) {

                        Sauce.updateOne({ _id: request.params.id },
                            {
                                $inc: {
                                    likes: likeObject.neutral - 1
                                },
                                $pull: {
                                    usersLiked: request.body.userId
                                }
                            })
                            .then((result) => response.status(200).json({ result }))
                            .catch(error => response.status(400).json({ message: error }))

                        break;
                    }

                    if (result.usersDisliked.includes(request.body.userId)) {

                        Sauce.updateOne({ _id: request.params.id },
                            {
                                $inc: {
                                    dislikes: likeObject.neutral - 1
                                },
                                $pull: {
                                    usersDisliked: request.body.userId,
                                }
                            })
                            .then((result) => response.status(200).json({ result }))
                            .catch(error => response.status(400).json({ message: error }))

                        break;
                    }
            }

        })

        .catch(error => response.status(400).json({ message: error }))
}
