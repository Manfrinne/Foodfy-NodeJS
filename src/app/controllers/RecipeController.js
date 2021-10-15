const Recipe = require("../models/recipe");
const File = require("../models/file");

module.exports = {
  async index(req, res) {
    let results = await Recipe.all();
    const recipes = results.rows;

    results = await Recipe.allFiles();
    let files = results.rows;
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("admin/recipes/index", { recipes, files });
  },

  async create(req, res) {
    const results = await Recipe.chefSelectOption();
    const chefOption = results.rows;

    return res.render("admin/recipes/create", { chefOption });
  },

  async post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill in all fields.");
      }
    }

    if (req.files.length == 0) {
      return res.send("Favor carregar ao menos uma imagem!");
    }

    req.body.user_id = req.session.userId;

    let results = await Recipe.create(req.body);
    const recipesId = results.rows[0].id;

    const filesPromise = req.files.map((file) =>
      File.create({ ...file, recipe_id: recipesId })
    );

    await Promise.all(filesPromise);

    return res.redirect(`/admin/recipes`);
  },

  async show(req, res) {
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];

    if (!recipe) return res.send("Recipee NOT found!");

    results = await Recipe.files(req.params.id);
    let files = results.rows;
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("admin/recipes/show", { recipe, files });
  },

  async edit(req, res) {
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];

    if (!recipe) return res.send("Recipee NOT found!");

    results = await Recipe.chefSelectOption();
    const chefOption = results.rows;

    results = await Recipe.files(req.params.id);
    let files = results.rows;
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("admin/recipes/edit", { recipe, chefOption, files });
  },

  async put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "" && key != "removed_files") {
        return res.send("Please, fill in all fields.");
      }
    }

    if (req.files.length != 0) {
      const newFilesPromise = req.files.map((file) =>
        File.create({ ...file, recipe_id: req.body.id })
      );

      await Promise.all(newFilesPromise);
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",");
      const lastIndex = removedFiles.length - 1;
      removedFiles.splice(lastIndex, 1);

      const removedFilesPromise = removedFiles.map((id) => File.delete(id));

      await Promise.all(removedFilesPromise);
    }

    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}`);
  },

  async delete(req, res) {
    try {
      // if recipes has files
      let results = await Recipe.files(req.body.id);
      let files = results.rows;

      let filesId = [];
      for (i = 0; i < files.length; i++) {
        filesId += `${files[i].id},`;
      }

      if (filesId) {
        const removedFiles = filesId.split(",");
        const lastIndex = removedFiles.length - 1;
        removedFiles.splice(lastIndex, 1);

        const removedFilesPromise = removedFiles.map((id) => File.delete(id));

        await Promise.all(removedFilesPromise);
      }
    } catch {
      console.error(err);
    }

    await Recipe.delete(req.body.id);

    return res.redirect("/admin/recipes");
  },
};
