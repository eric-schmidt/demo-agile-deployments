function migrationFunction(migration, context) {
  const blogPost = migration.editContentType('blogPost');
  const blogPostAuthorFieldId = blogPost.editField('author');
  blogPostAuthorFieldId.omitted(true);
}
module.exports = migrationFunction;
