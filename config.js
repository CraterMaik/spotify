module.exports = {
  prefix: "s!!",
  statusBOT: "portalmybot.com",
  superusers: ["253727823972401153"],
  dirBase: "./database/db/001_base.db",
  categories: [
    { name: "test", priority: 5 },
    { name: "music", priority: 8 },
    { name: "general", priority: 8 },
    { name: "dev", priority: 8 }
  ],
  groups: [
    { name: "User", permLvl: 0 },
    { name: "Member", permLvl: 1 },
    { name: "Mod", permLvl: 2 },
    { name: "Admin", permLvl: 3 }
  ]
};
