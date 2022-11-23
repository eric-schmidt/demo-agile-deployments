function migrationFunction(migration, context) {
  const blogPost = migration.editContentType('blogPost');
  const blogPostAuthor = blogPost.deleteField('author');
}
module.exports = migrationFunction;
