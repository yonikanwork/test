const Post = require('../models/post');
const { validationResult } = require('express-validator/check');

exports.getPosts = (req, res, next) => {
  let fetchedPosts;

  Post.find()
    .then(documents => {
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
};

exports.createPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: req.body.imagePath,
    creator: req.userData.userId
  });

  const errors = validationResult(req); // errors from the validation in the router
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  post
    .save()
    .then(createdPost => {
      res.status(201).json({
        message: 'Post added successfully',
        post: {
          ...createdPost,
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a post failed!'
      });
    });
};

exports.updatePost = (req, res, next) => {
  const post = {
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    imagePath: req.body.imagePath,
    creator: req.userData.userId
  };

  const errors = validationResult(req); // errors from the validation in the router
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  Post.updateOne({ _id: req.body._id, creator: req.userData.userId }, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id ,creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};



// // DUMMMY MOCK POSTS
// const fetchedPosts = [
//   {
//     userId: 1,
//     id: 1,
//     title:
//       'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//     body:
//       'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
//   },
//   {
//     userId: 1,
//     id: 2,
//     title: 'qui est esse',
//     body:
//       'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
//   },
//   {
//     userId: 1,
//     id: 3,
//     title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
//     body:
//       'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
//   },
//   {
//     userId: 1,
//     id: 4,
//     title: 'eum et est occaecati',
//     body:
//       'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
//   },
//   {
//     userId: 1,
//     id: 5,
//     title: 'nesciunt quas odio',
//     body:
//       'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque'
//   },
//   {
//     userId: 1,
//     id: 6,
//     title: 'dolorem eum magni eos aperiam quia',
//     body:
//       'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae'
//   },
//   {
//     userId: 1,
//     id: 7,
//     title: 'magnam facilis autem',
//     body:
//       'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas'
//   },
//   {
//     userId: 1,
//     id: 8,
//     title: 'dolorem dolore est ipsam',
//     body:
//       'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae'
//   },
//   {
//     userId: 1,
//     id: 9,
//     title: 'nesciunt iure omnis dolorem tempora et accusantium',
//     body:
//       'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas'
//   },
//   {
//     userId: 1,
//     id: 10,
//     title: 'optio molestias id quia eum',
//     body:
//       'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error'
//   },
//   {
//     userId: 2,
//     id: 11,
//     title: 'et ea vero quia laudantium autem',
//     body:
//       'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi'
//   },
//   {
//     userId: 2,
//     id: 12,
//     title: 'in quibusdam tempore odit est dolorem',
//     body:
//       'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio'
//   },
//   {
//     userId: 2,
//     id: 13,
//     title: 'dolorum ut in voluptas mollitia et saepe quo animi',
//     body:
//       'aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam'
//   },
//   {
//     userId: 2,
//     id: 14,
//     title: 'voluptatem eligendi optio',
//     body:
//       'fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum'
//   },
//   {
//     userId: 2,
//     id: 15,
//     title: 'eveniet quod temporibus',
//     body:
//       'reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae'
//   },
//   {
//     userId: 2,
//     id: 16,
//     title:
//       'sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio',
//     body:
//       'suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta'
//   },
//   {
//     userId: 2,
//     id: 17,
//     title: 'fugit voluptas sed molestias voluptatem provident',
//     body:
//       'eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo'
//   },
//   {
//     userId: 2,
//     id: 18,
//     title: 'voluptate et itaque vero tempora molestiae',
//     body:
//       'eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam'
//   },
//   {
//     userId: 2,
//     id: 19,
//     title: 'adipisci placeat illum aut reiciendis qui',
//     body:
//       'illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas'
//   }
// ];
