import { environment } from '../../lib/contentful.mjs';
import chalk from 'chalk';

// This script maps the Author short text field to an
// Author entry, creating one if it doesn't exist.
(async function () {
  const entryCollection = await environment.getEntries({
    content_type: 'blogPost',
  });

  // Use for/of here so that this code runs synchronously,
  // otherwise multiple Author entries may be created.
  for (let entry of entryCollection.items) {
    entry.fields.authorRef = {
      'en-US': await createEntryReference('author', entry),
    };
    entry = await entry.update();
    entry = await entry.publish();
    // Log out successful content type creation.
    console.log(chalk.green(`Linked Author to Blog Post (${entry.sys.id})`));
  }
})();

const createEntryReference = async (contentType, entry) => {
  // Get existing entry if it exists and return it,
  // otherwise create and return a new one.
  const existingEntry = await getExistingEntry(contentType, 'fields.internalTitle', entry.fields.author['en-US']);

  return existingEntry
    ? {
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: existingEntry.sys.id,
        },
      }
    : await environment
        .createEntry(contentType, {
          fields: {
            internalTitle: {
              'en-US': entry.fields.author['en-US'],
            },
            firstName: {
              'en-US': entry.fields.author['en-US'].split(' ')[0],
            },
            lastName: {
              'en-US': entry.fields.author['en-US'].split(' ')[1],
            },
          },
        })
        .then((entry) => entry.publish())
        .then((entry) => {
          // Log out successful creation of Author entry.
          console.log(chalk.green(`Author entry created: ${entry.sys.id}`));
          return {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: entry.sys.id,
            },
          };
        });
};

// Check for existing entry. If found return it, otherwise return null.
const getExistingEntry = async (contentType, uuidField, uuidValue) => {
  const existingEntries = await environment.getEntries({
    content_type: contentType,
    limit: 1,
    [uuidField]: uuidValue,
  });
  return existingEntries.total > 0 ? existingEntries.items[0] : null;
};
