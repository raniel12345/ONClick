import http from "http";
import cors from "cors";
import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";

import DataLoader from "dataloader";
import dataLoaders from "./loaders";

import "dotenv/config";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";
// import user from "./schema/user";
// import { Model } from "sequelize/types";

const is_production = process.env.NODE_ENV === "production" ? false : true;
// const isTest = !!process.env.TEST_DATABASE;
// const isProduction = !!process.env.DATABASE_URL;
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Accept-Encoding", "gzip");
  next();
});

const getUserTokenData = async req => {
  const token = req.headers["authorization"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
  // else {
  //   throw new AuthenticationError("Token is required");
  // }
};

const server = new ApolloServer({
  introspection: true, // to allow GraphQL schema to be available in Heroku
  playground: true, // Enable Graphql playground for Heroku
  typeDefs: schema,
  resolvers,
  formatError: error => {
    if (error.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }

    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");

    return {
      ...error,
      message
    };
  },
  context: async ({ req, connection }) => {
    var loaders = {
      user: new DataLoader(keys => dataLoaders.user.batchUsers(keys, models)),
      projectStatus: new DataLoader(keys =>
        dataLoaders.projectStatus.batchStatus(keys, models)
      )
    };

    if (connection) {
      return {
        models,
        loaders
      };
    }

    if (req) {
      const me = await getUserTokenData(req);

      return {
        models,
        is_production,
        me,
        secret: process.env.SECRET,
        loaders
      };
    }
  },
  debug: is_production
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

sequelize
  .sync({ force: true })
  .then(async () => {
    // if (isTest || isProduction) {
    //   createUserWithProjects(new Date());
    // }

    // createUserWithProjects(new Date());
    bulkInsert();

    httpServer.listen({ port }, () => {
      console.log(`Apollo server on http://localhost:${port}/graphql`);
    });
  })
  .catch(err => {
    console.log(err);
  });

//
// ######################################################################################################
//

const bulkInsert = async date => {
  await models.User.create({
    username: "Raniel",
    email: "Raniel.Garcia@onsemi.com",
    password: "test123123123213",
    role: "ADMIN"
  });

  await models.User.create({
    username: "Maricar",
    email: "Maricar.Manalili@onsemi.com",
    password: "test123123123213",
    role: "NORMAL"
  });

  await models.User.destroy({
    where: { id: 2 }
  });

  // await models.ProjectStatus.create({
  //   status: "Testing",
  //   description: "test"
  // });

  // await models.ProjectStatus.create({
  //   status: "status 2",
  //   description: "test"
  // });

  let user = await models.User.findOne({
    where: { id: 1 }
  });

  await user.createProjectStatus({
    status: "status 2",
    description: "test"
  });

  await user.createProjectStatus({
    status: "Testing",
    description: "test"
  });

  await user.createProject(
    {
      title: "Sample",
      description: "asdfasdf",
      modules: ["as", "asd"],
      projectStatusId: 1
    },
    {
      include: [models.ProjectStatus]
    }
  );

  await models.Project.update(
    { projectStatusId: 2 },
    {
      where: { id: 1 }
    }
  );

  // console.log(
  //   await models.User.findAll({
  //     include: [models.Project]
  //   })
  // );

  // console.log(
  //   await models.Project.findAll({
  //     include: [models.User]
  //   })
  // );
};

// const createUserWithProjects = async date => {
//   await models.User.create(
//     {
//       username: "maricar",
//       email: "Maricar.Garcia@onsemi.com",
//       password: "testing",
//       role: "ADMIN",
//       isDeleted: false
//       // projects: [
//       //   {
//       //     title: "Testing Project",
//       //     description: "TESTING",
//       //     tags: ["test", "testing"],
//       //     isPublic: true,
//       //     modules: ["asdf"],
//       //     statusId: 1,
//       //     isDeleted: false
//       //   }
//       // ]
//     }
//     // {
//     //   include: [models.Project]
//     // }
//   );
//   //   .then(create => {
//   //   console.log(
//   //     create.get({
//   //       plain: true
//   //     })
//   //   );
//   // });

//   await models.User.create(
//     {
//       username: "raniel",
//       email: "Raniel.Garcia@onsemi.com",
//       password: "testing",
//       role: "ADMIN",
//       isDeleted: false
//       // projects: [
//       //   {
//       //     title: "Testing Project 123",
//       //     description: "TESTING",
//       //     tags: ["test", "testing"],
//       //     isPublic: true,
//       //     modules: ["asdf"],
//       //     statusId: 1,
//       //     isDeleted: false
//       //   }
//       // ]
//       // projectMembers: [
//       //   {
//       //     projectId: 1,
//       //     isDeleted: false
//       //   }
//       // ]
//     }
//     // ,
//     // {
//     //   include: [models.Project] //, models.ProjectMember
//     // }
//   ).then(create => {
//     console.log(
//       create.get({
//         plain: true
//       })
//     );
//   });

//   let user = await models.User.findAll({ where: { id: 1 } }).catch(err =>
//     console.log(err)
//   );

//   // let projectCreated = await models.Project.create({
//   //   title: "Testing Project 123",
//   //   description: "TESTING",
//   //   tags: ["test", "testing"],
//   //   isPublic: true,
//   //   modules: ["asdf"],
//   //   statusId: 1,
//   //   isDeleted: false
//   // });

//   // projectCreated.setUser(user);

//   // let group = await models.Group.create({
//   //   title: "AppsTeam",
//   //   description: "Testing",
//   //   isDeleted: false
//   // });

//   // await group.addUser(user);

//   // let usersGroups1 = await models.User.findAll({
//   //   include: [
//   //     {
//   //       model: models.Group,
//   //       as: "groups"
//   //     }
//   //   ]
//   // }).then(data => {
//   //   return data;
//   // });

//   // usersGroups1.forEach(user => {
//   //   console.log(user.username);
//   //   user.groups.forEach(group => {
//   //     console.log(group.title);
//   //   });
//   // });

//   // await models.Project.findByPk(1)
//   //   .then(project => {
//   //     return project.destroy();
//   //     //return project.destroy({force: true});
//   //   })
//   //   .then(project => {
//   //     //return task.restore();
//   //   });

//   // let usersGroups2 = await models.Group.findAll({
//   //   include: [
//   //     {
//   //       model: models.User,
//   //       as: "users"
//   //     }
//   //   ]
//   // });

//   // console.log(usersGroups2);

//   // let usersGroups = await models.User.findAll(
//   //   { where: { id: 1 } },
//   //   {
//   //     include: [
//   //       {
//   //         model: models.Group,
//   //         as: "groups",
//   //         attributes: ["id", "title"]
//   //       }
//   //     ]
//   //   }
//   // );

//   // console.log(usersGroups);
// };
