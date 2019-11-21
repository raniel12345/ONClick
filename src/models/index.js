import Sequelize from "sequelize";

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
  });
} else {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres"
    }
  );
}

const models = {
  User: sequelize.import("./user"),
  Group: sequelize.import("./group"),
  GroupUsers: sequelize.import("./groupUsers"),
  Project: sequelize.import("./project"),
  ProjectFeature: sequelize.import("./projectFeature"),
  ProjectIssue: sequelize.import("./projectIssue"),
  ProjectStatus: sequelize.import("./projectStatus"),
  PerUserProjectMember: sequelize.import("./perUserProjectMember"),
  PerGroupProjectMember: sequelize.import("./perGroupProjectMember")
};
Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});
export { sequelize };
export default models;
