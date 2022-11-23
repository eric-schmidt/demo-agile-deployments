function migrationFunction(migration, context) {
  // Derive linked entries from existing Author text field, mapping
  // them to the new reference field.
  migration.deriveLinkedEntries({
    contentType: 'blogPost',
    derivedContentType: 'author',
    from: ['author'],
    toReferenceField: 'authorRef',
    derivedFields: ['firstName', 'lastName'],
    identityKey: async (fromFields) => {
      return fromFields.author['en-US'].toLowerCase().replace(' ', '-');
    },
    shouldPublish: true,
    deriveEntryForLocale: async (inputFields, locale) => {
      if (locale !== 'en-US') {
        return;
      }
      const internalTitle = inputFields.author[locale];
      const [firstName, lastName] = inputFields.author[locale].split(' ');
      return {
        internalTitle,
        firstName,
        lastName,
      };
    },
  });
}
module.exports = migrationFunction;
