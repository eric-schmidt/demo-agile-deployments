function migrationFunction(migration, context) {
  // Edit the Blog Post content type.
  const blogPost = migration.editContentType('blogPost');

  // Create a new Author reference field.
  const blogPostAuthorRef = blogPost.createField('authorRef');
  blogPostAuthorRef
    .name('Author')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([{ linkContentType: ['author'] }])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  // Move new Author refernce field to appropriate place within UI.
  blogPost.moveField('authorRef').afterField('slug');

  // Create the new Author content type.
  const author = migration.createContentType('author');
  author.displayField('internalTitle').name('Author').description('An individual blog author.');
  const authorInternalTitle = author.createField('internalTitle');
  authorInternalTitle.name('Internal Title').type('Symbol').localized(false).required(true).validations([]).disabled(false).omitted(false);
  const authorFirstName = author.createField('firstName');
  authorFirstName.name('First Name').type('Symbol').localized(false).required(true).validations([]).disabled(false).omitted(false);
  const authorLastName = author.createField('lastName');
  authorLastName.name('Last Name').type('Symbol').localized(false).required(true).validations([]).disabled(false).omitted(false);
}
module.exports = migrationFunction;
